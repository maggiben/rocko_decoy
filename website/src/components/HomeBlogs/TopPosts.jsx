import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import BlogsContainer from '../BlogsContainer/BlogsContainer'

function TopPosts() {
  // !top post data
  const topPostData = useStaticQuery(graphql`
    query FeaturedTopPosts {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { featured: { eq: true } } }
        limit: 3
        skip: 1
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              featured
              tags
              coverUrl
              description
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
      blogsCategory="Top Posts"
      grayBG="bg-[#F9F9F9]"
    />
  )
}

export default TopPosts
