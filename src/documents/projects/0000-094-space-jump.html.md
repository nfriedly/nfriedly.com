---
title: Space Jump
link: http://nfriedly.github.io/space-jump/
picture: /img/portfolio/space-jump.png
date: 2015-01-04
github: space-jump
travis: space-jump
tags:
  - JavaScript
  - Canvas
  - gulp.js
  - Mobile First
  - Continuous Integration
---

Fun little browser-based game, sort of a cross between Doodle Jump and Moon Lander.
I put it together over my Christmas vacation with the primary goals of having some fun and getting more experience rendering 2d graphics.

While I'm normally a big proponent of building on top of existing tools and frameworks, I decided to go "bare metal" with this one: the game itself is written in vanilla JavaScript with no dependencies whatsoever.

The background image is from NASA; all graphics are either hand drawn or prodecuraly generated. The levels themselves are procedurally generated.

On a desktop browser, the game uses arrow keys to navigate. However, on a mobile device, it use touch + tilt controls via the HTML5  `touchstart`/`touchend` and `deviceorientation` APIs.

Renders at a smooth 60 FPS on every device I've tested on.