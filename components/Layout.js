import React from "react";
import Head from 'next/head';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <link rel="canonical" href="https://www.nfriedly.com/"/>
          <link
              href="//fonts.googleapis.com/css?family=Raleway:400,400italic,700"
              rel="stylesheet"
          />
          <link
              href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet"
          />
          <link
              href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
              rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/styles/styles.css"/>
          <link
              rel="openid2.provider"
              href="https://openid.stackexchange.com/openid/provider"
          />
          <link
              rel="openid2.local_id"
              href="https://openid.stackexchange.com/user/4dbfb008-6890-4127-8778-d8bcd0031195"
          />
        </Head>

        <div className="over-footer">
          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#nav-menu"
                  aria-expanded="false"
                  aria-controls="navbar"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="/">
                  Nathan Friedly
                </a>
              </div>
              <div id="nav-menu" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="active">
                    <a href="/">
                      <i className="fa fa-home" /> Home
                    </a>
                  </li>
                  <li>
                    <a href="/about/">
                      <i className="fa fa-android" /> About
                    </a>
                  </li>
                  <li>
                    <a href="/portfolio/">
                      <i className="fa fa-laptop" /> Portfolio
                    </a>
                  </li>
                  <li>
                    <a href="/techblog/">
                      <i className="fa fa-terminal" /> Tech blog
                    </a>
                  </li>
                </ul>
                {}
              </div>
            </div>
          </nav>
          <header
            className="jumbotron"
            style={{
              backgroundImage: "url(/static/img/grapes-up.jpg)"
            }}
          >
            <div className="container">
              <h1>
                <a href="/"> Nathan Friedly</a>
              </h1>
              <h2>
                <span className="sub-heading-with-links ">
                  <a href="/about">Husband</a> // <a href="/about">Minister</a>{" "}
                  // <a href="/portfolio">JavaScript Ninjaneer</a>
                </span>
              </h2>
            </div>
          </header>
          <main>{this.props.children}</main>
        </div>{" "}
        {}
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-5 contact">
                <h3 id="contact">Contact Nathan</h3>
                <ul>
                  <li>
                    <a className="email" title="email">
                      <span className="fa-stack">
                        <i className="fa fa-square-o fa-stack-2x" />
                        <i className="fa fa-envelope fa-stack-1x" />
                      </span>
                      <span className="email-text">
                        nathan @ (this website)
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://github.com/nfriedly"
                      title="GitHub"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-github fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="http://stackoverflow.com/users/933879/nathan-friedly"
                      title="Stack Overflow"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-stack-overflow fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://www.linkedin.com/in/nathanfriedly"
                      title="LinkedIn"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-linkedin fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://www.facebook.com/nfriedly"
                      title="Facebook"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-facebook fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://twitter.com/nfriedly"
                      title="Twitter"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-twitter fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://www.last.fm/user/nfriedly"
                      title="Last.fm"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-google-plus fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="http://steamcommunity.com/id/nfriedly"
                      title="Steam"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-steam fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://news.ycombinator.com/user?id=nfriedly"
                      title="Hacker News"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-yc fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://www.goodreads.com/user/show/63990321-nathan-friedly"
                      title="Goodreads"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-book fa-stack-1x" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="fa-stack"
                      href="https://angel.co/nathan-friedly"
                      title="AngelList"
                    >
                      <i className="fa fa-square-o fa-stack-2x" />
                      <i className="fa fa-angellist fa-stack-1x" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 sitemap">
                <h3>Site Map</h3>
                <ul className="fa-ul">
                  <li>
                    <a href="/">
                      <i className="fa-li fa fa-home" /> Home
                    </a>
                  </li>
                  <li>
                    <a href="/about/">
                      <i className="fa-li fa fa-android" />
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/portfolio/">
                      <i className="fa-li fa fa-laptop" />
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a href="/techblog/">
                      <i className="fa-li fa fa-terminal" />
                      Tech blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 info">
                <p>
                  <a
                    href="http://www.nfriedly.com"
                    title="Nathan Friedly: JavaScript & Node.js Expert"
                  >
                    Website by Nathan Friedly
                  </a>
                </p>
                {}
                <p>
                  <a
                    rel="license"
                    href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
                  >
                    <img
                      alt="Creative Commons License"
                      style={{
                        borderWidth: 0
                      }}
                      src="https://licensebuttons.net/l/by/3.0/88x31.png"
                      className="pull-left"
                    />
                  </a>{" "}
                  Content licensed under{" "}
                  <a
                    rel="license"
                    href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
                  >
                    Creative Commons Attribution
                  </a>
                  .
                </p>
                <p>
                  <a href="https://github.com/nfriedly/nfriedly.com">
                    <i className="fa fa-github" /> Source code available on
                    Github
                  </a>{" "}
                  under a{" "}
                  <a href="http://opensource.org/licenses/MIT">MIT License</a>
                </p>
                <p>
                  Built with <a href="http://docpad.org">DocPad</a>,
                  <a href="http://getbootstrap.com/">Bootstrap</a>, and{" "}
                  <a href="http://www.nodejs.org/">Node.js</a>.
                </p>
              </div>
            </div>
          </div>
        </footer>
        <div className="chromefix" />
      </div>
    );
  }
}

export default Layout;
