import * as React from 'react'
import { Link } from 'gatsby'

function CategoryBlogs({ categoryBlogs }) {
  return (
    categoryBlogs && (
      <section className="category_blogs_container_parent">
        <div className="category_blogs_container  space-y-5">
          {categoryBlogs &&
            categoryBlogs.map(({ node }) => (
              <Link
                to={`/learn/${node.fields.slug}`}
                key={node.id}
                className="block"
              >
                <article className="category_blogs_content">
                  <img
                    src={node.frontmatter.coverUrl}
                    alt="blog3"
                    // height={197}
                    style={{
                      minWidth: '350px',
                      width: '100%',
                      height: '200px',
                    }}
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

export default CategoryBlogs
