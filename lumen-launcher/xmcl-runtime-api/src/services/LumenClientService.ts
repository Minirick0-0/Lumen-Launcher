import { GenericEventEmitter } from '../events'
import { ServiceKey } from './Service'

export interface LumenClientModFile {
  /**
   * The file name to place under the instance `mods` folder
   */
  fileName: string
  /**
   * The download url of the file
   */
  url: string
  /**
   * When the file already exists, compare its size against the remote
   * (HEAD request) and re-download if they differ. Used to auto-update the
   * client jar, whose file name does not change between builds.
   */
  checkUpdate?: boolean
  /**
   * Case-insensitive regex of older files to delete before installing this
   * one (e.g. `^viafabricplus.*\.jar$` removes outdated versions so the mod
   * is always up to date without duplicated mod ids).
   */
  replaces?: string
}

export interface EnsureLumenModsOptions {
  /**
   * The instance path
   */
  instancePath: string
  /**
   * The mod files to ensure
   */
  files: LumenClientModFile[]
  /**
   * Case-insensitive regex patterns of file names to delete from the mods
   * folder (used when an optional mod is toggled off).
   */
  remove?: string[]
}

interface LumenClientServiceEventMap {
  /**
   * Emitted when a file downloaded from the embedded web browser finishes.
   */
  'browser-download-done': {
    fileName: string
    path: string
    state: 'completed' | 'cancelled' | 'interrupted'
  }
}

/**
 * Provide the ability to install the Lumen Client mod (and its dependencies)
 * into an instance `mods` folder, downloading only the missing files.
 */
export interface LumenClientService extends GenericEventEmitter<LumenClientServiceEventMap> {
  /**
   * Ensure the given mod files exist under the instance `mods` folder.
   * Missing files are downloaded from their url.
   * @returns the file names that were actually downloaded
   */
  ensureMods(options: EnsureLumenModsOptions): Promise<string[]>
  /**
   * Check which of the given file names already exist in the instance `mods` folder.
   */
  getInstalledMods(instancePath: string, fileNames: string[]): Promise<string[]>
}

export const LumenClientServiceKey: ServiceKey<LumenClientService> = 'LumenClientService'
