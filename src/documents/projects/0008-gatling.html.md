---
title: Gatling: Node.js app server
link: "https://github.com/nfriedly/node-gatling"
tags: 
  - Node.js
  - JavaScript
  - Open Source
  - Travis CI
write: false
---

I built Gatling to abstract some of the repetitive work I saw myself doing with each Node.js 
project I deploy: setting up a cluster server to use all available CPU cores, adding domains 
to prevent errors in one request from killing other request, setting up monitoring, and a 
few other small things.

It's designed to play nice with Connect / Express-style apps as well as simple 
`http.createServer(myServer)` sort of applications.

Runs a Mocha-based suite of unit tests on every git push: [![Build Status](https://travis-ci.org/nfriedly/node-gatling.png?branch=master)](https://travis-ci.org/nfriedly/node-gatling)