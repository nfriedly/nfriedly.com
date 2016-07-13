
$(document).ready(function() {

	var render = _.template('<a href="<%= link %>" title="<%= caption.text %>" target="_blank"><img src="<%= images.low_resolution.url %>" class="img-thumbnail" alt="instagram"></a>'); 
	
	// returns the chosen picture (instagram object)
	function renderWithFirst(pics, tag) {
		var pic = _.find(pics, function(pic) {
			return _.contains(pic.tags, tag);
		});
		// if we don't have a picture matching the request, then just use the first one
		if (!pic) {
			pic = pics.shift();
		}
		var i = $('<img/>');
		i.on('load', function() {
			$('div.' + tag).html(render(pic));
		});
		i.attr('src', pic.images.low_resolution.url);
		
		return pic;
	}

	function handleInstagrams(response) {
		if(response && response.meta.code == 200) {
			var pic = renderWithFirst(response.data, 'nathanothniel');
			var remainders = _.without(response.data, pic);
			renderWithFirst(remainders, 'maizygram');
		}
	}
	
	var callbackFnName = 'handleInstagrams';
	window[callbackFnName] = handleInstagrams;
	var instagramApiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=246834140.473ac98.90ed8c32f46b4c84a18d3d9a4e32b261&callback=' + callbackFnName;
	
	$.getScript(instagramApiUrl);
	
	/*
	$(window).resize(function() {
		$('#headerHeight').text($('header').height());
		$('#pageWidth').text($(window).width());
	}).resize();
	*/
	
});
