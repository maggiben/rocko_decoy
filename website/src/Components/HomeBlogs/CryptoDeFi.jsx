import React from "react"
import BlogsContainer from "../BlogsContainer/BlogsContainer"
import { graphql, useStaticQuery } from "gatsby"

const CryptoDeFi = ({ category }) => {
  // !top post data
  const cryptoDeFiData = useStaticQuery(graphql`
    query PostsWithTag {
      allMarkdownRemark(
        filter: { frontmatter: { tags: { in: "Crypto & DeFi" } } }
        limit: 3
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              description
              coverUrl
              tags
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

  const cryptoDeFi = cryptoDeFiData.allMarkdownRemark.edges
  console.log(cryptoDeFi)
  return (
    <>
      <BlogsContainer
        blogDetails={cryptoDeFiData}
        blogsCategory={"Crypto & DeFi"}
        grayBG="bg-[#F9F9F9]"
      />
    </>
  )
}

export default CryptoDeFi
