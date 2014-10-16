---
title: IBM Watson Developer Cloud
link: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/
picture: /img/portfolio/ibm-wdc.png
tags:
  - AngularJS
  - SASS
  - HTML
  - Require.js
  - gulp.js
  - DocPad
---

My first project at IBM was getting the WDC website ready for launch. This included some design changes and
a range of enhancements for performance, usability, accessibility, analytics, etc.

The site is a multi-page AngularJS app, it was initially using Require.js to load up the 20+ javascript files
individually and some AngularJS calls to load templates and data and such.
I removed Require.js and bundled everything into a single file with a simple gulp.js script that also minified the code.

Other changes included  a custom AngularJS directive to ensure links had appropriate tracking strings, syntax highlighting on code samples,
embeddable versions of the service pages, and an automatically generated Table of Contents for the documentation.

The next revision, which is currently in progress, will see the site generated as plain HTML files and the AngularJS app removed entirely.
It will also feature better mobile support.

