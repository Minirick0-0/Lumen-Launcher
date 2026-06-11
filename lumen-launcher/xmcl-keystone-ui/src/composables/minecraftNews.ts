import useSWRV from 'swrv'

export interface MinecraftNewsEntry {
  title: string
  tag: string | null
  category: string
  date: string
  text: string
  playPageImage?: { title: string; url: string }
  newsPageImage?: { title: string; url: string }
  readMoreLink: string
  newsType?: string[]
  id: string
}

export interface MinecraftNewsItem extends MinecraftNewsEntry {
  imageUrl: string
}

/**
 * Official Minecraft news from the Mojang launcher content feed.
 */
export function useMinecraftNews(limit = 10) {
  const { data, error, isValidating } = useSWRV('/minecraft-news', async () => {
    const resp = await fetch('https://launchercontent.mojang.com/v2/news.json')
    if (!resp.ok) return [] as MinecraftNewsEntry[]
    const result = await resp.json()
    return (result.entries ?? []) as MinecraftNewsEntry[]
  })

  const news = computed<MinecraftNewsItem[]>(() =>
    (data.value ?? [])
      .filter((e) => e.readMoreLink && (e.newsPageImage || e.playPageImage))
      .slice(0, limit)
      .map((e) => ({
        ...e,
        imageUrl: new URL(
          (e.newsPageImage ?? e.playPageImage)!.url,
          'https://launchercontent.mojang.com',
        ).toString(),
      })),
  )

  return { news, error, isValidating }
}
