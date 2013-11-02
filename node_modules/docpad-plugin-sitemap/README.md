# Sitemap Plugin for [DocPad](http://docpad.org)

[![Build Status](https://secure.travis-ci.org/docpad/docpad-plugin-sitemap.png?branch=master)](http://travis-ci.org/docpad/docpad-plugin-sitemap "Check this project's build status on TravisCI")
[![NPM version](https://badge.fury.io/js/docpad-plugin-sitemap.png)](https://npmjs.org/package/docpad-plugin-sitemap "View this project on NPM")

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
	plugins:
		sitemap:
			cachetime: 600000
			changefreq: 'weekly'
			priority: 0.5
```

Site URL is read from the `templateData.site.url` property also in that same config file, but will fallback to the `hostname` property in the plugin config if not found.


## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2012+ [Ben Delarre](http://delarre.net)
