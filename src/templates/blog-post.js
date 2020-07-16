import React from "react"
import { graphql } from "gatsby"

import Article from "../components/article"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Share from "../components/share"
import Tags from "../components/tags"
import { rhythm, scale } from "../utils/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper } from "@fortawesome/free-solid-svg-icons"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { slug } = pageContext
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  const relatedPosts = data.relatedPosts.edges.filter(
    _post => _post.node.id !== post.id
  )

  let relatedPostCont = ""
  if (relatedPosts.length > 0) {
    relatedPostCont = (
      <div
        style={{
          padding: `1em`,
          border: `1px solid lightgray`,
          marginTop: `1em`,
        }}
      >
        <h3>
          <FontAwesomeIcon icon={faNewspaper} /> 関連する記事
        </h3>
        {relatedPosts.map((edge, index) => {
          const node = edge.node
          let article = (
            <Article
              key={node.id}
              node={node}
              title={node.frontmatter.title}
              disableBody={true}
            />
          )
          if (index + 1 < relatedPosts.length) {
            return (
              <div key={index}>
                {article}
                <hr
                  style={{
                    margin: `1.5em auto`,
                  }}
                />
              </div>
            )
          }
          return <div key={index}>{article}</div>
        })}
      </div>
    )
  }

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <article>
        <header
          style={{
            marginBottom: rhythm(1),
          }}
        >
          <p
            className={`date`}
            style={{
              ...scale(-1 / 5),
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.date}
          </p>
          <h1
            style={{
              marginBottom: `0.1em`,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <Tags tags={post.frontmatter.tags} />
        </header>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <div className="article-table-of-contents" dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
        <section id={`article-section`} dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(1),
          }}
        />
      </article>

      <Share postPath={slug} postNode={post}/>
      {relatedPostCont}

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
      tableOfContents(pathToSlugField: "fields.slug")
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD HH:mm")
        tags
      }
      id
      excerpt
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
            tags
          }
          id
        }
      }
    }
  }
`
