<?php 

$cur = "about";

include 'includes/header.php'; ?>

	<div id="about">
		<h3 class="browse">Browse</h3>
		<p id="balls">
			<a href="#"><img src="img/ball-green.png" alt="" /></a>
			<a href="#"><img src="img/ball-red.png" alt="" /></a>
			<a href="#"><img src="img/ball-red.png" alt="" /></a>
		</p>
		
		<h3>About me</h3>
		<p>I'm Christopher Skillicorn, both a freelance website designer and enthusiastic entrepreneur. Currently I'm living near Oslo in Norway, but of British origin. I've always had a predilection for creating things and bringing them to life. </p>
		<h3>Customer Quote</h3>
		
		<blockquote>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>

			<cite>- Bill Gates, founder of Microsoft</cite>
		</blockquote>
		
		<h3>Stalk Me</h3>
		<ul id="sites">
			<li>LinkedIn</li>
			<li>Twitter</li>
			<li>deviantArt</li>
			<li>Behance</li>
		</ul>
	</div>
	
	<div class="rcol">
	
<?php include 'includes/gallery.php'; ?>

	</div>
	
<?php include 'includes/footer.php'; ?>
