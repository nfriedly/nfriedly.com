	<div id="footer">
	
		<p id="contact">
			I’m currently available for freelance<br />
			<a href="http://www.linkedin.com/pub/christopher-skillicorn/13/1b3/b1">LinkedIn</a>
			  ·  <a href="http://twitter.com/ctrlclick/">Twitter</a>
			  ·  <a href="http://ctrl-click.deviantart.com">deviantART</a>
		</p>
		
		<p>
			&copy; <?php echo date("Y"); ?> Christopher Skillicorn<br />
			<a href="http://nfriedly.com/webdev">AJAX Development by nFriedly</a>
		</p>
		
	</div>
	

<script type="text/javascript" src="http://www.google.com/jsapi?key=ABQIAAAAWMsuqAAoJe0vLYg5hsR_RhSOpBqeijn_PFXyh9G70yoMxuLEGxQp76oyfuI3ixXHxHGC_R4Z3BMQ3w"></script>
<script type="text/javascript">
google.load("jquery", "1");
google.setOnLoadCallback(function(){
	var images = $("#gallery img");
	images.each(function(){
		var zoom = this.src;
		var parts = zoom.split("-");
		parts.pop(); // get rid of the last -whatever
		var full = parts.join("-") + ".png";
		$('<img src="'+full+'" >');
		$(this).data("zoom",zoom).data("full",full);
	});
	images.hover(
      function () {
        this.src = $(this).data("full");		
      }, 
      function () {
        this.src = $(this).data("zoom");		
      }
    );
});
</script>
	
	
</body>
</html>