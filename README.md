nfriedly.com
============

In-progress replacement for my current website. 

Automatic build/deployment status: [![Build Status](https://travis-ci.org/nfriedly/nfriedly.com.png)](https://travis-ci.org/nfriedly/nfriedly.com.png)

Todo: 

* Fix portfolio lightbox
* Set up redirects for old urls
* Add custom 404 page
* Minify and combine stuff
* Split up portfolio content
* Clean up "about me" page
* Add instagram feed to about page - maybe just photos tagged @nfriedly
* Create tag filtering options
* Favicon(s) - <link rel="shortcut icon" href="/favicon.ico" />
* Use media object bootstrap classes
* cleanup img/ directory

Build instructions
------------
This site is built on top of [node.js](http://www.nodejs.org/) and [DocPad](http://docpad.org/). 

1. Download and install node.js from http://www.nodejs.org/
2. Install DocPad: http://docpad.org/docs/install
3. Run `docpad run` in this directory
4. Install plugins if necessary (?) - see package.json for a list.
5. Edit or remove `src/files/CNAME` and then run `docpad deploy-ghpages` to deploy to github



Creative Commons Attribution License on content
-----------------------------------------------

http://creativecommons.org/licenses/by/3.0/deed.en_US



MIT License on code
-------------------

Copyright (c) 2013 Nathan Friedly - http://nfriedly.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.