import React from "react"
import {Helmet} from "react-helmet"

import {graphql, useStaticQuery} from "gatsby";

export default props => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          lang
          title
          siteUrl
          locale
          fbappid
        }
      }
    }
  `)

  const title = props.pageTitle
    ? `${props.pageTitle} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title
  const description = props.pageDescription || data.site.siteMetadata.description
  const url = props.pagePath
    ? `${data.site.siteMetadata.siteUrl}${props.pagePath}`
    : data.site.siteMetadata.siteUrl

  const imageUrl = props.pageImg
    ? `${data.site.siteMetadata.siteUrl}${props.pageImg}`
    : `${data.site.siteMetadata.siteUrl}/thumb.jpg`
  const imageW = props.pageImgW || 1280
  const imageH = props.pageImgH || 640

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />
      <meta property="fb:app_id" content={data.site.siteMetadata.fbappid} />

      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={imageW} />
      <meta property="og:image:height" content={imageH} />

    </Helmet>
  )
}