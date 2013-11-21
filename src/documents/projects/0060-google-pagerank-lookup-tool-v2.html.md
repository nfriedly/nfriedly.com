---
title: Google PageRank Lookup Tool v2
link: "http://pagerank.nfriedly.com"
picture: /img/portfolio/pagerank.png
thumbnail: /img/portfolio/thumbs/pagerank.png
tags: 
  - Node.js
  - Backbone.js
  - Bootstrap
  - Redis
  - Grunt
  - Amazon S3
  - Amazon CloudFront
  - Heroku
  - Browserify
  - Express
write: false
---

A Google PageRank tool uses my <a href="https://github.com/nfriedly/node-pagerank">node-pagerank</a> library. Allows the visitor to lookup the PageRank of one or more sites and stores the results for later use. Also includes a bookmarklet for easy access. This node.js version replaces my previous php-based app.

Built on the Twitter Bootstrap CSS foundation and Backbone.js and Browserify for the front-end. Uses node.js Express.js, and Redis for the back-end. Static assets are served through Amazon's CouldFront CDN while the dynamic portions are hosted on Heroku. Uses Stripe used for paid accounts.