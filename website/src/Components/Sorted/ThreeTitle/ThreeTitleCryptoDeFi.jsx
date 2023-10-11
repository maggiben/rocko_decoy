import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import BlogsContainer from "../../BlogsContainer/BlogsContainer"
const ThreeTitleCryptoDeFi = () => {
  // !latest post data
  const latestPostData = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        limit: 3
        sort: { frontmatter: { date: ASC } }
        filter: {
          frontmatter: {
            coverUrl: {}
            author: {}
            tags: { in: "Crypto & DeFi" }
          }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              tags
              description
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
  `)
  const latestPost = latestPostData?.allMarkdownRemark?.edges

  return (
    <>
      <BlogsContainer blogDetails={latestPost} />
    </>
  )
}

export default ThreeTitleCryptoDeFi
