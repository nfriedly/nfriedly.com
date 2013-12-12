---
title: Meteor ODB-II Engine Diagnostic Code lookup tool
link: http://odb-ii.meteor.com/
picture: /img/portfolio/odb-ii.png
tags:
 - Meteor
 - JavaScript
 - BootStrap
 - HTML
 - CSS
 - Open Source
 - Mongo DB
 - Mobile First
 - Continuos Deployment
---
I built this to look up ODB-II diagnostic codes from my phone. (And also because I wanted to learn <a href="http://www.meteor.com/">Meteor</a> a bit better.)

The tool searches through a database of codes as you type and also gives some general information about ODB-II and how to acquire the tools.

Continuously deployed to Meteor's infrastructure after each GitHub push via Travis CI. This actually took some work to get setup because Meteor's deploy command expects a password to be typed in, and the `expect` command that would usually make this easy to automate is not present in Travis CI's environment. So we first have to install meteor, then expect, then we can build and deploy the app. 

Source code is available on GitHub: https://github.com/nfriedly/Meteor-ODB-II