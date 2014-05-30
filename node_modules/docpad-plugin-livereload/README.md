# Live Reload Plugin for [DocPad](https://docpad.org)

<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/docpad/docpad-plugin-livereload.png?branch=master)](http://travis-ci.org/docpad/docpad-plugin-livereload "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/docpad-plugin-livereload.png)](https://npmjs.org/package/docpad-plugin-livereload "View this project on NPM")
[![Dependency Status](https://david-dm.org/docpad/docpad-plugin-livereload.png?theme=shields.io)](https://david-dm.org/docpad/docpad-plugin-livereload)
[![Development Dependency Status](https://david-dm.org/docpad/docpad-plugin-livereload/dev-status.png?theme=shields.io)](https://david-dm.org/docpad/docpad-plugin-livereload#info=devDependencies)<br/>
[![Gittip donate button](http://img.shields.io/gittip/docpad.png)](https://www.gittip.com/docpad/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/9ef59f5479eec1d97d63382c9ebcb93a "Donate once-off to this project using BitCoin")
[![Wishlist browse button](http://img.shields.io/wishlist/browse.png?color=yellow)](http://amzn.com/w/2F8TXKSNAFG4V "Buy an item on our wishlist for us")

<!-- /BADGES -->


Automatically refreshes your [DocPad](https://docpad.org) built website whenever a regeneration is performed



## Install

1. Install the Plugin

	``` bash
	docpad install livereload
	```

1. Ensure your layout outputs the scripts block

	1. In eco:
		
		```
		<%- @getBlock('scripts').toHTML() %>
		```
	  
	1. In jade:

		``` jade
		!= getBlock('scripts').toHTML()
		```


## Configure

### `enabled`
This option specifies whether or not this plugin should be enabled or disabled, by default it is `true` for the development environment and `false` for all other environments.

### `inject`
This option specifies whether or not we should try to inject our socket library into the page. It is `true` by default.

### `getSocket`
This option when falsey (the default) means we will create our own socket instance, however if you already have your own socket instance you can set this option as a function that will return your own socket instance.

### `channel`
This option specifies the which channel we should listen to, it defaults to `/docpad-livereload`

### `socketOptions`
This option allows you to customise the [primus configuration](https://github.com/3rd-Eden/primus) that we use if we have to create our own instance.

### `generateBeforeBlock`, `generateAfterBlock`, `listenBlock`, `injectBlock`, `scriptBlock`, `styleBlock`
These options allow you to customise the content of the scripts and styles that are injected into your page by this plugin. Check out the source code of this plugin to figure out their usage.


## Troubleshooting

- [Watching doesn't work, works only some of the time, or I get `EISDIR` errors](http://docpad.org/docs/troubleshoot#watching-doesn-t-work-works-only-some-of-the-time-or-i-get-eisdir-errors)


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/docpad/docpad-plugin-livereload/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/docpad/docpad-plugin-livereload/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/docpad.png)](https://www.gittip.com/docpad/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")
[![BitCoin donate button](http://img.shields.io/bitcoin/donate.png?color=yellow)](https://coinbase.com/checkouts/9ef59f5479eec1d97d63382c9ebcb93a "Donate once-off to this project using BitCoin")
[![Wishlist browse button](http://img.shields.io/wishlist/browse.png?color=yellow)](http://amzn.com/w/2F8TXKSNAFG4V "Buy an item on our wishlist for us")

### Contributors

These amazing people have contributed code to this project:

- [Alex](https://github.com/amesarosh) — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=amesarosh)
- [antoinebrault](https://github.com/antoinebrault) — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=antoinebrault)
- [Benjamin Lupton](https://github.com/balupton) <b@lupton.cc> — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=balupton)
- [Delapouite](https://github.com/Delapouite) — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=Delapouite)
- [GarthDB](https://github.com/GarthDB) — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=GarthDB)
- [scottoreilly](https://github.com/scottoreilly) — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=scottoreilly)
- [vjpr](https://github.com/vjpr) — [view contributions](https://github.com/docpad/docpad-plugin-livereload/commits?author=vjpr)

[Become a contributor!](https://github.com/docpad/docpad-plugin-livereload/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2012+ Bevry Pty Ltd <us@bevry.me> (http://bevry.me)

<!-- /LICENSE -->


