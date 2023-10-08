import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import BlogsContainer from "../BlogsContainer/BlogsContainer"
const TopPosts = () => {
  // !top post data
  const topPostData = useStaticQuery(graphql`
    query PostsWithTagCustom {
      allMarkdownRemark(limit: 3,skip: 1, sort: { frontmatter: { date: ASC } }) {
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

  const topPost = topPostData.allMarkdownRemark.edges
  console.log(topPost)

  return (
    <>
      <BlogsContainer
        blogDetails={topPost}
        blogsCategory="Top Posts"
        grayBG="bg-[#F9F9F9]"
      />
    </>
  )
}

export default TopPosts
