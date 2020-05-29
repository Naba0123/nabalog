import React from "react"
import { Link } from "gatsby"

import Bio from "../components/bio"
import { rhythm } from "../utils/typography"
import "./layout.css"

const Layout = ({ title, children, description }) => {
  const headerBackgroundColor = "radial-gradient(#2257a1, #1d4b8c)"
  const headerTextColor = "white"

  let header = (
    <h1
      style={{
        color: `${headerTextColor}`,
        background: `${headerBackgroundColor}`,
        padding: `0.7em  5%`,
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
      <br />
      <span style={{ fontSize: `0.3em` }}>{description}</span>
    </h1>
  )

  return (
    <div>
      <header style={{ textAlign: `center` }}>{header}</header>
      <div
        style={{
          padding: `${rhythm(1.5)} 5%`,
          backgroundColor: `white`,
          boxShadow: `0 1px 5px black`,
        }}
      >
        <main>{children}</main>
      </div>
      <div
        style={{
          padding: `${rhythm(1.5)} 5%`,
          background: `${headerBackgroundColor}`,
          color: `${headerTextColor}`,
          boxShadow: `0 1px 5px black`,
        }}
      >
        <Bio />
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
