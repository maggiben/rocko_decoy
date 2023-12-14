import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import Hero from '../Hero'

function HeroBlog() {
  const query = graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { featured: { eq: true } } }
        sort: { frontmatter: { date: DESC } }
        limit: 1
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              featured
              tags
              coverUrl
              description
              author
              authorImg
              authorByline
              authorTwitter
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `

  const data = useStaticQuery(query)

  const heroBlog = data?.allMarkdownRemark?.edges?.[0]?.node

  return heroBlog && <Hero heroBlog={heroBlog} />
}

export default HeroBlog
