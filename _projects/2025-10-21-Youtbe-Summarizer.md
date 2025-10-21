---
layout: page
title: YouTube Summarizer
description: Building a Chrome Extension to Summarize YouTube Videos
importance: 1
img: /assets/img/youtube_summarizer/YouTube_full-color_icon_(2017).svg.png
category: fun
---

I've been watching a lot of YouTube lately—videos on soccer, basketball, Pokémon, and more. But I've noticed that much of today's content is padded with fluff. Many videos are clickbait: you sit through 10+ minutes and learn almost nothing.

Out of frustration, I wished for a tool that could summarize videos for me. While some videos are definitely worth watching in full, most are time sinks where 10 minutes of your life vanishes. These minutes add up to entire evenings of lost productivity.

This led me to search for a video summarization tool. While options like [NotebookLM](https://notebooklm.google/) can do exactly this, I decided to build my own Chrome extension for the challenge and learning experience.

The concept is straightforward: a button appears in the top-right corner of the YouTube video page. 
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/youtube_summarizer/plugin.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
When you click "Generate Summary," the extension sends a request to Google's Gemini LLM using their [Video Understanding API](https://ai.google.dev/gemini-api/docs/video-understanding) to generate a concise summary of the video content.
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/youtube_summarizer/summary.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Since I'm using the free Gemini API tier, the results can be slightly unstable at times—you may need to retry occasionally. For those interested in the implementation, check out the [repository](https://github.com/tsangcharles/youtube-summarizer).

Overall, this was a fun project that has helped me save considerable time. The irony, however, is that the more time I save, the more videos I end up watching—albeit in summarized form. 