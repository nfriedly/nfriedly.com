$(function() {
	var eml = 'nathan' + '@' + 'nfriedly.com';
	$('#email').attr('href', 'mailto:' + eml);
	$('#email-text').text(eml);
});