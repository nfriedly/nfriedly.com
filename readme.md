[nfriedly.com]
============

My personal website. Introduces me, shows off a bit of my work. 

Built with [DocPad], [Markdown], [Bootstrap], and [Node.js]. Hosted on [GitHub Pages] and accelerated by [Amazon CloudFront]. Continously deployed by [Travis CI].

[![Build Status](https://travis-ci.org/nfriedly/nfriedly.com.png)](https://travis-ci.org/nfriedly/nfriedly.com)

Todo:
* Update font-awesome to 4.x
* Minify and combine stuff - https://github.com/balupton/buildr
* Clean up "about me" page - mention bicycling, money, pleasant hill, etc
* Add instagram feed to about page - maybe just photos by or tagged @nfriedly
* Favicon(s) - <link rel="shortcut icon" href="/favicon.ico" />
* cleanup img/ directory
* Remove modified dependencies and get back to npm ones
* Stop calling it "blog" and start calling it "articles". Relatedly, remove the date from the links.
* Write an article abut building this site - docpad basics, auto-deployment with travis ci, gh-pages + cloudfront, redirector plugin, bug fixing, etc
* consider https://github.com/lucor/docpad-plugin-navlinks and http://docpad.org/plugin/related/ for article pages
* Add travis build images to appropriate projects & https://david-dm.org/nfriedly/Javascript-Flash-Cookies for node ones
* Figure out new project naming / sorting
* Add a dropdown menu to the top with active projects - generate it from the portfolio
* Trim up portfolio - remove or at least lazy-load some older projects
* Consider moving site to www. and dropping cloudfront.
* Make it not generate separate pages for each project

Build instructions
------------------ 

1. Download and install node.js from http://www.nodejs.org/
2. Install DocPad: http://docpad.org/docs/install
3. Install ImageMagic: http://www.imagemagick.org/script/binary-releases.php (or `brew install imagemagick` on OS X w/ homebrew)
4. Recompile plugins (if necessary): `npm rebuild`
5. Run `docpad run` in this directory to compile and view the site locally
6. Edit or remove `src/files/CNAME` and then run `docpad deploy-ghpages` to deploy to GitHub


Creative Commons Attribution License on my content
--------------------------------------------------

http://creativecommons.org/licenses/by/3.0/deed.en_US

Note that there are some stock images to which this license does not apply, and there are some images from flickr that are creative commons - appropriate attribution is given on those pages.



MIT License on my code
----------------------

Copyright (c) 2013 Nathan Friedly - http://nfriedly.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[nfriedly.com]: http://nfriedly.com/ "Nathan Friedly, JavaScript & Node.js Expert"
[Node.js]: http://www.nodejs.org/
[DocPad]: http://docpad.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[Bootstrap]: http://getbootstrap.com/
[GitHub Pages]: http://pages.github.com/
[Travis CI]: https://travis-ci.org/
[Amazon CloudFront]: https://aws.amazon.com/cloudfront/
