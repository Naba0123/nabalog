import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"
import Pagination from "../components/pagination"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO title="TOP" />
      {posts.map((edge, index) => {
        const node = edge.node
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={index}>
            <Article node={node} title={title} />
            <hr/>
          </div>
        )
      })}
      <Pagination context = {pageContext} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD HH:mm")
            title
            tags
          }
        }
      }
    }
  }
`
