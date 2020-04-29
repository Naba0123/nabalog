import React from "react"
import { Link } from "gatsby"

import Bio from "../components/bio"
import { rhythm } from "../utils/typography"
import "./layout.css"

const Layout = ({ location, title, children, description }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const headerBackgroundColor = 'radial-gradient(#2b80d5, #1d558d)';
  const headerTextColor = 'white';

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          color: `${headerTextColor}`,
          background: `${headerBackgroundColor}`,
          padding: `0.7em`,
          margin: 0,
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
        <br/>
        <span style={{fontSize: `0.3em`}}>{description}</span>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          color: `${headerTextColor}`,
          background: `${headerBackgroundColor}`,
          padding: `0.7em`,
          margin: 0,
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
        <br/>
        <span style={{fontSize: `0.3em`}}>{description}</span>
      </h3>
    )
  }
  return (
    <div>
      <header style={{textAlign: `center`}}>{header}</header>
      <div
        style={{
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          backgroundColor: `white`,
          boxShadow: `0 1px 5px black`,
        }}
      >
        <main>{children}</main>
      </div>
      <div style={{
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        background: `${headerBackgroundColor}`,
        color: `${headerTextColor}`,
        boxShadow: `0 1px 5px black`,
      }}>
        <Bio />
      </div>
      <footer
      style={{
        marginTop: `1em`,
        marginBottom: `1em`,
        textAlign: `center`,
        fontSize: `0.8em`,
      }}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org" target={`_blank`}>
          Gatsby
        </a>
        , Hosted on{" "}
        <a
          href="https://help.github.com/ja/github/working-with-github-pages/about-github-pages"
          target={`_blank`}
        >
          GitHub Pages
        </a>
      </footer>
    </div>
  )
}

export default Layout
