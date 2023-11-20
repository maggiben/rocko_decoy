import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import BlogsContainer from "../BlogsContainer/BlogsContainer"
const TopPosts = () => {
  // !top post data
  const topPostData = useStaticQuery(graphql`
    query PostsWithFaqsTag {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { tags: { in: "Rocko How-tos" } } }
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
        blogsCategory="Rocko How-tos"
        grayBG="bg-[#F9F9F9]"
      />
    </>
  )
}

export default TopPosts
