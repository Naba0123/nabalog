/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/naba.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            name_en
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        margin: 0,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
          marginBottom: 0,
        }}
      />
      <p
        style={{
          marginBottom: 0,
        }}
      >
        <strong>
          <FontAwesomeIcon icon={faPen} /> Author
        </strong>
        <br />
        {author.name}
        &nbsp;
        <a
          href={`https://twitter.com/${social.twitter}`}
          target={`_blank`}
          style={{ margin: 5, textDecorationLine: `none`, color: `white` }}
        >
          <FontAwesomeIcon icon={faTwitter} /> @
          <span style={{ textDecorationLine: `underline` }}>
            {social.twitter}
          </span>
        </a>
        <br />
        <span
          style={{
            fontSize: `0.8em`,
          }}
        >
          {author.summary}
        </span>
      </p>
    </div>
  )
}

export default Bio
