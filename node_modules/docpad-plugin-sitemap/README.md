# Sitemap Plugin for [DocPad](http://docpad.org)

<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/docpad/docpad-plugin-sitemap.png?branch=master)](http://travis-ci.org/docpad/docpad-plugin-sitemap "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/docpad-plugin-sitemap.png)](https://npmjs.org/package/docpad-plugin-sitemap "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/docpad.png)](https://www.gittip.com/docpad/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

<!-- /BADGES -->


This DocPad plugin will automatically generate a valid `sitemap.xml` file for search engines. It's merely a wrapper for the [sitemap.js](https://github.com/ekalinin/sitemap.js) library.

This project was forked from the solid start made by [Khalid Jebbari](https://github.com/DjebbZ/docpad-plugin-sitemap).

To learn more about sitemap.xml files, read [the protocol](http://www.sitemaps.org/).


## Installation

``` bash
docpad install sitemap
```


## Usage

For each document, you can specify the following metadata :

``` coffee
changfreq: 'always' || 'hourly' || 'daily' || 'weekly' || 'monthly' || 'yearly' || 'never' # Change frequency, defaults to 'weekly'
priority: 0.5 # value between 0.0 and 1.0, defaults to 0.5
sitemap: true || false # defaults to true, if false no entry for this document will be generated
```

For the whole site you can set defaults using the plugin configuration in your docpad.cson or docpad.coffee file.

``` coffee
	templateData:
		site:
			url: "http://your-website-production-url.com"  # required for sitemap
	
	plugins:
		sitemap:
			cachetime: 600000
			changefreq: 'weekly'
			priority: 0.5
			filePath: 'sitemap.xml'
```


By default all HTML files on your site will be considered for inclusion. To specify a different collection, change the `collectionName` plugin configuration option like so:

``` coffee
	plugins:
		sitemap:
			collectionName: 'someCollectionName'
```


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/docpad/docpad-plugin-sitemap/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/docpad/docpad-plugin-sitemap/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Ben Delarre <ben@delarre.net> (http://www.delarre.net)
- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/docpad.png)](https://www.gittip.com/docpad/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

### Contributors

These amazing people have contributed code to this project:

- Ben Delarre <ben@delarre.net> (https://github.com/benjamind) - [view contributions](https://github.com/docpad/docpad-plugin-sitemap/commits?author=benjamind)
- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton) - [view contributions](https://github.com/docpad/docpad-plugin-sitemap/commits?author=balupton)
- Bruno Heridet (https://github.com/Delapouite) - [view contributions](https://github.com/docpad/docpad-plugin-sitemap/commits?author=Delapouite)
- Khalid Jebbari <khalid.jebbari@gmail.com> (https://github.com/DjebbZ) - [view contributions](https://github.com/docpad/docpad-plugin-sitemap/commits?author=DjebbZ)
- raffomania (https://github.com/raffomania) - [view contributions](https://github.com/docpad/docpad-plugin-sitemap/commits?author=raffomania)

[Become a contributor!](https://github.com/docpad/docpad-plugin-sitemap/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2012+ Ben Delarre <ben@delarre.net> (http://www.delarre.net)

<!-- /LICENSE -->


