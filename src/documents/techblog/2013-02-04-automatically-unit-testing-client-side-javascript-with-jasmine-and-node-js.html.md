---
title: Automatically unit testing client-side JavaScript with Jasmine and Node.js
author: nFriedly

url: /techblog/2013/02/automatically-unit-testing-client-side-javascript-with-jasmine-and-node-js/
urls:
    - /2013/02/automatically-unit-testing-client-side-javascript-with-jasmine-and-node-js/
headerImage: http://farm3.staticflickr.com/2376/2243034754_0a9b40d2ff_b.jpg
tags:
  - howto
  - jasmine
  - javascript
  - node.js
  - testing
featured: true
---
<img src="/techblog/wp-content/uploads/2013/02/jasmine_flower.png" alt="jasmine_logo" width="91" height="90" class="alignleft left size-full wp-image-478" /> At [Sociable Labs][2], we have hundreds JavaScript unit tests that run on every checkin. They output a [JUnit][3]-compatible report that [Bamboo][4] can use to track stats and email us if anything failed. Here&#8217;s how we do it.

<!--more-->

Our JavaScript &#8220;build&#8221; process is basically a script that concatenated all of our JS files into a single big file.<sup>[[1]](#note-1)</sup> We added a flag to that process that would skip the `init.js` file and instead add a `module.exports` statement for easy inclusion in [node.js][5].

With this setup, we can quickly run hundreds of [jasmine][6] specs from the command line in any environment we need &#8211; no browser necessary. Our full suite currently takes about 5 seconds to run.

To start off, we installed the [jasmine-node][7] and [jsdom][8] NPM modules:

	npm install jasmine-node
	npm install jsdom

This is the relevant part of our directory structure, the node_modules folder is top-level:

	build/
	node_modules/
	 - ...
	test/js/
	 - environment/
	   - jasmine_helper.js
	 - util/
	   - install_jsdom.sh
	 - gallery_spec.js
	 - ajax_spec.js
	 - etc.


`environment/jasmine_helper.js` is where most of the magic is:

``` javascript
var jsdom = require("jsdom");

window = jsdom.jsdom('<html><head></head><body><div id="rondavu_container"></div></body></html>').createWindow();

if(Object.keys(window).length === 0) {
    // this hapens if contextify, one of jsdom's dependencies doesn't install correctly
    // (it installs different code depending on the OS, so it cannot get checked in.);
    throw "jsdom failed to create a usable environment, try uninstalling and reinstalling it";
}

global.window = window;

global.document = window.document;

var R = global.R = require('../../build/rondavu_test_mode.js');
```

First we create a jsdom environment and verify that it works. (We&#8217;ll come back to that in a minute). Next we make the `window` and `document` variables global. Finally we include the slightly modified version of our compiled JS and set it in a global variable so that tests can hit it&#8217;s internal methods. Jasmine always runs all helper files before the spec files, so the global variables are guaranteed to exist by the time our tests run.

`util/install_jsdom.sh` is necessary because one of jsdom&#8217;s dependencies, contextify, installs differently on different operating systems. Because of that, we added node_modules/jsdom to the `.gitignore` file and run this script before running the js unit tests:

``` bash
#!/bin/bash

# One of JSDOM's dependencies, contextify, cannot be checked in because it installs differently depending on the OS.
# This script checks for the presence of JSDOM and installs it if it's missing
# this line searches npm's local repository for jsdom
# 2> /dev/null is becuse NPM likes to complain about missing readme files in third-party packages
# tr removes the blank line that npm puts out if jsdom isn't found

LS_RESULTS=$(npm --parseable ls jsdom 2>/dev/null | tr -d '\n\')

if [[ -n $LS_RESULTS ]]; then 	# -n tests to see if the argument is non empty
	echo "jsdom is already installed, skipping"
else
    npm install jsdom
fi
```

Note: the *correct* way to do the above is to check in the source and run `npm rebuild`. However, at the time I put this together, there was a bug that prevented that from working.

Next up, the `*_spec.js` files. Basically, any file that ends in &#8220;_spec.js&#8221; will be run automatically by jasmine-node. These are just basic [jasmine][6] test suites. 

If you already have some jasmine specs written, theres&#8217;s a good chance they&#8217;ll just work. If not, now&#8217;s a great time to start ;)

Here&#8217;s a quick example from one of ours:

``` js
describe("Gallery", function() {
    var instance;

    beforeEach(function(){
        instance = new R.Module.Gallery(getConfig());
    });

    afterEach(function(){
        instance.destroy();
        instance = null;
    });

    describe("getTemplateData", function(){
        var data;
        beforeEach(function(){
           data = {mos: []};
        });

        it("should include the current FB user ID", function(){
            var USER_ID = "1234";
            spyOn(R.FB,"getCurrentUserId").andReturn(USER_ID);

            instance.getTemplateData(data);

            expect(R.FB.getCurrentUserId).toHaveBeenCalled();
            expect(data.current_user_id).toBe(USER_ID);
        });

        it("should shuffle the mos when Gallery.ShuffleMos is true", function(){
            var config = getConfig();
            setParam(config, "Gallery.ShuffleMos", true);
            spyOn(R.Util, "shuffle");

            instance = new R.Module.Gallery(config);
            instance.getTemplateData(data);

            expect(R.Util.shuffle).not.toHaveBeenCalled();
        });
    });

    // etc.
});
```

Running the tests is easy: 

1.  Compile your JS file &#8211; `build/rondavu_test_mode.js` in our case.
2.  Ensure jsdom is installed locally by running `util/install_jsdom.sh`.
3.  Run the tests: `node_modules/jasmine-node/bin/jasmine-node test/js --forceexit`

The `--forceexit` option cuts a few seconds of idling off the end of the tests. If you want the JUnit-compatible XML report, add `--junitreport --output build/js-test-results.xml`. (You will likely need to change the path of the output file to wherever your build system is expecting it to be.)

Finally, the process exit code will tell you if the tests passed or not, making it extremely easy to integrate into build systems. Here is our [ant][9] task:

``` xml
	<target name="js.test" description="builds a slightly modified version of our rondavu.js (skipping the init.js
        file and adding a 'module.exports=R;') and then runs all test/js/*_spec.js unit tests.">

        <exec executable="scripts/js_builder/build_js.js" dir="${basedir}" failonerror="true">
            <arg value="--test_mode"/>
            <arg value="--outfile"/>
            <arg value="build/rondavu_test_mode.js"/>
            <arg value="--verbose"/>
        </exec>

        <!-- some of jsdom's dependencies are environment-specific, so we'll install it here if it's not already present -->
        <chmod file="test/js/util/install_jsdom.sh" perm="ugo+rx"/>
        <exec executable="test/js/util/install_jsdom.sh" failonerror="true"/>

        <mkdir dir="${build.test.unit.output}"/>

        <exec executable="node_modules/jasmine-node/bin/jasmine-node" failonerror="true">
            <arg value="--forceexit"/>
            <arg value="test/js/"/>
            <arg value="--junitreport"/>
            <arg value="--output"/><arg value="${build.test.unit.output}/TEST-javascript-results.xml"/>
        </exec>
    </target>
```

And there you have it. Happy testing!

<hr style="margin: 30px 0;" />

<sup id="note-1">[1]</sup> It&#8217;s actually a bit more complex that that &#8211; we generate a separate file for each customer with their configuration and whatever features they use. </p> 
Also, we&#8217;ve recently switched from our custom js build script to [require.js][10] and [jam.js][11], but we&#8217;re still working out the final kinks. Expect a followup post once we&#8217;re fully confident with the new setup ;) </i>

<p class="meta"><small class="photocredit"><b>Photo Credits:</b> Header photo by <a href="http://www.flickr.com/photos/calliope/2243034754/">liz west</a>.</small></p>

 [2]: http://sociablelabs.com
 [3]: http://www.junit.org/
 [4]: https://www.atlassian.com/software/bamboo/overview
 [5]: http://nodejs.org/
 [6]: http://pivotal.github.com/jasmine/
 [7]: https://npmjs.org/package/jasmine-node
 [8]: https://npmjs.org/package/jsdom
 [9]: https://ant.apache.org/
 [10]: http://requirejs.org/
 [11]: http://jamjs.org/
