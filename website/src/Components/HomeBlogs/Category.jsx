import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import BlogsContainer from "../BlogsContainer/BlogsContainer"
const TopPosts = () => {
  // !top post data
  const topPostData = useStaticQuery(graphql`
    query PostsWithDeFiBorrowingLendingTag {
      allMarkdownRemark(
        filter: { frontmatter: { tags: { in: "DeFi Borrowing & Lending" } } }
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

  const topPost = topPostData?.allMarkdownRemark?.edges
  // console.log(topPost)

  return (
    <>
      <BlogsContainer
        blogDetails={topPost}
        blogsCategory="Borrowing"
        grayBG="bg-[#F9F9F9]"
      />
    </>
  )
}

export default TopPosts
