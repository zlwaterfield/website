---
title: How this blog works
date: 2026-10-19
description: A quick reference for writing posts on this site.
draft: true
---

This post is a draft, so it only shows up when running `npm run dev`. It never ships to production. Delete it once you've published something real.

## Writing a post

Every post is a markdown file in `content/posts/`. The filename becomes the URL, so `content/posts/on-hiring.md` lives at `/blog/on-hiring`.

The top of each file has a little bit of frontmatter:

```md
---
title: On hiring
date: 2026-10-19
updated: 2026-11-04
description: One line that shows up in previews and RSS.
tags: [hiring, startups]
draft: true
---
```

Only `title` and `date` are required. Remove `draft: true` (or set it to `false`) when it's ready to go live.

`description` earns its keep: it becomes the meta description, the lede under
the title, the RSS summary, the schema.org `abstract`, and the one-line gloss in
`llms.txt`. Write it as a complete sentence that stands on its own, because
that's often the only part of a post an AI answer ever quotes.

`updated` is optional and worth setting when you meaningfully revise a post.
Freshness is one of the few things that reliably moves whether a model cites
you, and it feeds `dateModified`, the sitemap, and the visible byline.

`tags` are optional too. They show up as keywords in the post metadata, as
`<category>` entries in RSS, and in the schema.org `keywords` field.

## How a post gets read by machines

Each post is published in four shapes, all generated from the same markdown:

- The HTML page, with `BlogPosting` JSON-LD and a byline.
- Markdown at `/md/blog/<slug>.md`, linked from the page as
  `rel="alternate" type="text/markdown"`. Agents fetch this instead of parsing
  HTML.
- Full text inside [`/llms-full.txt`](/llms-full.txt).
- Full text inside the RSS feed via `content:encoded`.

`##` and `###` headings automatically get ids and anchor links, so a passage can
be cited directly at `/blog/<slug>#the-heading`. Use them — they also become the
post's outline in structured data.

## What you can use

Regular markdown works. **Bold**, *italics*, [links](https://zlwaterfield.com), and lists:

- Bullet points
- Like this one
- And this one

1. Numbered lists
2. Work too

> Blockquotes are nice for pulling in something someone else said.

Images go in `public/blog/` and are referenced like `![alt text](/blog/photo.jpg)`.

---

That's it. Write, commit, push.
