---
title: set-cookie-parser
github: set-cookie-parser
npm: set-cookie-parser
travis: set-cookie-parser
date: 2015-07-01
tags:
 - Node.js
 - JavaScript
 - npm
 - Open Source
 - React
 - Continuous Integration
---

Library to allow Node.js (and other non-browser JS environments such as React Native) to parse Set-Cookie headers sent by other servers. 

Most Set-Cookie headers are straightforward to parse, but the HTTP spec allows for headers to be combined into a single comma-separated string, which adds some significant complexity to parsing. 

set-cookie-parser is well-tested and widely deployed both in apps and as a dependency in other over 100 other libraries with over 1 million monthly downloads.

This library was initially part of [unblocker](https://github.com/nfriedly/node-unblocker), but was spun off due to it's complexity and gnereral usefullness. 