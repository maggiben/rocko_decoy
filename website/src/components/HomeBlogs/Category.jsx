import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import BlogsContainer from '../BlogsContainer/BlogsContainer'

function TopPosts() {
  // !top post data
  const topPostData = useStaticQuery(graphql`
    query PostsWithDeFiBorrowingLendingTag {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { tags: { in: "Borrowing" } } }
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
    <BlogsContainer
      blogDetails={topPost}
      blogsCategory="Borrowing"
      grayBG="bg-[#F9F9F9]"
    />
  )
}

export default TopPosts
