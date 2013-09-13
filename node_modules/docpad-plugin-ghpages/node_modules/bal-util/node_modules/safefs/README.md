# Safe FS

[![Build Status](https://secure.travis-ci.org/bevry/safefs.png?branch=master)](http://travis-ci.org/bevry/safefs "Check this project's build status on TravisCI")
[![NPM version](https://badge.fury.io/js/safefs.png)](https://npmjs.org/package/safefs "View this project on NPM")
[![Gittip donate button](http://badgr.co/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](https://raw.github.com/balupton/flattr-buttons/master/badge-89x18.gif)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](https://www.paypalobjects.com/en_AU/i/btn/btn_donate_SM.gif)](https://www.paypal.com/au/cgi-bin/webscr?cmd=_flow&SESSION=IHj3DG3oy_N9A9ZDIUnPksOi59v0i-EWDTunfmDrmU38Tuohg_xQTx0xcjq&dispatch=5885d80a13c0db1f8e263663d3faee8d14f86393d55a810282b64afed84968ec "Donate once-off to this project using Paypal")

Stop getting EMFILE errors! Open only as many files as the operating system supports.



## Install

1. [Install Node.js](http://bevry.me/node/install)
2. `npm install --save safefs`



## Usage

``` javascript
var safefs = require('safefs');
```

The following [file system](http://nodejs.org/docs/latest/api/all.html#all_file_system) methods are available (but wrapped in safe way to prevent EMFILE errors):

- `readFile(path, options?, next)`
- `writeFile(path, data, options?, next)` - will also attempt to ensure the path exists
- `appendFile(path, data, options?, next)` - will also attempt to ensure the path exists
- `mkdir(path, mode?, next)` - mode defaults to `0o777 & (~process.umask())`
- `stat(path, next)`
- `readdir(path, next)`
- `unlink(path, next)`
- `rmdir(path, next)`
- `exists(path, next)`

For other file system interaction, you can do the following:

``` javascript
// get a slot in the file system queue
require('safefs').openFile(function(closeFile){
	// do our file system interaction
	require('fs').someOtherMethod(a,b,c,function(err,a,b,c){
		// close the slot we are using in the file system queue
		closeFile();
	});
});
```

To make this possible we define a global variable called `safefsGlobal` that manages the available slots for interacting with the file system.



## History
You can discover the history inside the [History.md](https://github.com/bevry/safefs/blob/master/History.md#files) file



## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright © 2013+ [Bevry Pty Ltd](http://bevry.me)
<br/>Copyright © 2011-2012 [Benjamin Arthur Lupton](http://balupton.com)
