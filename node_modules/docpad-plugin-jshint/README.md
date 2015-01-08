# [JSHint](http://www.jshint.com/) Plugin for [DocPad](https://docpad.org)

[![NPM version](https://badge.fury.io/js/docpad-plugin-jshint.png)](https://npmjs.org/package/docpad-plugin-jshint "View this project on NPM")
[![Dependency Status](https://gemnasium.com/jking90/docpad-plugin-jshint.png)](https://gemnasium.com/jking90/docpad-plugin-jshint)
[![Build Status](https://travis-ci.org/jking90/docpad-plugin-jshint.png?branch=master)](https://travis-ci.org/jking90/docpad-plugin-jshint)
[![Gittip donate button](http://img.shields.io/gittip/jking90.png)](https://www.gittip.com/jking90/ "Donate weekly to this project using Gittip")


## Install
```
npm install --save docpad-plugin-jshint
```

## Configure
For information on customizing your plugin configuration you can refer to the [DocPad FAQ](https://github.com/bevry/docpad/wiki/FAQ)

### Ignore Files 
```
ignoreFiles: ['path/file.js']
```
`ignoreFiles` accepts an array of file paths to ignore while hinting.

### Ignore Paths
```
ignorePaths: ['path/']
```
`ignorePaths` accepts an array of directory paths to ignore while hinting.

### Ignore Minified Files
```
ignoreMinified: boolean
```
`ignoreMinified` accepts a boolean which determines whether files ending in `.min.js` are ignored. The default is `true`.

### Globals
```
globals: {var: boolean}
```
`globals` is an object of global variables, with keys as names and a boolean value to determine if they are assignable.

It's recommended you define these in a `.jshintrc` file instead of config options to make your preferences more portable.

### JSHint options
`hintOptions` is an object where you can pass any of [JSHint's options](http://www.jshint.com/docs/options/)

It's recommended you define these in a `.jshintrc` file instead of config options to make your preferences more portable.

## History
[You can discover the history inside the `History.md` file](https://github.com/jking90/docpad-plugin-jshint/blob/master/History.md)


## Contributing
[You can discover the contributing instructions inside the `Contributing.md` file](https://github.com/jking90/docpad-plugin-jshint/blob/master/Contributing.md)


## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2013+ [Jimmy King](http://jimmyking.me) <hello@jimmyking.me>
