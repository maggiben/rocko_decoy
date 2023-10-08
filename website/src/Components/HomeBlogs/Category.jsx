import React from "react"
import BlogsContainer from "../BlogsContainer/BlogsContainer"
import { graphql, useStaticQuery } from "gatsby"

const Category = ({ category }) => {
 // !top post data
 const deFiData = useStaticQuery(graphql`
 query PostsWithTagCustom {
   allMarkdownRemark(
    filter: {frontmatter: {tags: {in: "DeFi Borrowing & Lending"}}}
    limit: 3
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

const deFi = deFiData.allMarkdownRemark.edges
console.log(deFi)

  return (
    <>
      <BlogsContainer
        blogDetails={deFi}
        blogsCategory={'DeFi Borrowing & Lending'}
        grayBG="bg-[#F9F9F9]"
      />
    </>
  )
}

export default Category
