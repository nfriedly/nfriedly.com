var fs = require('fs');

var body = fs.readFileSync('./index.html').toString().split('<hr>')[1];

var sections = body.replace(/[\r\n\t]+/g,'').replace(/ {2,}/g, ' ').split('<h2>');

var data = sections.map(function(section) {
	var parts = section.split('</h2>');
	var linkMatch = parts[0].match(/href="([^"]*)"/);
	var link = linkMatch && linkMatch[1]
	var title = link ? parts[0].match(/>(.*)<\/a>/)[1] : parts[0]
	return {
		link: link,
		title: title
	}
});

console.log(data);

