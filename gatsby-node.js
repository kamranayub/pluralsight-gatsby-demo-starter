const Promise = require('bluebird')
const path = require('path')
const config = require('./gatsby-config')

exports.onPreInit = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onPreInit");
};

exports.onCreateWebpackConfig = () => {
  console.info("local-plugin lifecycle: onCreateWebpackConfig");
};

exports.onCreateBabelConfig = () => {
  console.info("local-plugin lifecycle: onCreateBabelConfig");
};

exports.onPreBootstrap = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onPreBootstrap");
};

exports.onPreExtractQueries = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onPreExtractQueries");
};

exports.onCreatePage = ({ reporter }) => {
  
};

exports.onCreateNode = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onCreateNode");
};

exports.onPostBootstrap = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onPostBootstrap");
};

exports.onPreBuild = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onPreBuild");
};

exports.onPostBuild = ({ reporter }) => {
  reporter.info("local-plugin lifecycle: onPostBuild");
};

exports.sourceNodes = () => {
  console.info('local-plugin lifecycle: sourceNodes')
}

/**
 * Override core pages created by Gatsby from /pages directory
 */
exports.onCreatePage = ({ page, reporter, actions }) => {
  const { createPage, deletePage } = actions

  reporter.info("local-plugin lifecycle: onCreatePage");

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,

      // authorId will now be passed as $authorId to GraphQL query arguments
      authorId: config.siteMetadata.authorId
    }
  })
}

/**
 * Dynamically create pages for blog posts
 */
exports.createPages = ({ graphql, reporter, actions }) => {
  const { createPage } = actions

  reporter.info('local-plugin lifecycle: createPages')

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          query AuthorPosts($authorId: String) {
            allContentfulBlogPost(filter: { author: { contentful_id: { eq: $authorId } } }) {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `,
        {
          authorId: config.siteMetadata.authorId
        }
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach(post => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
