import { lumenClientConfig } from '@/lumen.config'
import { clientModrinthV2 } from '@/util/clients'
import { injection } from '@/util/inject'
import { InstanceServiceKey, LumenClientModFile, LumenClientServiceKey } from '@xmcl/runtime-api'
import { Ref } from 'vue'
import { kInstance } from './instance'
import { useInstanceModLoaderDefault } from './instanceModLoaderDefault'
import { kInstances } from './instances'
import { useService } from './service'

export interface LumenClientInstall {
  /** Whether the install/check is currently running */
  installing: Ref<boolean>
  /** Whether the Lumen Client jar is already in the instance mods folder */
  installed: Ref<boolean>
  /** Whether there is a published Lumen Client jar for the instance Minecraft version */
  supported: Ref<boolean>
  /**
   * When the current instance Minecraft version has no Lumen Client build,
   * select (or create) a dedicated "Lumen Client" instance with a supported
   * version. Returns the instance the client should be installed into.
   */
  ensureLumenInstance(): Promise<{ path: string; minecraft: string }>
  ensureLumenClient(target?: { path: string; minecraft: string }): Promise<void>
}

/**
 * Install Lumen Client into the current instance: ensure the Fabric loader is
 * configured, then download the client jar and its Modrinth dependencies into
 * the instance `mods` folder. Files already present are never re-downloaded,
 * except the client jar itself which is updated when the published build
 * changes.
 */
export function useLumenClientInstall(): LumenClientInstall {
  const { path, runtime } = injection(kInstance)
  const { instances, selectedInstance } = injection(kInstances)
  const { ensureMods, getInstalledMods } = useService(LumenClientServiceKey)
  const { createInstance } = useService(InstanceServiceKey)
  const installModLoader = useInstanceModLoaderDefault()

  const installing = ref(false)
  const installed = ref(false)

  const minecraft = computed(() => runtime.value.minecraft)
  const supported = computed(() =>
    lumenClientConfig.supportedVersions.includes(minecraft.value),
  )

  async function refresh() {
    if (!path.value || !minecraft.value) return
    const fileName = lumenClientConfig.modFileName(minecraft.value)
    const result = await getInstalledMods(path.value, [fileName]).catch(() => [])
    installed.value = result.length > 0
  }

  watch([path, minecraft], refresh, { immediate: true })

  async function ensureLumenInstance(): Promise<{ path: string; minecraft: string }> {
    if (supported.value) {
      return { path: path.value, minecraft: minecraft.value }
    }
    const existing = instances.value.find((i) =>
      lumenClientConfig.supportedVersions.includes(i.runtime.minecraft),
    )
    if (existing) {
      selectedInstance.value = existing.path
      return { path: existing.path, minecraft: existing.runtime.minecraft }
    }
    const target =
      lumenClientConfig.supportedVersions[lumenClientConfig.supportedVersions.length - 1]
    const created = await createInstance({
      name: lumenClientConfig.name,
      runtime: { minecraft: target },
    })
    selectedInstance.value = created
    return { path: created, minecraft: target }
  }

  async function ensureLumenClient(target?: { path: string; minecraft: string }) {
    const mc = target?.minecraft ?? minecraft.value
    const instancePath = target?.path ?? path.value
    installing.value = true
    try {
      const instance = instances.value.find((i) => i.path === instancePath)
      const instanceRuntime = instance?.runtime ?? runtime.value
      if (!instanceRuntime.fabricLoader) {
        const ok = await installModLoader(instancePath, instanceRuntime, ['fabric'])
        if (!ok) {
          throw new Error(`Fabric Loader is not available for Minecraft ${mc}`)
        }
      }

      const files: LumenClientModFile[] = [
        {
          fileName: lumenClientConfig.modFileName(mc),
          url: lumenClientConfig.downloadUrl(mc),
          checkUpdate: true,
        },
      ]
      for (const projectId of lumenClientConfig.modrinthDependencies) {
        try {
          const versions = await clientModrinthV2.getProjectVersions(projectId, {
            loaders: ['fabric'],
            gameVersions: [mc],
          })
          const version = versions[0]
          const file = version?.files.find((f) => f.primary) ?? version?.files[0]
          if (file) {
            files.push({ fileName: file.filename, url: file.url })
          }
        } catch (e) {
          // A missing optional dependency should not block the client install
          console.warn(`Failed to resolve Lumen dependency ${projectId}`, e)
        }
      }

      await ensureMods({ instancePath, files })
      installed.value = true
    } finally {
      installing.value = false
    }
  }

  return { ensureLumenClient, ensureLumenInstance, installing, installed, supported }
}
