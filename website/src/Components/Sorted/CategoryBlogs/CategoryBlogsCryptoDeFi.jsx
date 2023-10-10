import * as React from "react"
import image1 from "../../../images/placeHolderImage-1.png"
import image2 from "../../../images/placeHolderImage-2.png"
import image3 from "../../../images/placeHolderImage-3.png"
import { graphql, useStaticQuery } from "gatsby"


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
  console.log(categoryBlogs,categoryBlogsData)

  return (
    <section className={`!py-16`}>
      <div className="!container !mx-auto !px-4 !space-y-10 category_blogs_container">
      {categoryBlogs &&
          categoryBlogs.map(({ node }) => (
            <React.Fragment key={node.id}>
              <article className="!flex !flex-col !gap-y-6 category_blogs_content">
                <img
                  src={node.frontmatter.coverUrl}
                  alt="blog3"
                  height={197}
                  className="!rounded-[20px] !object-cover !w-full category_blogs_content_image"
                />
                <div className="!space-y-2 category_blogs_content_details">
                  <p className="!text-[#545454] !text-sm">{node.frontmatter.tags[0]}</p>
                  <h2 className="!text-[28px] !tracking-[0px]">{node.frontmatter.title}</h2>
                  <p>{node.frontmatter.description}</p>
                  <p className="!text-xs !text-[#545454]">{node.frontmatter.date}</p>
                </div>
              </article>
            </React.Fragment>
          ))}
      </div>
    </section>
  )
}

export default CategoryBlogsCryptoDeFi
