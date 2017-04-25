$(document).ready(function() {

  // instagram occasionally kills access tokens for no good reason
  // this is to recover from that
  var fallback = [{
    tags: ['nathanothniel'],
    link: 'https://www.instagram.com/p/BNJ6ngeBEt_/',
    caption: {text: '"Young Turkey"'},
    images: {low_resolution: {url: '/img/young_turkey.jpg'}}
  }, {
    tags: ['maizygram'],
    link: 'https://www.instagram.com/p/URVtJtwLfp/',
    caption: {text: 'On the internet, no one knows your a dog :)'},
    images: {low_resolution: {url: '/img/maizygram.jpg'}}
  }];

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
    var data;
    if (response && response.meta.code == 200) {
      data = response.data;
    } else {
      data = fallback;
    }

    var pic = renderWithFirst(data, 'nathanothniel');
    var remainders = _.without(data, pic);
    renderWithFirst(remainders, 'maizygram');
  }

  var callbackFnName = 'handleInstagrams';
  window[callbackFnName] = handleInstagrams;

// erin's access token (because she has more and better pictures)
  var accessToken = '5308686.539b3c7.9d35c8cc943d41b89ae35647fd59932b';
  var instagramApiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken + '&callback=' + callbackFnName;

  $.getScript(instagramApiUrl);

  /*
   $(window).resize(function() {
   $('#headerHeight').text($('header').height());
   $('#pageWidth').text($(window).width());
   }).resize();
   */

});
