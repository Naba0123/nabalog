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
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/naba.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 100) {
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
        }}
        imgStyle={{
          marginBottom: 0,
          width: `auto`,
          height: `auto`,
          borderRadius: `50%`,
        }}
      />
      <div>
        <p
          style={{
            marginBottom: 0,
          }}
        >
          <strong>
            <FontAwesomeIcon icon={faUser} /> Author&nbsp;&nbsp;{author.name}
          </strong>
          <br />
          <a
            href={`https://naba0123.net/`}
            style={{
              textDecorationLine: `none`,
              color: `white`,
              backgroundColor: `#333`,
              padding: `0.3em`,
              borderRadius: `0.2em`,
              textDecoration: `none`,
            }}
          >
            <FontAwesomeIcon icon={faHome} style={{ marginRight: `0.3em` }} />
            About me
          </a>
          <a
            href={`https://twitter.com/${social.twitter}`}
            style={{
              margin: `0.5em`,
              textDecorationLine: `none`,
              color: `white`,
              backgroundColor: `#1DA1F2`,
              padding: `0.3em`,
              borderRadius: `0.2em`,
              textDecoration: `none`,
            }}
          >
            <FontAwesomeIcon icon={faTwitter} /> @{social.twitter}
          </a>
        </p>
        <p
          style={{
            fontSize: `0.8em`,
            marginTop: `0.8em`,
          }}
          dangerouslySetInnerHTML={{ __html: author.summary }}
        />
      </div>
    </div>
  )
}

export default Bio
