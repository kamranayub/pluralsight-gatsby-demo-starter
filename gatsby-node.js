const Promise = require('bluebird')
const path = require('path')
const config = require('./gatsby-config')

/**
 * Override core pages created by Gatsby from /pages directory
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

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
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

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
