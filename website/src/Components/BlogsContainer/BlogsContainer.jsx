import { Link } from "gatsby"
import * as React from "react"
import { BiChevronRight } from "react-icons/bi"

const BlogsContainer = ({ blogDetails, blogsCategory, grayBG, viewButton }) => {
  console.log(blogDetails)
  return (
    <section className={`${grayBG && "!bg-[#F9F9F9]"} !py-16`}>
      <div className="!container !mx-auto !px-4 blogs_container">
        <div className="!flex !items-center !justify-between !mb-10">
          <h1 className="!text-[32px]">{blogsCategory}</h1>
          {viewButton && (
            <p className="!text-[#2C3B8D] !font-[500] !text-sm !inline-block">
              {viewButton}{" "}
              <BiChevronRight className="!text-3xl !inline-block !-ml-2" />
            </p>
          )}
        </div>
        <div className="!grid !grid-cols-1 !gap-y-12  blogs_container_details">
          {blogDetails.map((details, i) => (
            <Link to={`/${details.node.id}`} key={details.node.id}>
              <article>
                <img
                  src={details.node.frontmatter.coverUrl}
                  alt="blog3"
                  height={197}
                  style={{ width: "100%" }}
                  className="!rounded-[20px] !mb-6 !object-cover"
                />

                <div className="!space-y-2">
                  {/* category */}
                  <p className="!text-[#545454] !text-sm">
                    {details.node.frontmatter.tags[0]}
                  </p>
                  {/* title */}
                  {/* here is title */}
                  <h2 className="!text-[28px] tracking-[0px]">
                    {details.node.frontmatter.title}
                  </h2>
                  {/* description */}
                  <p>{details.node.excerpt}</p>
                  {/* date */}
                  <p className="!text-xs !text-[#545454]">
                    {details.node.frontmatter.date}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogsContainer
