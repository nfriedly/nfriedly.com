(function(exports, $) {
	"use strict";

	var renderRepoSummary = _.template('<li><h3><i class="fa fa-li <%= icon %>"></i> <a href="<%= html_url %>"><%- name %></a></h3><p><%- description %></p><%= homepage %><p class="muted"><%= events %></p></li>');
	var renderStar = _.template('<li><h3 title="<%- description %>"><i class="fa fa-li fa-star"></i> Starred <a href="<%= html_url %>"><%- name %></a></h3></li>');

	var icon = '<i class="fa <%= icon %>"></i> ';
	var eventTemplates = {
		PushEvent: _.template(icon + '<a href="<%= repo.html_url %>/commits?author=nfriedly"><%= events.length %> code push<%= events.length == 1 ? "" : "es"%></a>'),
		CreateEvent: _.template(icon + '<a href="<%= repo.html_url %>">repo created</a>'),
		IssueCommentEvent: _.template(icon + '<a href="<%= event.payload.issue.html_url %>"><%= events.length %> issue comment<%= events.length == 1 ? "" : "s"%></a>'),
		IssuesEvent: _.template(icon + '<a href="<%= event.payload.issue.html_url %>"><%= events.length %> issue<%= events.length == 1 ? "" : "s"%> created</a>'),
		MemberEvent: _.template(icon + '<a href="<%= repo.html_url %>"><%= events.length %> contributor<%= events.length == 1 ? "" : "s"%> added</a>'),
		PullRequestEvent: _.template(icon + '<a href="<%= event.payload.pull_request.html_url %>"><%= events.length %> pull request<%= events.length == 1 ? "" : "s"%></a>'),
		WatchEvent: _.template(icon + '<a href="<%= repo.html_url %>">Starred</a>'),
		ForkEvent: _.template(icon + '<a href="<%= event.payload.forkee.html_url %>">forked repo</a>'),
        'default':  _.template(icon + '<a href="<%= repo.html_url %>"><%= events.length %> <%= events[0].type.replace(/([A-Z])/g, " $1").toLowerCase() %><%= events.length == 1 ? "" : "s"%></a>')
	};

	var eventIcons = {
		CreateEvent: 'fa-code-fork',
		PushEvent: 'fa-upload', // 'fa-circle-arrow-up',
		ForkEvent: 'fa-code-fork',
		//GistEvent: 'fa-file-o',
		IssuesEvent: 'fa-bug',
		IssueCommentEvent: 'fa-comment-o',
		PullRequestEvent: 'fa-wrench',
		PullRequestReviewCommentEvent: 'fa-comment',
		WatchEvent: 'fa-star',
		FollowEvent: 'fa-plane',
		MemberEvent: 'fa-user',
		'default':  'fa-gears'
	
		// todo: fa-check  for issue closed
	};
	
	var repoIcons = {
		'nfriedly.com': 'fa-home',
		'JS-Mini-Shell': 'fa-javascript',
		'facebook-js-sdk': 'fa-facebook',
		'node-unblocker': 'fa-globe',
		'spam-free-php-contact-form': 'fa-envelope-o',
		'node-bang-suggest': 'fa-exclamation',
		'Javascript-Flash-Cookies': 'fa-food',
		'node-pagerank': 'fa-signal',
		'pagerank.nfriedly.com': 'fa-signal',
		'node-whats-my-ip': 'fa-desktop',
		'air-force-game': 'fa-fighter-jet',
		'Twitter-Mention-Monitor': 'fa-twitter',
		'Coin-Allocator': 'fa-bitcoin',
		'node-gatling': 'fa-asterisk',
		'picsync-android-client': 'fa-android',
		'picsync-server': 'fa-iphone',
		'nathananderin.com': 'fa-heart',
		'Meteor-ODB-II': 'fa-dashboard',
		'ypool-xpm-miner-watcher': 'fa-gears',
		'posture-reminder': 'fa-male',
		'facebook-event-updater': 'fa-facebook-square',
		'whatsmyua.com-v1': 'fa-desktop',
		'whatsmyua.com': 'fa-desktop',
		'elance-withdrawal': 'fa-dollar',
		'True-Tile-Site': 'fa-th',
		'Arduino-Fan-Controler': 'fa-asterisk fa-spin', // :D
		'space-jump': 'fa-rocket',
		'GarageRemote': 'fa-car'
	};

	function handleGH(response) {
		var $list = $('div.github ul');
		$list.empty();
	
		function eventType(event) { 
			return event.type;
		}
		function renderSumary(events, type) {
			var et = eventTemplates,
				data = {
                    repo: repos[events[0].repo.name],
					events: events,
                    event: events[0],
					icon: eventIcons[type] || eventIcons['default']
				};
			return et[type] ? et[type](data) : et['default'](data);
		}
	
		 var eventsByRepo = _.chain(response.data).filter(function(event ){
			// filter out events that aren't attached to a repo
			return event.repo;
		 }).filter(function(event) {
			 // this one got moved and the original URL now 404s, breaking the rest of my script.
			 return event.repo.name != 'nfriedly/arduino-pi-badge-demo';
		 }).groupBy(function(event) {
			 // group the events by repo name
			 return event.repo.name;
		 });

		var repos = {};

		var repoRequests = eventsByRepo.map(function(events, name){
			var promise =  $.getJSON(events[0].repo.url);
			promise.then(function(data) {
				repos[name] = data;
			});
			return promise;
		}).values().value();

		$.when.apply($, repoRequests).then(function() {

			eventsByRepo.map(function(repoEvents) {
				// sub-group the events by eventType
				return _.groupBy(repoEvents, eventType);
			}).map(function(repoEvents, name) {
				// extract the repo data and render a summary of the events
				var repoName = _.values(repoEvents)[0][0].repo.name;
				var repo = repos[repoName];
				repo.starredOnly = (_.keys(repoEvents).length == 1 && repoEvents.WatchEvent);
				repo.events = _.chain(repoEvents).map(renderSumary).toArray().value().reverse().join(', ');
				var eventType = _(repoEvents).keys()[0];
				repo.icon = repoIcons[repo.name] || eventIcons[eventType] || eventIcons['default'];
				repo.homepage = repo.homepage ? '<p class="home"><a href="' + repo.homepage + '">' + repo.homepage + '</a></p>' : '';
				return repo;
			}).each(function(repo) {
				// render a <li> for each repo that includes the summary from the previous step
				// now we have to request repo.url to get name & description...
				var html = repo.starredOnly ? renderStar(repo) : renderRepoSummary(repo);
				$(html).appendTo($list);
			});
		});

	}

	$(document).ready(function() {
		$.getScript('https://api.github.com/users/nfriedly/events?callback=handleGH');
	});

	exports.handleGH = handleGH;
})(window, jQuery);
