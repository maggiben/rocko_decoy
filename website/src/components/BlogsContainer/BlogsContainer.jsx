import { Link } from "gatsby"
import * as React from "react"
import { BiChevronRight } from "react-icons/bi"
import slugify from '@sindresorhus/slugify';

const BlogsContainer = ({ blogDetails, blogsCategory, grayBG, viewButton }) => {
  // console.log(blogDetails)
  return (
    <section
      className={`${
        grayBG && "blogs_container_parent_bg_gray"
      } blogs_container_parent`}
    >
      <div className="blogs_container">
        <div className="blogs_container_title">
          <h1 className="blogs_container_title_h1">{blogsCategory}</h1>
          {viewButton && (
            <p className="blogs_container_title_p">
              {viewButton}{" "}
              <BiChevronRight className="blogs_container_title_icon" />
            </p>
          )}
        </div>
        <div className="!grid !grid-cols-1 !gap-y-12  blogs_container_details">
          {blogDetails.map((details, i) =>{
            // const slug = slugify(details.node.frontmatter.title)
            return(
            <Link to={`/learn/${details.node.fields.slug}`} key={details.node.id}>
              <article>
                <img
                  src={details.node.frontmatter.coverUrl}
                  alt="blog3"
                  height={197}
                  style={{ width: "100%" }}
                  className="blogs_container_details_article_image"
                />

                <div className="blogs_container_details_article_info">
                  {/* category */}
                  <p className="blogs_container_details_article_info_p_1">
                    {details.node.frontmatter.tags[0]}
                  </p>
                  {/* title */}
                  {/* here is title */}
                  <h2 className="blogs_container_details_article_info_h2_1">
                    {details.node.frontmatter.title}
                  </h2>
                  {/* description */}
                  <p className="blogs_container_details_article_info_p_2">
                    {details.node.excerpt}
                  </p>
                  {/* date */}
                  <p className="blogs_container_details_article_info_p_3">
                    {details.node.frontmatter.date}
                  </p>
                </div>
              </article>
            </Link>
          )})}
        </div>
      </div>
    </section>
  )
}

export default BlogsContainer
