import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import Article from "../components/article"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

const TagPage = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO title="TOP" />
      <h1>
      <FontAwesomeIcon icon={faTag} /> {pageContext.tag} [{data.allMarkdownRemark.totalCount}]
      </h1>
      {posts.map((edge, index) => {
        const node = edge.node
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={index}>
            <Article node={node} title={title} />
            <hr />
          </div>
        )
      })}
      <Pagination context={pageContext} />
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
