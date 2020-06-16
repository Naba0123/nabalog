import React from "react"
import { Link } from "gatsby"
import Tags from "../components/tags"
import { rhythm, scale } from "../utils/typography"

import "./article.css"

const Article = ({ node, title, disableBody }) => {
  let body = ""
  if (disableBody !== true) {
    body = (
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: node.excerpt,
          }}
        />
      </section>
    )
  }

  return (
    <article key={node.fields.slug}>
      <header>
        <p className={`date`} style={{ margin: 0, ...scale(-1 / 5) }}>
          {node.frontmatter.date}
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
      {body}
    </article>
  )
}

export default Article
