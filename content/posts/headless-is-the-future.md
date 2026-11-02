---
title: Headless is the future. Or is it?
date: 2026-11-02
description: Headless software doesn't mean getting rid of interfaces. It means separating the data and functionality from how we interact with it.
---

I've been pretty skeptical of the push toward headless software. Everyone is building MCPs and talking about agents replacing interfaces, but a lot of these interfaces exist for a reason.

Recently, I've started to change my mind. At least partly.

For years, I've used Reflect to track all my meeting notes. I'd write notes, copy in recordings and summaries, and try to keep everything organized. The funny thing is, I rarely went back and read any of it. When I did, I was usually looking for something specific or trying to piece together information from a bunch of different conversations.

A few weeks ago, I spent a day exploring replacements with ChatGPT. I was trying to figure out how to use Granola and pipe everything into Reflect, Notion, or somewhere else where I could consolidate all my information.

Then ChatGPT suggested I just leave everything in Granola and connect to it through MCP.

It was a bit of an aha moment for me. Why am I spending all this time trying to organize and consolidate information when I can just access it whenever I need it?

**We're moving from organizing information to accessing information.**

I've always been the type of person who wants everything organized in one place. But the whole reason I was organizing it was so I could find and use it later. If an LLM can access all that context across different applications and pull it together when I need it, why do I care where it lives?

This is where headless software starts to make a ton of sense.

I was watching [this video from Theo](https://www.youtube.com/watch?v=m-B3jIMMmUE) where he makes a similar point from the perspective of building software. How many features are we building that are really just different ways of accessing or presenting information that already exists?

If an LLM already has access to the underlying data, do we really need to build and maintain a new feature for every way someone might want to interact with it?

That's a pretty big shift in how we should be thinking about building products.

But I still struggle with the idea that everything becomes headless.

At Rove, we're building pretty complicated pricing tools to help property owners understand their pricing and make adjustments. You want to see calendars, compare prices, understand trends, and visualize the impact of changes. I can't imagine trying to do all of that through a chat interface.

Similarly, at PostHog, there's a reason AI is being used to build dashboards and visualizations rather than just returning text summaries of your analytics. Sometimes you really do need to see the data.

Although, the more I've thought about it, the more I've realized **just because we need an interface doesn't mean it needs to live in the application where the data is stored.**

We're starting to see this with generative interfaces. Rather than navigating through a bunch of predefined screens, an agent can pull together the context it needs and generate an interface around whatever you're trying to do.

Personal agents like Instinct and Muse are starting to explore this direction. The agent becomes the place you interact with everything, while MCPs provide the underlying data and functionality.

I think this is going to work incredibly well for a lot of use cases, but I'm still not convinced it replaces deeply specialized interfaces.

Take our pricing tools at Rove. There's a huge amount of domain knowledge, complexity, and nuance that goes into building a good experience. It's hard for me to imagine an LLM having enough context to generate something as useful as what a team that deeply understands the problem can build. Maybe it can handle individual interactions, but replacing the entire experience is another thing.

So I'm starting to think headless doesn't necessarily mean getting rid of interfaces. It means separating the data and functionality from how we interact with it.

For some products, the interface might become almost entirely generative. For others, the purpose-built interface will continue to be a huge part of the value.

But if we increasingly interact with software through agents rather than opening individual applications, I think it raises a much bigger question for anyone building software.

**How many of the features we're building today will people actually need tomorrow?**
