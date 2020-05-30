import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import Article from "../components/article"

const TagPage = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO title="TOP" />
      <h1>
        {pageContext.tag} ({data.allMarkdownRemark.totalCount}件)
      </h1>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Article node={node} title={title} />
        )
      })}
      <Pagination context = {pageContext} />
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $tag: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: {tags: {in:[$tag]}}}
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD HH:mm")
            title
            description
            tags
          }
        }
      }
    }
  }
`
