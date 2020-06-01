import React from "react"
import { graphql } from "gatsby"

import Article from "../components/article"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Share from "../components/share"
import Tags from "../components/tags"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { slug } = pageContext
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  const relatedPosts = data.relatedPosts.edges.filter(
    _post => _post.node.id !== post.id
  )

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header
          style={{
            marginBottom: rhythm(1),
          }}
        >
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.date}
          </p>
          <h1>{post.frontmatter.title}</h1>
          <Tags tags={post.frontmatter.tags} />
        </header>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>

      <div style={{
        padding: `1em`,
        border: `1px solid lightgray`,
        marginBottom: `1em`
      }}>
        <h3>関連する記事</h3>
        {relatedPosts.map(({ node }) => {
          return <Article node={node} title={node.frontmatter.title} />
        })}
      </div>

      <Share postPath={slug} postNode={post} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String]!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD HH:mm")
        description
        tags
      }
      id
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: $tags } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD HH:mm")
            description
            tags
          }
          id
        }
      }
    }
  }
`
