import image2 from "../../../images/placeHolderImage-2.png"
import user from "../../../images/blog-user.png"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as React from "react"

const HeroBlogFaq = () => {
  const query = graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            featured: { eq: true }
            coverUrl: {}
            author: {}
            tags: { in: "Rocko FAQs" }
          }
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
              author
              authorImg
              authorByline
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

  const data = useStaticQuery(query)
  const heroBlog = data.allMarkdownRemark?.edges[0]?.node
  console.log('heroBlog FAQ', heroBlog)

  return (
    heroBlog && (
      <Link to={`/learning-resources/${heroBlog.fields.slug}`}>
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
            <p className="!text-xs !text-[#545454]">
              {heroBlog?.frontmatter.date}
            </p>
            <div className="!flex !space-x-3 !items-center pt-2">
              <div className="!w-10 !h-10 !rounded-full">
                <img
                  src={heroBlog?.frontmatter.authorImg || user}
                  alt="user"
                  height={40}
                  width={40}
                  className="!rounded-full !object-cover !w-full !h-full"
                />
              </div>

              <p className="!text-sm">
                {heroBlog?.frontmatter.author}
                <span className="!text-xs !text-[#545454] !block">
                  {heroBlog?.frontmatter.authorByline}
                </span>
              </p>
            </div>
          </article>
        </section>
      </Link>
    )
  )
}

export default HeroBlogFaq
