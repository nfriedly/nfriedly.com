---
title: 'Advanced Javascript: Objects, Arrays, and Array-Like objects'
author: nFriedly

url: /techblog/2009/06/advanced-javascript-objects-arrays-and-array-like-objects/
urls:
    - /2009/06/advanced-javascript-objects-arrays-and-array-like-objects/
tags:
  - javascript
featured: true
---
[<img class="alignleft" title="The other kind of array" src="http://farm4.static.flickr.com/3146/2492636763_788774987e_m.jpg" alt="" width="240" height="160" />][1]Javascript `objects` and `arrays` are both incredibly useful. They're also incredibly easy to confuse with each other. Mix in a few objects that look like arrays and you&#8217;ve got a recipe for confusion!

We're going to see what the differences between objects and arrays are, how to work with some of the common array-like objects, and how to get the most performance out of each.

<!--more-->

## What Objects Are

A javascript object is a basic data structure:

``` javascript
var basicObj = {}; // an empty object - {} is a shortcut for "new Object()"

basicObj.suprise= "cake!";

basicObj['suprise']; // returns "cake!"
```

Using `{}` instead of `new Object();` is know as &#8220;Object Literal&#8221; syntax.

``` javascript
var fancyObj = {
	favoriteFood: "pizza",
	add: function(a, b){
		return a + b;
	}
};

fancyObj.add(2,3); // returns 5

fancyObj['add'](2,3); // ditto.
```

As you can see, and probably already knew, properties can be accessed a couple of different ways. However, it&#8217;s an important point that we&#8217;ll come back to in a minute.

Everything in javascript is an `object`. Everything. `Arrays`, `functions`, even `numbers`! Because of this, you can do some really interesting things, such as modifying the `prototypes` of Objects, Arrays, etc.

``` javascript
// an example of something you probably shouldn't do. Ever. Seriously.
Number.prototype.addto = function(x){
	return this + x;
}

(8).addto(9); // returns 17

// other variations:

8.addto(9);  // gives a syntax error, because the dot is assumed to be a decimal point

8['addto'](9);  // works but is kind of ugly compared to the first method

var eight = 8;
eight.addto(9);  // works
```

## What Arrays Are

Javascript arrays are a type of `object` used for storing multiple values in a single variable. Each value gets numeric index and may be any data type.

``` javascript
var arr = [];  // this is a shortcut for new Array();
arr[0] = "cat";
arr[1] = "mouse";
```

See how that syntax is so similar to the syntax used for setting object properties? In fact, the only difference is that objects use a string while arrays use a number. This is why arrays get confused with objects so often.

### Length

Arrays have a `length` property that tells how many items are in the array and is automatically updated when you add or remove items to the array. 

``` javascript
var arr = [];
arr[0] = "cat"; // this adds to the array
arr[1] = "mouse"; // this adds to the array
arr.length; // returns 2

arr["favoriteFood"] = "pizza"; // this DOES NOT add to the array. Setting a string parameter adds to the underlying object
arr.length; // returns 2, not 3
```

The length property is only modified when you add an item to the array, not the underlying object.

**The `length` is always 1 higher than the highest index, even if there are actually fewer items in the array.**

``` javascript
var arr = [];
arr.length; // returns 0;

arr[100] = "this is the only item in the array";
arr.length; // returns 101, even though there is only 1 object in the array
```

This is somewhat counter-intuitive. PHP does more what you would expect:

``` php
<?php
arr = array();
arr[100] = "php behaves differently";
sizeof(arr); // returns 1 in PHP
?>

```

You can manually set the `length` also. Setting it to 0 is a simple way to empty an array.

In addition to this length property, arrays have lots of nifty built in functions such as `push()`, `pop()`, `sort()`, `slice()`, `splice()`, and more. This is what sets them apart from Array-Like Objects.

## Array-like Objects [<img class="alignright" title="It's like an array, but made out of Lego!" src="http://farm4.static.flickr.com/3175/2645497916_386b9b75b8_m.jpg" alt="" width="240" height="180" />][2]

Array-like objects look like arrays. They have various numbered elements and a length property. But that&#8217;s where the similarity stops. Array-like objects do not have any of Array&#8217;s functions, and for-in loops don&#8217;t even work!

You&#8217;ll come across these more often than you might expect. A common one is the `arguments` variable that is present inside of every js function. 

Also included in the category are the HTML node sets returned by `document.getElementsByTagName()`, `document.forms`, and basically every other DOM method and property that gives a list of items.

``` javascript
document.forms.length; // returns 1;
document.forms[0]; // returns a form element.
document.forms.join(", "); // throws a type error. this is not an array.
typeof document.forms; // returns "object"
```

Did you know you can send any number of arguments you want to a javascript function? They're all stored in an array-like object named `arguments`.

``` javascript
function takesTwoParams(a, b){
	// arguments is an array-like variable that is automatically created
	// arguments.length works great

	alert ("you gave me "+arguments.length+" arguments"); 

	for(i=0; i&lt; arguments.length; i++){
		alert("parameter " + i + " = " + arguments[i]); 
	}
}

takesTwoParams("one","two","three");
// alerts "you gave me 3 arguments",
// then "parameter 0 = one" 
// etc. 
```

<div class="alert alert-info">
**Tip:**
*Parameters* are the named variables in a function's signature: `a` and `b` in the previous example.<br />
*Arguments*, by contrast, are the expressions that are used when calling the function: `"one"`, `"two"`, and `"three"` in this case.
</div>

This works great. But that's about as far as you can go with array-like objects. The flowing example does not work:

``` javascript
function takesTwoParams(a, b){
	alert(" your parameters were " + arguments.join(", ")); 
	// throws a type error because arguments.join doesn't exist
}
```

### So what can you do? 

Well you could make your own `join()` function, but that adds a lot of unnecessary overhead to your code because it has to loop over everything. If only there were a quick way to get an array out of an array like object&#8230;

It turns out there is.

The array functions can be called on non-array objects as long as you know where to find the function (usually they&#8217;re attached to the array, but this isn&#8217;t an array remember <img src='http://nfriedly.com/techblog/wp-includes/images/smilies/icon_wink.gif' alt=';)' class='wp-smiley' /> 

`Prototype` to the win:

``` javascript
function takesTwoParams(a, b){
	var args = Array.prototype.slice.call(arguments);
	alert(" your parameters were " + args.join(", ")); 
	// yay, this works!
}
```

Let&#8217;s take a look at that a bit more in-depth:

`Array`: This object is the original array that all other arrays inherit their properties from.

`Array.prototype`:This gives us access to all the methods properties that each array inherits

`Array.prototype.slice`: The original slice method that is given to all arrays via the prototype chain. We can&#8217;t call it directly though, because when it runs internally, it looks at the `this` keyword, and calling it here would make `this` point to `Array`, not our `arguments` variable.

`Array.prototype.slice.call()`: `call()` and `apply()` are prototype methods of the `Function` object, meaning that they can be called on every function in javascript. These allow you to change what the `this` variable points to inside a given function.

And finally, you get a regular `array` back! This works because javascript returns a new object of type Array rather than whatever you gave it. This causes a lot of headaches for a [few][3] [people][4] who are trying to make subclasses of Array, but it&#8217;s very handy in our case!

## <a name="gotchas"></a>Gotchas

First, in Internet Explorer, DOM `NodeLists` are not considered to be javascript objects, so you cannot call `Array.prototype.slice` on them. If you want an array, you&#8217;ll have to loop through it the old fashioned way. Or use a hybrid function that tries it the fast way first, then the slow way if that doesn&#8217;t work. 

``` javascript
function hybridToArray(nodes){
	try{
		// works in every browser except IE
		var arr = Array.prototype.slice.call(nodes);
		return arr;
	} catch(err){
		// slower, but works in IE
		var arr = [],
		    length = nodes.length;
		for(var i=0; i &lt; length; i++){
			arr.push(nodes[i]);
		}
		return arr;
	}
}
```

See an example here: <http://nfriedly.com/demos/ie-nodelist-to-array>.

Second, arrays are objects, so you can do this, but it can get you some serious inconsistencies:

``` javascript
arr = [];
arr[0] = "first element"; // adds item to the array
arr.length; // returns 1

arr.two = "second element"; // adds an item to the underlying object that array is built on top of.
arr.length; // still returns 1 !

// BUT...
for(i in arr){
	// this will hit both 0 and "two"
}
```

### Another solution: wrap arrays in an object if you need both worlds

This is basically a less efficient method of the array subclassing links I mentioned above. While less efficient, it has the advantage of being simple and reliable.

That said, I wouldn&#8217;t recommend that you use this in most cases due to issues with speed and extra code requirements. It&#8217;s provided here as an example.

``` javascript
// an example of a wrapper for an array.
// not recommended for most situations.

var ArrayContainer = function(arr){
	this.arr = arr || [];
	this.length = this.arr.length;
};

ArrayContainer.prototype.add=  function(item){
	index = this.arr.length;
	this.arr[index] = item;
	this.length = this.arr.length;
	return index;
};

ArrayContainer.prototype.get=  function(index){
	return this.arr[index];
};

ArrayContainer.prototype.forEach=  function(fn){
	if (this.arr.forEach) this.arr.forEach(fn);// use native code if it's there
	else {
		for(i in this.arr){
			fn( i, this.arr[i], this.arr );
		}
	}
};

var mySuperDooperArray = new ArrayContainer();
```

Now that your array is (somewhat) protected on the inside, you can loop through it&#8217;s items with `forEach()` and know that they will match it&#8217;s length. You can also add arbitrary properties to `ArrayContainer` or `mySuperDooperArray` and they **won&#8217;t** get pulled into your `forEach()` loop.

This example could be extended to completely protect the array if the need arose. 

## An Even Better Solution: [Hire a javascript expert][5].

nFriedly Web Development is a top ranked [Javascript and AJAX ninja][6] with an extensive portfolio of proven results. I can bring your project to life and make it run faster than you ever imagined.  [Get in touch][7] with me or get a free [instant estimate][8] for new projects.

 [1]: http://www.flickr.com/photos/stawarz/2492636763/
 [2]: http://www.flickr.com/photos/repoort/2645497916/
 [3]: http://dean.edwards.name/weblog/2006/11/hooray/
 [4]: http://webreflection.blogspot.com/2008/03/sorry-dean-but-i-subclassed-array-again.html
 [5]: http://nfriedly.com/webdev
 [6]: http://nfriedly.com/webdev/javascript
 [7]: http://nfriedly.com/contact
 [8]: http://nfriedly.com/estimate
