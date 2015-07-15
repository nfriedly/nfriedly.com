var fs = require('fs');

var body = fs.readFileSync('./src/documents/portfolio.html.eco').toString().split('<hr>')[1];

var sections = body
                .replace(/<!--.*-->/g, '')
                .replace('<div class="clear"></div>', '')
                .replace(/[\r\n\t]+/g,'')
                .replace(/ {2,}/g, ' ')
                .split(/<h2[^>]*>/);

function trim(str) {
    return str && str.trim && str.trim();
}

var notEmpty = trim;

function extractData(section) {
    var results = {};
	var parts = section.split('</h2>');
	var linkMatch = parts[0].match(/href="([^"]*)"/);
	results.link = linkMatch && linkMatch[1];
	results.title = results.link ? parts[0].match(/>(.*)<\/a>/)[1] : parts[0];
	var mainImageMatch = parts[1].match(/<a [^>]*href="\/img\/portfolio\/[^"]+"[^>]*><img[^>]+><\/a>/);
	if (mainImageMatch) {
	    parts[1] = parts[1].replace(mainImageMatch[0], '');
	    var bigPicMatch = mainImageMatch[0].match(/href="(\/img\/portfolio\/[^"]+)"/);
	    if (bigPicMatch) {
	        results.picture = bigPicMatch[1];
	    }
	    var thumbMatch = mainImageMatch[0].match(/src="(\/img\/portfolio\/thumbs\/[^"]+)"/);
	    if (thumbMatch) {
	        results.thumbnail = thumbMatch[1];
	    }
	}
	results.paragraphs = parts[1].replace('<p>', '').split(/<p>|<\/p>/).filter(notEmpty).map(trim);
	results.tags = results.paragraphs.pop().replace(/^Technologies: |Technology: /, '').split(', ');
	results.filename = getFileName(results);
	return results;
}

function markdownify(article) {
    var lines = ['---'];
    //lines.push('filename: ' + article.filename;
    lines.push('title: ' + article.title);
    article.link && lines.push('link: ' + article.link);
    article.picture && lines.push('picture: ' + article.picture);
    article.thumbnail && lines.push('thumbnail: ' + article.thumbnail);
    if (article.tags) {
        lines.push('tags:')
        lines = lines.concat(article.tags.map(function(tag) { return ' - ' + tag; }));
    }
    lines.push('write: false');
    lines.push('---', '');
    return lines.concat(article.paragraphs).join('\n')
}

var S = require('string');
var util = require('util');
var index = 0;
function getFileName(article) {
    index = index + 10;
    var id = S(index).padLeft(4, '0');
    var titlePart = article.title.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim().replace(/ +/g, '-');
    var filename = util.format('./src/documents/portfolio/%s-%s.html.md', id, titlePart);
    return filename;
}

var articles = sections.filter(notEmpty).map(extractData);

var fs = require('fs');


articles.forEach(function(article) {
    console.log('writing:\n', article.filename, '\n', markdownify(article), '\n\n\n');
    fs.writeFileSync(article.filename, markdownify(article));
});

