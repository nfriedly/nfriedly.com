---
title: Bloko Sports Proxy
link: http://bloko.me//
picture: "/img/portfolio/bloko.png"
date: 2014-04-01
tags:
 - JavaScript
 - Node.js
 - Sails.js
 - Backbone.js
 - AJAX
 - AWS
---
The Bloko Sports Proxy allows you to browse the internet without fear of "spoilers" telling you the final score of a game you were looking forward to watching later.

I was brought into the Bloko project a little late into the game. Most of the functionality was built, but it was extremely disorganized, very slow, and full of bugs. The back-end was built around Sails.js + my node-unblocker project, and the front-end was a single gigantic "spaghetti code"  file of jQuery selectors, repeated AJAX calls, multi-purpose methods, and unmanaged global data structures.

I set to work fixing a large number of broken / unreliable features. In the process, I added some basic testing and code quality checks, organized the front-end into a Backbone.js app split into logical components, automated the deployment process, removed a ton of dead code and unused libraries, and made the entire project considerably more reliable and performant.
