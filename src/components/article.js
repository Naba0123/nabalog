import React from "react"
import { Link } from "gatsby"
import Tags from "../components/tags"
import { rhythm } from "../utils/typography"

const Article = ({ node, title }) => (
  <article key={node.fields.slug}>
    <header>
      <p style={{ margin: 0 }}>
        <small>{node.frontmatter.date}</small>
      </p>
      <h3
        style={{
          marginBottom: rhythm(1 / 2),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
          {title}
        </Link>
      </h3>
      <Tags tags={node.frontmatter.tags} />
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </section>
    <hr />
  </article>
)

export default Article
