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
description: One line that shows up in previews and RSS.
draft: true
---
```

Remove `draft: true` (or set it to `false`) when it's ready to go live.

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
