import setting from '@/config/setting.json'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
const parser = new MarkdownIt()

export async function GET(context) {
  const stories = await getCollection('stories')
  const news = await getCollection('news')
  const allPosts = [...stories, ...news]
  allPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))

  return rss({
    title: setting.site.title,
    description: `Latest updates from ${setting.site.title}`,
    site: context.site,
    lastBuildDate: allPosts.length > 0 ? new Date(allPosts[0].data.date) : new Date(),
    language: 'ja',
    items: allPosts.map((post) => ({
      title: post.data.title,
      link:
        post.collection === 'news'
          ? `/news/${post.slug}/`
          : post.data.category.slug
            ? `/stories/${post.data.category.slug}/${post.slug}/`
            : `/stories/uncategorized/${post.slug}/`,
      pubDate: new Date(post.data.date),
      description: post.data.summary || post.body.slice(0, 160).replace(/\n/g, '').replace(/\s+/g, ' '),
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
  })
}
