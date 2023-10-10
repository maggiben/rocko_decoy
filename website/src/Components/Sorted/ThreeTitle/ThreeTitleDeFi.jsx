import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import BlogsContainer from "../../BlogsContainer/BlogsContainer"
const ThreeTitleDeFi = () => {
  // !latest post data
  const latestPostData = useStaticQuery(graphql`{
      allMarkdownRemark(
        limit: 3
        sort: { frontmatter: { date: ASC } }
        filter: {
          frontmatter: {
            coverUrl: {}
            author: {}
            tags: { in: "DeFi Borrowing & Lending" }
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
      <BlogsContainer blogDetails={latestPost} blogsCategory="DeFi Borrowing & Lending" />
    </>
  )
}

export default ThreeTitleDeFi
