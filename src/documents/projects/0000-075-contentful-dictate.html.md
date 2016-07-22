---
title: Contentful Dictate UI Extension
link: https://github.com/nfriedly/contentful-dictate/
picture: /img/portfolio/contentful-dictate.png
date: 2016-07-14

tags:
 - Node.js
 - JavaScript
 - Open Source
 - Express
---

[Contentful] is a hosted <abbr title="Content Management System">CMS</abbr> with a friendly-yet-powerful back-end UI, and an API-only front-end.
Their [UI Extension SDK] enables custom content fields to provide greater flexibility when needed.

Contentful Dictate was a quick 2-hour hack (+ some polish added later) to create a voice dictation text field with my Watson Speech SDK.

The extension automatically matches the content's locale to the closest Watson voice model, and also matches contentful's styles.

Given that microphone access is only available in fairly modern browsers, I was able to use quite a lot of ES6/ES2015 syntax without needing any ES5 transpilation.

[Contentful]: https://www.contentful.com/
[UI Extension SDK]: https://github.com/contentful/ui-extensions-sdk
