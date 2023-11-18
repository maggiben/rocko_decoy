import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import Hero from "../../Hero"

const HeroBlogBorrowing = () => {
  const query = graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            featured: { eq: true }
            coverUrl: {}
            author: {}
            tags: { in: "Borrowing" }
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
  const heroBlog = data?.allMarkdownRemark?.edges?.[0]?.node

  return heroBlog && <Hero heroBlog={heroBlog} />
}

export default HeroBlogBorrowing
