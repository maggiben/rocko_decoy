import image2 from "../../../images/placeHolderImage-2.png"
import user from "../../../images/blog-user.png"
import { Link } from "gatsby"
import * as React from "react"

const Hero = ({heroBlog}) => {
  
  return (
    <>
      <Link to={`/learn/${heroBlog.fields.slug}`}>
        <section className="hero_blog_container">
          <div className="hero_blog_container_image_container">
            <img
              src={heroBlog?.frontmatter.coverUrl || image2}
              alt="blog2"
              style={{ width: "100%", maxHeight: "488px" }}
              className="hero_blog_container_image"
            />
          </div>
          <article className="hero_blog_container_details">
            <p className="hero_blog_container_details_p_1">
              {heroBlog?.frontmatter.tags[0]}
            </p>
            <h2 className="hero_blog_container_details_h2_1">
              {heroBlog?.frontmatter.title}
            </h2>
            <p className="hero_blog_container_details_p_2">
              {heroBlog.excerpt}
            </p>
            <p className="hero_blog_container_details_p_3">
              {heroBlog?.frontmatter.date}
            </p>
            <div className="hero_blog_container_details_userinfo">
              <div className="!w-10 !h-10 !rounded-full">
                <img
                  src={heroBlog?.frontmatter.authorImg || user}
                  alt="user"
                  height={40}
                  width={40}
                  className="hero_blog_container_details_userinfo_image"
                />
              </div>
              <p className="hero_blog_container_details_userinfo_p_1">
                {heroBlog?.frontmatter.author}
                <span className="hero_blog_container_details_userinfo_span_1">
                  {heroBlog?.frontmatter.authorByline}
                </span>
              </p>
            </div>
          </article>
        </section>
      </Link>
    </>
  )
}

export default Hero;