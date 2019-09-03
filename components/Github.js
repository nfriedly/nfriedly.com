import React from "react";
import fetch from "isomorphic-unfetch";
import _ from "lodash";

const eventIcons = {
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
    DeleteEvent: 'fa-trash',
    'default':  'fa-gears'

    // todo: fa-check  for issue closed
};

const repoIcons = {
    'inclinesystems.github.io': 'fa-incline',
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
    'GarageRemote': 'fa-car',
    'node-tts-player': 'fa-volume-up',
    'rpi-time-weather-demo': 'fa-bolt',
    'arduino-pi-badge-demo': 'fa-pie-chart',
    'running-average': 'fa-line-chart',
    'express-rate-limit': 'fa-hand-stop-o',
    'node-sdk': 'fa-rocket',
    'speech-to-text-nodejs': 'fa-microphone',
    'speech-javascript-sdk': 'fa-microphone',
    'set-cookie-parser': 'fa-cutlery'
};

function eventType(event) {
    return event.type;
}
function renderSumary(events, type) {
    var et = eventTemplates,
        repo = repos[events[0].repo.name],
        payload = events[0].payload || {},
        data = {
            repo: repo,
            events: events,
            event: events[0],
            icon: eventIcons[type] || eventIcons['default'],
            payload: payload,
            url: repo.html_url + (payload.ref_type === 'branch' || payload.ref_type === 'tag' ? '/tree/' + payload.ref : '' )
        };
    return et[type] ? et[type](data) : et['default'](data);
}


var renderRepoSummary = '<li><h3><i class={"fa fa-li " + icon }></i> <a href={ html_url }>{ name }</a></h3><p>{ description }</p>{ homepage }<p class="muted">{ events }</p></li>';
var renderStar = '<li><h3 title={ description }><i class="fa fa-li fa-star"></i> Starred <a href={ html_url }>{ name }</a></h3></li>';

var icon = icon => <i class={"fa " + icon }></i>;
var eventTemplates = {
    PushEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ repo.html_url + "/commits?author=nfriedly"}>{ events.length } code push{ events.length == 1 ? "" : "es"}</a></span>,
    CreateEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ url }>{ payload.ref_type || "repo" } created</a></span>,
    IssueCommentEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ event.payload.issue.html_url }>{ events.length } issue comment{ events.length == 1 ? "" : "s"}</a></span>,
    IssuesEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ event.payload.issue.html_url }>{ events.length } issue{ events.length == 1 ? "" : "s"} created</a></span>,
    MemberEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ repo.html_url }>{ events.length } contributor{ events.length == 1 ? "" : "s"} added</a></span>,
    PullRequestEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ event.payload.pull_request.html_url }>{ events.length } pull request{ events.length == 1 ? "" : "s"}</a></span>,
    WatchEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ repo.html_url }>Starred</a></span>,
    ForkEvent: ({ icon, event, events, repo, url }) => <span>{icon} <a href={ event.payload.forkee.html_url }>forked repo</a></span>,
    DeleteEvent: ({ icon, event, events, repo, url }) => <span>{icon} { payload.ref_type || "repo" } deleted</span>,
    'default':  ({ icon, event, events, repo, url }) => <span>{icon} <a href={ repo.html_url }>{ events.length } { events[0].type.replace(/([A-Z])/g, " $1").toLowerCase() }{ events.length == 1 ? "" : "s"}</a></span>
};


class GithubRepo extends React.Component {
    async getGithubActivityFeed() {
        const res = await fetch('https://api.github.com/users/nfriedly/events');
        const json = await res.json();
        
        var eventsByRepo = _.chain(json).filter(function(event){
            // filter out events that aren't attached to a repo
            return event.repo;
        }).filter(function(event) {
            // remove greenkeeper stuff
            return !(event.payload && event.payload.ref && event.payload.ref.substr(0,11) === 'greenkeeper');
        }).groupBy(function(event) {
            // group the events by repo name
            return event.repo.name;
        }).value();

        var repos = {};

        var repoRequests = _.map(eventsByRepo, async function(events, name) {
            try {
                const res = await fetch(events[0].repo.url);
                const data = await res.json();
                repos[name] = data;
            } catch (e) {
                console.log('failure retrieving details for '+ name +' :'+ e.status +' '+ e.statusText +'\n'+ e.responseText);
                delete eventsByRepo[name];
            }
        });

        await Promise.all(repoRequests);

        const feed = _(eventsByRepo).chain().map(function(repoEvents) {
            // sub-group the events by eventType
            return _.groupBy(repoEvents, eventType);
        }).map(function(repoEvents, name) {
            // extract the repo data and render a summary of the events
            var repoName = _.values(repoEvents)[0][0].repo.name;
            var repo = repos[repoName];
            repo.starredOnly = (_.keys(repoEvents).length == 1 && repoEvents.WatchEvent);
            repo.events = _.chain(repoEvents).map(renderSumary).toArray().value().reverse().join(', ');
            var eventType = _.keys(repoEvents)[0];
            repo.icon = repoIcons[repo.name] || eventIcons[eventType] || eventIcons['default'];
            repo.homepage = repo.homepage ? '<p class="home"><a href="' + repo.homepage + '">' + repo.homepage + '</a></p>' : '';
            return repo;
        }).value();
        return feed;
    }
    async componentDidMount() {
        const feed = await this.getGithubActivityFeed();
        this.setState({feed});
    }
    render() {
        return (
            <div className={props.className + " github"}>
                <h2>
                    <a href="https://github.com/nfriedly">
                        <i className="fa fa-github" /> GitHub Activity
                    </a>
                </h2>
                <ul className="fa-ul">
                    {this.state.feed.map(repo =>
                        repo.starredOnly ? renderStar(repo) : renderRepoSummary(repo)
                    )}
                </ul>
            </div>
        );
    }
}

class Github extends React.Component {
    render() {
        return (
            <li>
                <a href="/techblog/2015/07/build-a-diy-esp8266ex-esp-01-dev-test-programming-board/">
                    <div className="clip">
                        <img
                            src="/static/img/blog/esp-mb/zoom.jpg"
                            style={{
                                maxWidth: "300px"
                            }}
                            alt="ESP-01"
                        />
                    </div>
                    <h3>DIY ESP8266 ESP-01 Programing / Test board</h3>
                    <p>
                        NodeMCU and other ESP8266 modules are starting to become very
                        popular because they offer an embedded development platform with a
                        CPU+RAM+Storage+WiFi all in one for (considerably) less than the
                        price of an Arduino. There are a number of breadboard-friendly
                        modules with all pins exposed (and more coming soon.)
                    </p>
                    <p>
                        However, this post is about the breadboard-unfriendly ESP-01 module.
                        It only has two GPIO pins (four if you include the TX & RX pins),
                        but it's smaller and most importantly, cheaper.{" "}
                    </p>
                </a>
            </li>
        );
    }
}

export default Github;
