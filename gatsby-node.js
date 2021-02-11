const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const indexPage = path.resolve('./src/pages/index.js')
    const blogPage = path.resolve('./src/pages/blog.js')

    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                authorId
              }
            }
          }
        `
      )
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      const { authorId } = result.data.site.siteMetadata;

      createPage({
        path: '/',
        component: indexPage,
        context: {
          authorId
        }
      })
      createPage({
        path: '/blog',
        component: blogPage,
        context: {
          authorId
        }
      })
    })

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
