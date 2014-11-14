---
title: IBM Watson Developer Cloud
link: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/
picture: /img/portfolio/ibm-wdc.png
date: 2014-10-8
tags:
  - AngularJS
  - SASS
  - HTML
  - Require.js
  - gulp.js
---

My first project at IBM was getting the WDC website ready for launch. This included some design changes and
a range of enhancements for performance, usability, accessibility, analytics, etc.

The site is a multi-page AngularJS app. It was initially using Require.js to load up the 20+ javascript files
individually and some AngularJS calls to load templates and data and such.

The largest performance enhancement I made was to removed Require.js and bundled everything into a single minified file with a
simple gulp.js script.

Other changes included a custom AngularJS directive to ensure links had appropriate tracking strings,
syntax highlighting on embedded code samples,
embeddable versions of the service pages,
and an automatically generated Table of Contents for the documentation.

