$(function() {
	var eml = 'nathan' + '@' + 'nfriedly.com';
	$('#email').text(eml).attr('href', 'mailto:' + eml);
});