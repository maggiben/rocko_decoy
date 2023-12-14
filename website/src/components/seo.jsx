/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

function Seo({ description, title, children, authorTwitter = '', image = '' }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          copyright
          social {
            twitter
          }
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title
    ? `${title} | ${site.siteMetadata?.title}`
    : site.siteMetadata?.title

  return (
    <>
      <title>{metaTitle}</title>
      {/* <!-- For Google --> */}
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content="crypto loans, crypto loan, bitcoin loan, bitcoin loans, crypto backed loans"
      />
      <meta name="image" content={image} />
      <meta name="author" content={authorTwitter || site.siteMetadata?.title} />
      <meta name="copyright" content={site.siteMetadata.copyright} />
      <meta name="application-name" content={site.siteMetadata?.title} />

      {/* <!-- For Facebook --> */}
      <meta property="og:title" content={metaTitle} />
      <meta
        property="og:type"
        content={authorTwitter ? 'article' : 'website'}
      />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={metaDescription} />

      {/* <!-- For Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.siteMetadata?.social?.twitter} />
      {authorTwitter ? (
        <meta name="twitter:creator" content={authorTwitter} />
      ) : null}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {children}
    </>
  )
}

export default Seo
