---
title: Google Pagerank Lookup Tool v1
link: /pagerank
tags: 
  - PHP
  - JavaScript
  - PageRank
  - HTML
  - CSS
  - SQLite
write: false
---

<div class="right"><a href="/pagerank" title="PageRank: 7/10" style="text-decoration: none; color: inherit; display: block; padding: 10px; margin-left: 10px; border: 1px solid rgb(204, 204, 204);"><div style="width: 40px; margin-top:7px;" class="prbar"><strong style="width: 70%;"><span></span></strong></div> 7</a></div>I needed a reliable pagerank lookup tool and all of the existing ones were unreliable and/or spammy. I built myself a clean, straightforward pagerank lookup tool that allows for multiple urls to be checked at once and also offers a JavaScript bookmarklet to check any individual page.

The tool stores results in an SQLite database to avoid repetedly hitting Google's servers and keeps a "recent history" in the user's session.