nfriedly.com
============

In-progress replacement for my current website.

Todo: 

* Clean up homepage images
* Bootstrap 3 upgrade
* Tweak typography
* Color Scheme
* Add post custom header support
* Shrink header images to reasonable sizes
* Header image paralax effect
* Style up footer
* Build blog archive
* Build portfolio
* Add portfolio content
* Create tag filtering options
* Add "about me" page
* Set up redirects for old urls
* Add custom 404 page
* Add post dates
* Favicon(s) - <link rel="shortcut icon" href="/favicon.ico" />

Build instructions
------------
This site is built on top of [node.js](http://www.nodejs.org/) and [DocPad](http://docpad.org/). 

1. Download and install node.js from http://www.nodejs.org/
2. Install DocPad: http://docpad.org/docs/install
3. Run `docpad run` in this directory
4. Install plugins if necessary (?) - see package.json for a list.
5. Edit or remove `src/files/CNAME` and then run `docpad deploy-ghpages` to deploy to github