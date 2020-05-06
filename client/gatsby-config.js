const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
const siteTitle = "Employment Department PUC POC";
const siteDescription =
  "A proof of concept site for Employment Department";
const siteAuthor = "Brian McBride";
const siteUrl = "https://oregon-pua-poc.web.app/";
const siteImage = `${siteUrl}/icons/icon_512x512.png`;
const siteKeywords = ["gatsby", "typescript", "starter", "javascript", "react"]

require('dotenv').config({
  path: `.env.${activeEnv}`
})

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    author: siteAuthor,
    url: siteUrl,
    siteUrl: siteUrl,
    keywords: siteKeywords,
    image: siteImage,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    // {
    //   resolve: "gatsby-plugin-react-axe",
    //   options: {
    //     showInProduction: false,
    //     // Options to pass to axe-core.
    //     // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
    //     axeOptions: {
    //       // Your axe-core options.
    //     },
    //   },
    // },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle,
        description: siteDescription,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "src/images/icon.png",
        icons: [
          {
            src: "icons/icon_512x512.png",
            sizes: "512x512",
            types: "image/png",
          },
          {
            src: "icons/icon_192x192.png",
            sizes: "192x192",
            types: "image/png",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: '/' }]
      }
    }
  ],
};
