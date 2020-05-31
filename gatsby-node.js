const path = require(`path`)
const lodash = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  const bloglistTemplate = path.resolve(`./src/templates/index.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
        tags: allMarkdownRemark {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  // index
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 10,
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
    component: bloglistTemplate,
  })

  // detail
  posts.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        tags: post.node.frontmatter.tags ? post.node.frontmatter.tags : ["_____"],
      },
    })

    return null
  })

  // tags
  const tags = result.data.tags.group
  tags.forEach(tag => {
    paginate({
      items: Array(tag.totalCount), // 中でtotalCountとしてlengthを使っている（itemsの中身は何でも良い）
      createPage,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) =>
        `/tags/${lodash.kebabCase(tag.tag)}` +
        (pageNumber === 0 ? "/" : "/page"),
      component: tagTemplate,
      context: {
        tag: tag.tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
