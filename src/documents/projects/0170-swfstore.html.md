---
title: "SwfStore - a JavaScript Library for Cross-Domain Flash-Cookies"
link: "http://nfriedly.com/techblog/2010/07/swf-for-javascript-cross-domain-flash-cookies/"
github: Javascript-Flash-Cookies
travis: Javascript-Flash-Cookies
bower: javascript-flash-cookies
tags: 
  - JavaScript
  - Flash / ActionScript
  - Open Source
  - Jasmine
  - Continuous Integration
  - Bower
write: false
---

<img class="left" width="160" src="/techblog/wp-content/uploads/2010/07/325990_chocolate_chip_cookies_2.jpg" alt="" />This is a library that allows JavaScript to read and set cookies cross-domain by using flash.

We needed this for one of my projects and I was surprised to find that no such library already existed. So I created it and, with my employer's permission, released it under an MIT license.

Runs a suite of Jasmine-based tests on more than a dozen browsers after every GitHub push via Travis CI and Selenium:

[![Selenium Test Status](https://saucelabs.com/browser-matrix/jsfc.svg)](https://saucelabs.com/u/jsfc)