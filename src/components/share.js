import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share"
import urljoin from "url-join"
import { useStaticQuery, graphql } from "gatsby"

const Share = ({ postNode, postPath, mobile }) => {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const post = postNode.frontmatter
  const url = urljoin(site.siteMetadata.siteUrl, postPath)
  const iconSize = mobile ? 36 : 48

  return (
    <div className="social-links">
      <TwitterShareButton url={url} title={post.title}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={postNode.excerpt}>
        <FacebookIcon round size={iconSize} />
      </FacebookShareButton>
      <LineShareButton url={url} quote={postNode.excerpt}>
        <LineIcon round size={iconSize} />
      </LineShareButton>
    </div>
  )
}

export default Share
