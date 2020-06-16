module.exports = {
  siteMetadata: {
    title: `なばろぐ`,
    author: {
      name: `ナーバ`,
      name_en: `Naba`,
      summary: `バックエンドエンジニア / ピアノ作曲・演奏 / StaffPad / DTM / ドライブ<br>PHP(Laravel) / JavaScript(React/Gatsby) / C++`,
    },
    description: `プログラミング、ピアノ作曲・演奏、雑記など`,
    siteUrl: `https://nabalog.net/`,
    social: {
      twitter: `Naba0123`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: 'Naba0123',
              includeDefaultCss: true
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 300,
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-images-zoom`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-65425577-4`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `なばろぐ`,
        short_name: `なばろぐ`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/naba.jpg`,
        lang: `ja`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
