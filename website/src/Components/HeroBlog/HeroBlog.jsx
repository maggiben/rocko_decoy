import image2 from "../../images/placeHolderImage-2.png"
import user from "../../images/blog-user.png"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"

const HeroBlog = () => {
  const data = useStaticQuery(graphql`
    query FeaturedPosts {
      allMarkdownRemark(
        filter: {
          frontmatter: { featured: { eq: true }, coverUrl: {}, author: {} }
        }
        limit: 1
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

  const heroBlog = data.allMarkdownRemark.edges[0].node

  return (
    <section className="!container !mx-auto !mb-16 !flex !flex-col !px-4 hero_blog_container">
      <div className="!basis-3/5 !mb-8 hero_blog_container_image">
        <img
          src={image2}
          alt="blog2"
          // style={{ width: "100%", height: "371px" }}
          className="!rounded-[20px] !object-cover !w-full"
        />
      </div>
      <article className="!basis-2/5 !space-y-2  !self-center !h-max hero_blog_container_details">
        <p className="!text-[#545454] !text-sm">
          {heroBlog?.frontmatter.tags[0]}
        </p>
        <h2 className="!text-[48px] !leading-[56px] !py-2 !tracking-[0px] !text-[#141414]">
          {heroBlog?.frontmatter.title}
        </h2>
        <p className="!text-[#141414] text-base">{heroBlog.excerpt}</p>
        <p className="!text-xs !text-[#545454]">{heroBlog?.frontmatter.date}</p>
        <div className="!flex !space-x-3 !items-center pt-2">
          <img
            src={user}
            alt="user"
            height={40}
            width={40}
            className="!rounded-full !object-cover"
          />
          <p className="!text-sm">
            Vince DePalma{" "}
            <span className="!text-xs !text-[#545454] !block">Co-Founder</span>
          </p>
        </div>
      </article>
    </section>
  )
}

export default HeroBlog
