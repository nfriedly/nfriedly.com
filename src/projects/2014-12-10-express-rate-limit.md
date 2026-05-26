---
title: Express Rate Limit
link: https://github.com/nfriedly/express-rate-limit
npm: express-rate-limit
# todo: rename 'travis' to something generic like 'ci'
travis: https://github.com/nfriedly/express-rate-limit/workflows/Node.js%20CI/badge.svg
date: 2014-12-10
# picture: /img/portfolio/erl-icon.svg
tags:
  - JavaScript
  - TypeScript
  - Node.js
  - npm
  - Express
  - Open Source
  - Continuous Integration
index: 100
---

<img class="right" src="/img/portfolio/erl-icon.svg" width="150" alt="" /> 

I needed a simple rate-limiter for a project and I didn't see anything that fit the bill, so I put this one together.

The initial release was very simple, and didn't share any state across servers/processes. Since then, it's grown to support a variety of data stores (memcached, redis, postgre, etc.) as well as some related libraries including [ratelimit-header-parser](https://github.com/express-rate-limit/ratelimit-header-parser) and [express-slow-down](https://github.com/express-rate-limit/express-slow-down).

It's now the most popular node.js rate-limiting library, deployed by Microsoft, IBM, Mozilla, Amazon and countless others. [Mozilla recommends it in their Express tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#add_rate_limiting_to_the_api_routes), as does [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices#-62-limit-concurrent-requests-using-a-middleware)

In recent years I've focused more heavily on improving usability, including by running a suite of validation checks early on to catch common misconfigurations along with [documentation on how to fix each one](https://express-rate-limit.mintlify.app/reference/error-codes). 