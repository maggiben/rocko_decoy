import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import BlogsContainer from "../BlogsContainer/BlogsContainer"
const LatestPosts = () => {
  // !latest post data
  const latestPostData = useStaticQuery(graphql`
    query PostsWithTag {
      allMarkdownRemark(limit: 3, sort: { frontmatter: { date: ASC } }) {
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
  const latestPost = latestPostData.allMarkdownRemark.edges

  return (
    <>
      <BlogsContainer blogDetails={latestPost} blogsCategory="Latest Posts" />
    </>
  )
}

export default LatestPosts
