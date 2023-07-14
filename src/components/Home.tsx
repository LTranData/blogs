import React from "react";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import Link from "@docusaurus/Link";

interface HomeProps {
  readonly recentPosts: readonly { readonly content: Content }[];
}

function Home({ recentPosts }: HomeProps): JSX.Element {
  return (
    <Layout>
      <div className="hero hero--dark hero--home shadow--lw">
        <div className="container">
          <div className="row">
            <div className="col col--9 col--offset-1">
              <h1 className="hero__title">👋 I'm Lam, a data engineer.</h1>
              <p className="hero__subtitle">
                I write about data engineering, web development, and other
                technology stuff...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container margin-top--xl">
        <div className="row">
          <div className="col col--9 col--offset-1">
            {recentPosts.map(({ content: BlogPostContent }) => (
              <BlogPostItem
                key={BlogPostContent.metadata.permalink}
                frontMatter={BlogPostContent.frontMatter}
                assets={BlogPostContent.assets}
                metadata={BlogPostContent.metadata}
                truncated={BlogPostContent.metadata.truncated}
              >
                <BlogPostContent />
              </BlogPostItem>
            ))}
          </div>
        </div>
        <div className="button-container margin-bottom--lg">
          <Link to={"/blog"} aria-label="Read more about blogs">
            <button className="read-more-button">Read More</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
