import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import Hero from "../Hero"

const HeroBlog = () => {
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

console.log({ heroBlog}, 'xxyy')
  return heroBlog && <Hero heroBlog={heroBlog} />
}

export default HeroBlog
