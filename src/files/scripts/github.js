(function(exports, $) {
	"use strict";

	var renderRepoSummary = _.template('<li><h3><i class="icon-li <%= icon %>"></i> <a href="<%= url %>"><%= name %></a></h3><p><%= description %></p><%= homepage %><p class="muted"><%= events %></p></li>'); 
	var renderStar = _.template('<li><h3 title="<%= description %>"><i class="icon-li icon-star"></i> Starred <a href="<%= url %>"><%= name %></a></h3></li>');

	var icon = '<i class="<%= icon %>"></i> ';
	var eventTemplates = {
		PushEvent: _.template(icon + '<a href="<%= events[0].repository.url %>/commits?author=nfriedly"><%= events.length %> code pushe<%= events.length == 1 ? "" : "s"%></a>'),
		CreateEvent: _.template(icon + '<a href="<%= events[0].repository.url %>">repo created</a>'),
		IssueCommentEvent: _.template(icon + '<a href="<%= events[0].url %>"><%= events.length %> issue comment<%= events.length == 1 ? "" : "s"%></a>'),
		IssuesEvent: _.template(icon + '<a href="<%= events[0].url %>"><%= events.length %> issue<%= events.length == 1 ? "" : "s"%> created</a>'),
		MemberEvent: _.template(icon + '<a href="<%= events[0].url %>"><%= events.length %> contributor<%= events.length == 1 ? "" : "s"%> added</a>'),
		PullRequestEvent: _.template(icon + '<a href="<%= events[0].url %>"><%= events.length %> pull request<%= events.length == 1 ? "" : "s"%></a>'),
		WatchEvent: _.template(icon + '<a href="<%= events[0].url %>">Starred</a>'),
		'default':  _.template(icon + '<a href="<%= events[0].url %>"><%= events.length %> <%= events[0].type.replace(/([A-Z])/g, " $1").toLowerCase() %><%= events.length == 1 ? "" : "s"%></a>')
	};

	var eventIcons = {
		CreateEvent: 'icon-code-fork',
		PushEvent: 'icon-upload', // 'icon-circle-arrow-up',
		ForkEvent: 'icon-code-fork',
		//GistEvent: 'icon-file-alt',
		IssuesEvent: 'icon-bug',
		IssueCommentEvent: 'icon-comment-alt',
		PullRequestEvent: 'icon-wrench',
		PullRequestReviewCommentEvent: 'icon-comment',
		WatchEvent: 'icon-star',
		FollowEvent: 'icon-plane',
		MemberEvent: 'icon-user',
		'default':  'icon-gears'
	
		// todo: icon-check  for issue closed
	}
	
	var repoIcons = {
		'nfriedly.com': 'icon-home',
		'JS-Mini-Shell': 'icon-javascript',
		'facebook-js-sdk': 'icon-facebook',
		'node-unblocker': 'icon-globe',
		'spam-free-php-contact-form': 'icon-envelope-alt',
		'node-bang-suggest': 'icon-exclamation',
		'Javascript-Flash-Cookies': 'icon-food',
		'node-pagerank': 'icon-signal',
		'pagerank.nfriedly.com': 'icon-signal',
		'node-whats-my-ip': 'icon-desktop',
		'air-force-game': 'icon-fighter-jet',
		'Twitter-Mention-Monitor': 'icon-twitter',
		'Coin-Allocator': 'icon-bitcoin',
		'node-gatling': 'icon-asterisk',
		'picsync-android-client': 'icon-android',
		'picsync-server': 'icon-iphone',
		'nathananderin.com': 'icon-heart'
	}

	function handleGH(response) {
		var $list = $('div.github ul');
		$list.empty();
	
		function eventType(event) { 
			return event.type;
		}
		function renderSumary(events, type) {
			var et = eventTemplates,
				data = {
					events: events,
					icon: eventIcons[type] || eventIcons['default']
				};
			return et[type] ? et[type](data) : et['default'](data);
		}
	
		_.chain(response)
			.filter(function(event ){
				// filter out events that aren't attached to a repo
				return event.repository;
			}).groupBy(function(event) {
				// group the events by repo name
				return event.repository.name;
			}).map(function(repoEvents) {
				// sub-group the events by eventType
				return _(repoEvents).groupBy(eventType)
			})
			.map(function(repoEvents, name) {
				// extract the repo data and render a summary of the events 
				var repo = _(repoEvents).toArray()[0][0].repository;
				repo.starredOnly = (_.keys(repoEvents).length == 1 && repoEvents['WatchEvent']);
				repo.events = _.chain(repoEvents).map(renderSumary).toArray().value().reverse().join(', ');
				var eventType = _(repoEvents).keys()[0];
				repo.icon = repoIcons[repo.name] || eventIcons[eventType] || eventIcons['default'];
				repo.homepage = repo.homepage ? '<p class="home"><a href="' + repo.homepage + '">' + repo.homepage + '</a></p>' : '';
				return repo;
			})
			.each(function(repo) {
				// render a <li> for each repo that includes the summary from the previous step
				var html = repo.starredOnly ? renderStar(repo) : renderRepoSummary(repo);
				$(html).appendTo($list);
			});
	}

	$(document).ready(function() {
		$.getScript('https://github.com/nfriedly.json?callback=handleGH');
	});

	exports.handleGH = handleGH;
})(window, jQuery);