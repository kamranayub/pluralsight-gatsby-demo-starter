require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

const authorId = "15jwOBqpxqSAOy2eOO4S0m"; // YL4ATa1RwAn9uZqw29KU7

module.exports = {
  siteMetadata: {
    title: "Globomantics Engineering",
    description: "Blogs for Globomantics engineers",
    siteUrl: "https://engineering.globomantics.com",
    authorId
  },
  pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.edges.map(edge => {
                return {
                  title: edge.node.title,
                  description: edge.node.description.childMarkdownRemark.excerpt,
                  date: edge.node.publishDate,
                  url: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                  guid: edge.node.contentful_id,
                  custom_elements: [{ "content:encoded": edge.node.description.childMarkdownRemark.html }],
                }
              })
            },
            query: `
              {
                allContentfulBlogPost(
                  sort: {fields: [publishDate], order: DESC}, 
                  filter: {author: {contentful_id: {eq: "${authorId}"}}}
                ) {
                  edges {
                    node {
                      title
                      slug
                      publishDate
                      description {
                        childMarkdownRemark {
                          excerpt
                          html
                        }
                      }
                      contentful_id
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Globomantics Engineering RSS Feed"
          },
        ],
      }
    }
  ],
};
