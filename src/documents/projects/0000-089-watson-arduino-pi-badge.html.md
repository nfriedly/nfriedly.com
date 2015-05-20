---
title: Personality Insights Badge
link: https://github.com/watson-developer-cloud/arduino-pi-badge-demo
picture: /img/portfolio/watson-pi-twitter-badge.jpg
date: 2015-05-10

tags:
  - Python
  - Arduino
  - C++
  - IoT
  - hardware
  - Open Source
  - Twitter
---

My second Watson/<abbr title="Internet of Things">IoT</abbr> demo, this one uses an Arduino Yún to pull my recent tweets,
run them through the IBM Watson Personality Insights service, and display the "Big 5" personality traits on a LCD.

The Arduino calls a Python script on the Linux side of the Yún to connect to Watson and Twitter (mainly for https support), 
and then cycles through the results on the screen.

Can be powered from battery and tethered to a cellphone for complete portability.

