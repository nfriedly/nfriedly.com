---
title: Redirector plugin for DocPad
link: "https://github.com/nfriedly/docpad-plugin-redirector"
icon: "angle-double-right"
tags: 
  - DocPad
  - CoffeeScript
  - Continuos Integration
  - NPM
  - Open Source
write: false
---

Creates the static equivalent of 301/302 redirects for static websites (0-second meta refreshes) via configuration.

One of my major goals for v5 of nfriedly.com was a completely static website. This meant that all of the dynamic portions of my website had to be moved offsite (heroku was a big help here). At the time, DocPad didn't have a plugin to redirect certain urls to offsite locations, so I built one.

Written with CorreeScript and Cake and tested with Chai and DocPad's built-in test system (standard DocPad conventions).