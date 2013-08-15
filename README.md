nfriedly.com
============

In-progress replacement for my current website.

Todo: 

* Get header looking more like I want
* More pictures
* Patch up homepage feeds
* Build blog archive, make it filterable by tag
* Add "about me" page
* Add portfolio, make it filterable by tag
* Re-write work section
* Set up redirects for old urls
* Add custom 404 page
* Fix blog "footnote" links

Build instructions
------------
This site is built on top of [node.js](http://www.nodejs.org/) and [DocPad](http://docpad.org/). 

1. Download and install node.js from http://www.nodejs.org/
2. Install DocPad: http://docpad.org/docs/install
3. Run `docpad run` in this directory
4. Install plugins if necessary (?) - see package.json for a list.
5. Edit or remove `src/files/CNAME` and then run `docpad deploy-ghpages` to deploy to github