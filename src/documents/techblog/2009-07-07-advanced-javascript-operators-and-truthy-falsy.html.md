---
title: 'Advanced Javascript: Logical Operators and truthy / falsy'
author: nFriedly

url: /techblog/2009/07/advanced-javascript-operators-and-truthy-falsy/
urls:
    - /2009/07/advanced-javascript-operators-and-truthy-falsy/
categories:
  - Web Development
tags:
  - javascript
  - optimization
featured: true
---
[<img class="alignleft" title="speed machine" src="http://farm1.static.flickr.com/104/308974073_9057064747_m.jpg" alt="" width="240" height="160" />][1] Nearly every website on the internet uses javascript in some form or fashion. Yet very few people, even those who write it and teach it, have a clear understanding of how javascript works!

Logical Operators are a core part of the language. We&#8217;re going to look at what logical operators are, what &#8220;truthy&#8221; and &#8220;falsy&#8221; mean, and **how to use this to write cleaner, faster and more optimized javascript**.

<!--more-->

## Javascript Logical Operators

In traditional programming, operators such as `&&` and `|| ` returned a boolean value (`true` or `false`). This is not the case in javascript. Here it returns the actual `object`, not a `true` / `false`.  To really explain this, I first have to explain what is truthy and what is falsy.

### Truthy or Falsy

When javascript is expecting a `boolean` and it&#8217;s given something else, it decides whether the something else is &#8220;truthy&#8221; or &#8220;falsy&#8221;.

An empty string (`''`), the number `0`, `null`, `NaN`, a boolean `false`, and `undefined` variables are all &#8220;falsy&#8221;. Everything else is &#8220;truthy&#8221;.

``` js
var emptyString = ""; // falsy

var nonEmptyString = "this is text"; // truthy

var numberZero = 0; // falsy

var numberOne = 1; // truthy

var emptyArray = []; // truthy, BUT []==false is true. More below.

var emptyObject = {}; // truthy

// NaN is a special javascript object for "Not a Number".
var notANumber = 5 / "tree"; // falsy

function exampleFunction(){
	alert("Test");
}

// examleFunction is truthy
// BUT exampleFunction() is falsy because it has no return (undefined)
```

Gotchas to watch out for: the strings `"0"` and `"false"` are both considered truthy.  You can convert a string to a number with the `parseInt()` and `parseFloat()` functions, or by just multiplying it by `1`.

``` js
var test = "0"; // this is a string, not a number

var a = (test == false); // a is false, meaning that test is truthy

var b = (test * 1 == false); // b is true, meaning that `test * 1` is falsy

```

`Array`s are particularly weird. If you just test it for truthyness, an empty array is truthy. HOWEVER, if you compare an empty array to a boolean, it becomes falsy:

``` js
if ( [] == false ) {
	// this code runs
}

if ( [] ) {
	// this code also runs
}

if ([] == true) {
	// this code doesn't run
}

if ( ![] ) {
	// this code also doesn't run
}

```
(This is because when you do a comparison, it's elements are turned to `String`s and joined. Since it's empty, it becomes `""` which is then falsy. Yea, [it's weird](https://www.destroyallsoftware.com/talks/wat).)

If you write any PHP, then there's an additional gotcha to watch out for: while javascript evaluates empty arrays as true, PHP evaluates them as false.

PHP also evaluates &#8220;0&#8243; as falsy. (However the string &#8220;false&#8221; is evaluated as truthy by both PHP and javascript.)

``` php
<?php

$emptyArray = array(); // falsy in PHP

$stringZero = "0"; // falsy in PHP

?>
```

### How Logical Operators Work

#### Logical OR, `||`

The logical OR operator, `||`,  is very simple after you understand what it is doing. If the first object is truthy, that gets returned. Otherwise, the second object gets returned.

``` js
var a = ("test one" || "test two"); // a is "test one"

var b = ("test one" || ""); // b is "test one"

var c = (0 || "test two"); // c is "Test two"

var d = (0 || false); // d is false

```

Where would you ever use this? The OR operator allows you to easily specify default variables in a function.

``` js
function sayHi(name){
	name = name || "Dave";
	alert("Hi " + name);
}

sayHi("Nathan"); // alerts "Hi Nathan";

sayHi(); // alerts "Hi Dave", name is set to null when the function is started

```

#### Logical AND, `&&`

The logical AND operator, `&&`,  works similarly.  If the first object is falsy, it returns that object. If it is truthy, it returns the second object.

``` js
var a = ("test one" && "test two"); // a is "test two"

var b = ("test one" && ""); // b is ""

var c = (0 && "test two") // c is 0

```

The logical AND allows you to make one variable dependent on another.

``` js
var checkbox = document.getElementById("agreeToTerms");

var name = checkbox.checked && prompt("What is your name");

// name is either their name, or false if they haven't checked the AgreeToTerms checkbox
```

#### Logical NOT, `!`

Unlike `&&` and `||`, the `!` operator DOES turn the value it receives into a boolean. If it receives a truthy value, it returns `false`, and if it receives a falsy value, it returns `true`.

``` js
var a = (!"test one" || "test two"); // a is "test two"
// ("test one" gets converted to false and skipped)

var b = (!"test one" && "test two"); // b is false
// ("test one" gets converted to false and returned)

var c = (!0 || !"test two"); // c is true
// (0 gets converted to true and returned)

```

Another useful way to use the `!` operator is to use two of them &#8211; this way you always get a `true` or a `false` no matter what was given to it.

``` js
var a = (!!"test"); // a is true
//  "test" is converted to false, then that is converted to true

var b = (!!""); // b is false
// "" is converted to true, and then that true is converted to false

var c = (!!variableThatDoesntExist); // c is false even though you're checking an undefined variable.
```

## [Javascript Optimization][4]

Need any help [optimizing the Javascript and AJAX on your website][5]? Get in touch with your friendly neighborhood [javascript expert][4] for ideas on how to optimize your site and a free quote.

 [1]: http://www.flickr.com/photos/fleur-design/308974073/
 [3]: http://www.nicollet.net/2009/06/the-truth-of-javascript/
 [4]: http://nfriedly.com/portfolio
 [5]: http://nfriedly.com/portfolio#javascript
