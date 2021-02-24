const gatsbyFeedNodeApi = require('gatsby-plugin-feed/gatsby-node')

exports.onPreInit = function () {
  console.log("initialized globomantics-feed-plugin");
}

exports.onPostBuild = function (nodeApiHelpers, pluginOptions) {
  const { authorId } = pluginOptions;
  const feedOptions = {
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
              url: site.siteMetadata.siteUrl + "/blog/" + edge.node.slug,
              guid: edge.node.contentful_id,
              author: edge.node.author.name,
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
                  author {
                    name
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

  gatsbyFeedNodeApi.onPostBuild(nodeApiHelpers, feedOptions)
}