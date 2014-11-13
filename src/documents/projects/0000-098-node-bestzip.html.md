---
title: node-bestzip
link: https://github.com/nfriedly/node-bestzip
npm: bestzip
tags:
  - JavaScript
  - Node.js
  - NPM
  - Open Source
---

I needed a scribble `zip` command that worked both on Windows and Mac. 
Windows has no native `zip` command, so `bestzip` uses a Node.js implimentation there.
However, Mac OS X includes a native `zip` command that is both faster than the Node.js implementations and produces smaller files, 
so `bestzip` will use that one whenever possible.