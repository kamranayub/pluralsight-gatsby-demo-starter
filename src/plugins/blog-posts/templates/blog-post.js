import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { GatsbyImage } from "gatsby-plugin-image";
import Head from "../../../components/head";
import Layout from "../../../components/layout";

import * as heroStyles from "../../../components/hero.module.css";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Head title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <GatsbyImage
              image={post.heroImage.gatsbyImageData}
              className={heroStyles.heroImage}
              alt={post.title}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block",
              }}
            >
              published {post.publishDate} by{" "}
              <strong>{post.author.name}</strong>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 1180
          backgroundColor: "rgb:000000"
        )
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      author {
        name
      }
    }
  }
`;
