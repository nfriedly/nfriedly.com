---
title: GET method override middleware for Connect / Express
link: https://github.com/nfriedly/connect-method-override-get
tags: 
  - JavaScript
  - Express
  - NPM
  - Open Source
write: false
---

Takes an HTTP GET request such as <code>GET /foo/1234?method=PUT&data=...</code> and causes the rest of the system to treat it as if it were the method named in the querystring (PUT in this case).