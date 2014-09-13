
$(document).ready(function() {

	var render = _.template('<a href="<%= link %>" title="<%= caption.text %>" target="_blank"><img src="<%= images.low_resolution.url %>" class="img-thumbnail" alt="instagram"></a>'); 
	
	// returns the chosen picture (instagram object)
	function renderWithFirst(pics, tag) {
		var pic = _.find(pics, function(pic) {
			return _.contains(pic.tags, tag);
		});
		//console.log(pic);
		if (!pic) return null;
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
	var instagramApiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=5308686.473ac98.7c15354b874849a3951c79fbbb9c18b9&callback=' + callbackFnName;
	
	$.getScript(instagramApiUrl);
	
	/*
	$(window).resize(function() {
		$('#headerHeight').text($('header').height());
		$('#pageWidth').text($(window).width());
	}).resize();
	*/
	
});
