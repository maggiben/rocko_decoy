import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const CategoryBlogsBorrowing = () => {
  const query = graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { tags: { eq: "Borrowing" } } }
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

  return (
    categoryBlogs && (
      <section className="category_blogs_container_parent">
        <div className="category_blogs_container  space-y-5">
          {categoryBlogs &&
            categoryBlogs.map(({ node }) => (
              <Link
                to={`/learning-resources/${node.fields.slug}`}
                key={node.id}
                className="block"
              >
                <article className="category_blogs_content">
                  <img
                    src={node.frontmatter.coverUrl}
                    alt="blog3"
                    height={197}
                    className="category_blogs_content_image"
                  />
                  <div className="category_blogs_content_details">
                    <p className="category_blogs_content_details_p_1">
                      {node.frontmatter.tags[0]}
                    </p>
                    <h2 className="category_blogs_content_details_h2_1">
                      {node.frontmatter.title}
                    </h2>
                    <p className="category_blogs_content_details_p_2">
                      {node.frontmatter.description}
                    </p>
                    <p className="category_blogs_content_details_p_3">
                      {node.frontmatter.date}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </section>
    )
  )
}

export default CategoryBlogsBorrowing
