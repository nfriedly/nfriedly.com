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

const eventTemplates = {
    PushEvent: ({ icon, events, repo_url }) => <span><i className={"fa " + icon }></i>{' '}<a href={ repo_url + "/commits?author=nfriedly"}>{ events.length } code push{ events.length == 1 ? "" : "es"}</a></span>,
    CreateEvent: ({ icon, url, payload }) => <span><i className={"fa " + icon }></i>{' '}<a href={ url }>{ payload.ref_type || "repo" } created</a></span>,
    IssueCommentEvent: ({ icon, event, events }) => <span><i className={"fa " + icon }></i>{' '}<a href={ event.payload.issue.html_url }>{ events.length } issue comment{ events.length == 1 ? "" : "s"}</a></span>,
    IssuesEvent: ({ icon, event, events }) => <span><i className={"fa " + icon }></i>{' '}<a href={ event.payload.issue.html_url }>{ events.length } issue{ events.length == 1 ? "" : "s"} created</a></span>,
    MemberEvent: ({ icon, events, repo_url }) => <span><i className={"fa " + icon }></i>{' '}<a href={ repo_url }>{ events.length } contributor{ events.length == 1 ? "" : "s"} added</a></span>,
    PullRequestEvent: ({ icon, event, events }) => <span><i className={"fa " + icon }></i>{' '}<a href={ event.payload.pull_request.html_url }>{ events.length } pull request{ events.length == 1 ? "" : "s"}</a></span>,
    WatchEvent: ({ icon }) => <span><i className={"fa " + icon }></i>{' '}<a href={ repo.html_url }>Starred</a></span>,
    ForkEvent: ({ icon, event }) => <span><i className={"fa " + icon }></i>{' '}<a href={ event.payload.forkee.html_url }>forked repo</a></span>,
    DeleteEvent: ({ icon }) => <span><i className={"fa " + icon }></i>{' '}{ payload.ref_type || "repo" } deleted</span>,
    'default':  ({ icon,  events, repo_url }) => <span><i className={"fa " + icon }></i>{' '}<a href={ repo_url }>{ events.length } { events[0].type.replace(/([A-Z])/g, " $1").toLowerCase() }{ events.length == 1 ? "" : "s"}</a></span>
};


function eventType(event) {
    return event.type;
}
function renderSumary(repo_url, events, type) {
    const et = eventTemplates,
        payload = events[0].payload || {},
        data = {
            repo_url,
            events,
            event: events[0],
            icon: eventIcons[type] || eventIcons['default'],
            payload: payload,
            url: repo_url + (payload.ref_type === 'branch' || payload.ref_type === 'tag' ? '/tree/' + payload.ref : '' )
        };
    const Template = et[type] ? et[type] : et['default'];
    return <Template {...data} key={repo_url + ':' + type}/>
}

const RepoActivity = ({icon, html_url, name, description, homepage, events }) => (
    <li>
        <h3><i className={"fa fa-li " + icon }></i> <a href={ html_url }>{ name }</a></h3>
        <p>{ description }</p>
        { homepage }
        <p className="muted">{ _.chain(events).map(renderSumary.bind(null, html_url)).toArray().value().reverse() }</p>
    </li>
);

const RepoStar = ({ description, html_url, name }) => (
    <li>
        <h3 title={ description }><i className="fa fa-li fa-star"></i> Starred <a href={ html_url }>{ name }</a></h3>
    </li>);

class Github extends React.Component {
    async getGithubActivityFeed() {
        const res = await fetch('https://api.github.com/users/nfriedly/events');
        const json = await res.json();
        
        const eventsByRepo = _.chain(json).filter(function(event){
            // filter out events that aren't attached to a repo
            return event.repo;
        }).filter(function(event) {
            // remove greenkeeper stuff
            return !(event.payload && event.payload.ref && event.payload.ref.substr(0,11) === 'greenkeeper');
        }).groupBy(function(event) {
            // group the events by repo name
            return event.repo.name;
        }).value();

        const repos = {};

        const repoRequests = _.map(eventsByRepo, async function(events, name) {
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
            const repoName = _.values(repoEvents)[0][0].repo.name;
            const repo = repos[repoName];
            repo.starredOnly = (_.keys(repoEvents).length === 1 && repoEvents.WatchEvent);
            repo.events = repoEvents;
            const eventType = _.keys(repoEvents)[0];
            repo.icon = repoIcons[repo.name] || eventIcons[eventType] || eventIcons['default'];
            return repo;
        }).value();
        return feed;
    }
    async componentDidMount() {
        const feed = await this.getGithubActivityFeed();
        console.log( {self: this, feed})
        this.setState({feed});
    }
    render() {
        return (
            <div className={this.props.className + " github"}>
                <h2>
                    <a href="https://github.com/nfriedly">
                        <i className="fa fa-github" /> GitHub Activity
                    </a>
                </h2>
                <ul className="fa-ul">
                    {(this.state && this.state.feed.map(repo =>
                        repo.starredOnly ? <RepoStar {...repo} key={'star:' + repo.html_url}/> : <RepoActivity {...repo} key={repo.html_url}/>
                    )) || <li className="muted"><i className="fa-li fa fa-spinner fa-spin"></i> Loading latest GitHub feed...</li>}
                </ul>
            </div>
        );
    }
}


export default Github;
