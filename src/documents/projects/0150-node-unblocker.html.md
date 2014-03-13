---
title: Node Unblocker
link: "http://nodeunblocker.com/"
picture: /img/portfolio/nodeunblocker.png
thumbnail: /img/portfolio/thumbs/nodeunblocker.png
tags: 
  - Node.js
  - JavaScript
  - Heroku
  - Open Source
  - Continuos Integration
  - Continuos Deployment
  - Redis
  - Mobile-First
write: false
---

My second web proxy, this one built in Node.js and designed from the ground up to be faster and compatible with more sites - try out Google Instant Search for an example.

It uses Node.js Streams to modify the data on the fly and store almost nothing in buffers. This is considerably more performant than the traditional method of downloading the entire page before parsing it and passing it along to the user.

Cookies are stored in a Redis database to prevent different sites from clobbering each other.

Was originally built on Node.js 0.4, and has since been updated to take advantages of changes introduced in 0.6, 0.8, 0.10, and soon 0.12.

Continuos Deployment: After each GitHub push, Travis CI automatically runs the tests and deploys to Heroku if everything passes. Application is then monitored by New Relic, and reportedly serving upwards of 1200 requests per minute on a single Heroku instance.

Open Source: <a href="https://github.com/nfriedly/node-unblocker">https://github.com/nfriedly/node-unblocker</a>