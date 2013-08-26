---
title: How to make Apache Ant tasks run in a default directory
author: nFriedly
layout: post
permalink: /2012/02/how-to-make-ant-tasks-run-in-a-default-directory/
categories:
  - Programming
tags:
  - ant
  - apache
  - bash
  - howto
  - productivity
  - shell
featured: true
---
[<img src="http://farm8.staticflickr.com/7020/6668518895_0700a12958_m.jpg" width="240" height="160" alt="Apache takeoff" class="right" />][1]I often open a new tab in my Terminal to run an [Ant][2] task, and often as not I forget to `cd` into the correct directory first and so I am greeted with this error:

`Nathan-Mac:~ nathan$ ant database.start<br />
Buildfile: build.xml does not exist!<br />
Build failed`

On my system, there&#8217;s only one main project that uses ant, so I almost always intend for ant tasks to be run against that project&#8217;s build.xml. So, I created a function that makes ant tasks &#8220;just work&#8221; no matter what directory I am in.

<!--more-->

### The code

First you&#8217;ll need to edit your `.profile` file. To do so, run the following command:

`nano ~/.profile`

Then copy-paste in this code, changing the `DEFAULT_ANT_DIR` to the path to your project (whatever folder has the build.xml file in it):

    # make ant commands run in the default directory if

    # there is no build.xml in the current directory

    

    export DEFAULT_ANT_DIR = /path/to/your/projects/folder/

    

    function magic-ant() {

      if [ -e ./build.xml ]

        then

          ant $@                                                                    

        else

          pushd DEFAULT_ANT_DIR

          ant $@

          popd

      fi

    }

    

    # reset ant to avoid loops if you ever run `source ~/.profile` again

    alias ant=`which ant`

    

    alias ant="magic-ant"

Press `[Control]-O` then `[Enter]` to save and `[Control]-X` to exit nano.

Lastly, run this command to import your changes (or just close and reopen your terminal):

`source ~/.profile`

### How it works

First, we define the path in a shell variable with the path to the default ant project. This isn&#8217;t absolutely required, but it keeps things tidy and simple.

[<img src="http://farm1.staticflickr.com/95/235488979_24ead7f4dc_m.jpg" width="240" height="159" alt="Ant" class="left" />][3]Next, we create the `magic-ant` function which checks if there is a build.xml file in the current directory. If so, it uses that one, otherwise it calls `pushd` to temporarily change directories to our default one, runs the ant command, and then calls `popd` to get back to whatever directory you started in. `$@` is an automatic variable that includes whatever parameters this function was called with.

After that we use alias to reset the ant command in order to avoid endless loops where our magic-ant function calls itself instead of the real ant if you source. The command `which` returns the path to the program with the given name. Putting it in backticks (\`) makes bash execute the command and return the result.

Finally we alias `ant` to point to our new `magic-ant` function when run from the command line.

The only downside is that I haven&#8217;t yet figured out how to make [Ant task tab completion][4] work with this when you&#8217;re not in the project directory.

 [1]: http://www.flickr.com/photos/soldiersmediacenter/6668518895/ "The other Apache, image courtesy of The U.S. Army"
 [2]: http://ant.apache.org/
 [3]: http://www.flickr.com/photos/dasqfamily/235488979/ "Ant by Qfamily, on Flickr"
 [4]: http://matthew.mceachen.us/blog/ant-bash-completion-on-mac-os-x-43.html