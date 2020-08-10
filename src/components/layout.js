import React from "react"
import { Link, useStaticQuery, graphql, withPrefix } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"
import Bio from "../components/bio"
import { rhythm } from "../utils/typography"
import "./layout.css"
import AdSense from 'react-adsense'

const Layout = ({ title, children, description }) => {
  const data = useStaticQuery(graphql`
    query {
      tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  const headerBackgroundColor = "radial-gradient(#2257a1, #1d4b8c)"
  const headerTextColor = "white"

  let header = (
    <h1
      style={{
        color: `${headerTextColor}`,
        padding: `0.7em 0.3em`,
        margin: 0,
        textShadow: `0 0 5px black`,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
          textDecorationLine: `none`,
        }}
        to={`/`}
      >
        {title}
      </Link>
      <br />
      <span style={{ fontSize: `0.3em` }}>{description}</span>
    </h1>
  )

  return (
    <div>
      <header
        className="title-header"
        style={{
          backgroundImage: `url(${withPrefix("/images/header.jpg")})`,
          position: `relative`,
          textAlign: `center`,
          boxShadow: `0 0 5px gray`,
          backgroundSize: `cover`,
          backgroundPosition: `center`,
        }}
      >
        {header}
      </header>
      <div
        style={{
          margin: `0 auto`,
          padding: `${rhythm(1.5)} 2%`,
          backgroundColor: `white`,
          maxWidth: `75em`,
        }}
      >
        <AdSense.Google
          client='ca-pub-3277188906130312'
          slot='3844360834'
          responsive='true'
        />
        <main>{children}</main>
        <AdSense.Google
          client='ca-pub-3277188906130312'
          slot='7520167372'
          responsive='true'
        />
      </div>
      <div
        style={{
          padding: `${rhythm(1.5)} 5%`,
          background: `${headerBackgroundColor}`,
          color: `${headerTextColor}`,
          boxShadow: `0 0 5px gray`,
        }}
      >
        <Bio />
        <hr style={{ marginTop: `1em` }} />
        <div>
          <ul style={{ display: `flex`, flexWrap: `wrap` }}>
            {data.tags.group.map(tag => (
              <li style={{ margin: `0 1em` }} key={tag.tag}>
                <Link
                  to={`/tags/${kebabCase(tag.tag)}/`}
                  style={{
                    textDecoration: `none`,
                  }}
                >
                  <FontAwesomeIcon icon={faTag} /> {tag.tag} [{tag.totalCount}]
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer
        style={{
          marginTop: `1em`,
          marginBottom: `1em`,
          textAlign: `center`,
          fontSize: `0.8em`,
        }}
      >
        © {new Date().getFullYear()}, Built with&nbsp;
        <a href="https://www.gatsbyjs.org" target={`_blank`}>
          Gatsby
        </a>
        , Please report a issue to&nbsp;
        <a href="https://github.com/Naba0123/nabalog.git" target={`_blank`}>
          nabalog.git
        </a>
      </footer>
    </div>
  )
}

export default Layout
