# Redirector Plugin for [DocPad](https://docpad.org)


[DocPad](https://docpad.org) plugin for redirecting URLs to other websites. Similar to (and based on) [clean urls](https://github.com/docpad/docpad-plugin-cleanurls) plugin.



## Install

```
docpad install redirector
```


## Usage/Configure

Creates 301 redirects for non-static environments.

Creates html files at the source urls with 0-second meta refresh tags pointing to the destination url for static environments. Creates a directory with an `index.html` file if the source url does not end in `.html` (e.g. `somelink` will be generated as `somelink/index.html`). 

You can tell docpad to use the static environment by adding `--env static` to the end of your DocPad command, so to perform a one off generation for a static environment you'll run `docpad generate --env static`, to perform your usual generate, serve and watch it'll be `docpad run --env static`.

``` coffee
    plugins:
        redirector:
            redirects: 
                # source: destination
                "project/": "http://new-site.com/"
                "project/info.html": "http://new-site.com/new-info-page"
```

Currently, this plugin only supports one-to-one redirects, and only to off-site URLs. To redirect to URLs on your website, use the [clean urls](https://github.com/docpad/docpad-plugin-cleanurls) plugin. (You can use both cleanurls and redirector at the same time.)

Wildcards and regular expressions are not supported.



## Contributing
[You can discover the contributing instructions inside the `Contributing.md` file](https://github.com/nfriedly/docpad-plugin-redirector/blob/master/Contributing.md#files)



## MIT License

Copyright &copy; 2013 Nathan Friedly - http://nfriedly.com
<br/>Copyright &copy; 2012+ [Bevry Pty Ltd](http://bevry.me) <us@bevry.me>
<br/>Copyright &copy; 2011 [Benjamin Lupton](http://balupton.com) <b@lupton.cc>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.