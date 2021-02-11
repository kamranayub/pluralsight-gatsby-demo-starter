const Promise = require('bluebird')
const path = require('path')
const config = require('./gatsby-config')

/**
 * Override core pages created by Gatsby from /pages directory
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path === '/' || page.path === '/blog/') {
    const oldPage = { ...page }

    page.context.authorId = config.siteMetadata.authorId

    deletePage(oldPage)
    createPage(page)
  }
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
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
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
