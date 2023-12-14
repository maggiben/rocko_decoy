import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import Hero from '../../Hero'

function HeroBlogFaq() {
  const query = graphql`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: {
          frontmatter: {
            featured: { eq: true }
            coverUrl: {}
            author: {}
            tags: { in: "Rocko How-tos" }
          }
        }
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
              author
              authorImg
              authorByline
              authorTwitter
              coverUrl
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
  const heroBlog = data.allMarkdownRemark?.edges[0]?.node

  return heroBlog && <Hero heroBlog={heroBlog} />
}

export default HeroBlogFaq
