import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import CategoryBlogs from "./CategoryBlogs"

const CategoryBlogsCryptoDeFi = () => {
  const query = graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { tags: { eq: "Crypto & DeFi" } } }
        sort: { frontmatter: { date: ASC } }
        skip: 3
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
  `

  const categoryBlogsData = useStaticQuery(query)

  const categoryBlogs = categoryBlogsData?.allMarkdownRemark?.edges
  // console.log(categoryBlogs, categoryBlogsData)

  return categoryBlogs && <CategoryBlogs categoryBlogs={categoryBlogs} />
}

export default CategoryBlogsCryptoDeFi
