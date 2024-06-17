---
title: Unblocker
picture: /img/portfolio/nodeunblocker.png
thumbnail: /img/portfolio/thumbs/nodeunblocker.png
github: node-unblocker
travis: node-unblocker
npm: unblocker
tags: 
  - Node.js
  - JavaScript
  - Open Source
  - Continuous Integration
  - Express
write: false
---

After seeing significant interest in using my Node Unblocker website's source as the basis for other projects, I reworked it into an [express](http://expressjs.com/)-friendly node.js module.

I added an API to allow custom middleware to be easily inserted into the processing and re-wrote nearly all of the internals to use the new API.

Other notable changes included re-writing the cookie-handling to not require a database, reworking the charset decoding for greater speed and reliability, and even more automated tests.

In addition to code changes, I worked with the project's other contributors to enable an alternate licensing option for businesses that cannot comply with the projects AGPL license.
