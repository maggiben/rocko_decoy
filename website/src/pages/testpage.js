import { graphql } from "gatsby"
import React from "react"

const TestPage = ({ data }) => {
  console.log("test page", data)
  return <div>TestPage</div>
}

export const query = graphql`
  query blogQueryUseTagVar($tag: String = "") {
    allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            tags
            title
            description
          }
        }
      }
    }
  }
`

export default TestPage
