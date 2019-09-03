import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import BlogPreview from "../components/BlogPreview";
import Github from "../components/Github";
import Layout from "../components/Layout";

// todo: convert a tags to links - <Link href='https://github.com/zeit/next.js#setup'>

class Home extends React.Component {

    render() {
        return (
            <Layout>
            <div className="container homepage">
                <Head>
                    <title>
                        Nathan Friedly - Husband // Minister // Javascript Ninjaneer
                    </title>
                </Head>

            <section className="intro row">
                    <div className="col-md-4">
                        <h3>Hi, I'm Nathan, nice to meet you!</h3>
                        <p>
                            <a href="http://nathananderin.com/">
                                I'm happily married to my best friend
                            </a>
                            ; we have an amazing little boy, a wonderful baby girl, and the
                            cutest dog in the world. We live near a{" "}
                            <a href="https://www.miamicountyparks.com/park/hobart">
                                beautiful nature preserve
                            </a>
                            in Troy, Ohio.
                        </p>
                        <p>
                            I'm a Christian and a minister for the Lord Jesus Christ. If you
                            ever need anything, I'd be more than happy to provide prayer and
                            support.
                        </p>
                        <p>
                            I currently run{" "}
                            <a href="https://www.inclind.digital/">◢ Incline</a>, a small
                            digital agency that I founded a number of years ago. Prior to that
                            I worked at IBM Watson, Tanium, and several other places.
                        </p>
                        <p>
                            See my <a href="/about/">about page</a> for a little more on my
                            personal life, or take a look at my{" "}
                            <a href="/portfolio/">portfolio</a>,
                            <a href="/techblog/">Tech Blog</a> for more work/computer-y stuff.
                        </p>
                    </div>
                    <div className="col-md-8 pics">
                        <img
                            src="/static/img/home-thumbs/nathan-nathan-christmass-tree.jpg"
                            alt="Picture of Erin, Maizy, and Nathan in the Tipp City park"
                            className="img-thumbnail"
                        />
                        <div className="instagram nathanothniel">
                            <a
                                href="https://www.instagram.com/p/BNJ6ngeBEt_/"
                                target="_blank"
                            >
                                <img
                                    src="/static/img/young_turkey.jpg"
                                    className="img-thumbnail"
                                    alt="young turkey"
                                />
                            </a>
                        </div>
                        <img
                            src="/static/img/home-thumbs/maizy.jpg"
                            className="img-thumbnail portrait"
                            alt="Picture of Maizy, the cutest dog in the world"
                        />
                        <img
                            src="/static/img/home-thumbs/family-smiles.jpg"
                            className="img-thumbnail portrait"
                            alt="Picture of Nathan leaning against a tree"
                        />
                        <img
                            src="/static/img/home-thumbs/temp-o-matic.jpg"
                            className="img-thumbnail"
                            alt="Picture of the Temp-O-Matic digital thermitor that Nathan Built"
                        />
                        <div className="instagram maizygram">
                            <a
                                href="https://www.instagram.com/p/URVtJtwLfp/"
                                target="_blank"
                            >
                                <img
                                    src="/static/img/maizygram.jpg"
                                    className="img-thumbnail"
                                    alt="On the internet, no one knows your a dog :)"
                                />
                            </a>
                        </div>
                    </div>
                </section>
                <blockquote className="biblequote row">
                    <i className="fa fa-book fa fa-4x pull-left" />
                    <p>
                        And now, dear brothers and sisters, one final thing. Fix your
                        thoughts on what is true, and honorable, and right, and pure, and
                        lovely, and admirable. Think about things that are excellent and
                        worthy of praise.
                    </p>
                    <cite>Philippians 4:8, New Living Translation</cite>
                </blockquote>
                <section className="feeds row">
                    <div className="col-md-8 techblog">
                        <h2>
                            <a href="/techblog/">
                                <i className="fa fa-terminal" /> Latest on the Tech Blog
                            </a>
                        </h2>
                        <ul>
                            <BlogPreview></BlogPreview>
                            <li className="archives">
                                <strong>
                                    <a href="/techblog/">
                                        More Tech Blog articles{" "}
                                        <i className="fa fa-chevron-right" />
                                    </a>
                                </strong>
                            </li>
                        </ul>
                    </div>
                    <Github className="col-md-4"/>
                </section>
            </div>
            </Layout>
        );
    }
}

export default Home;