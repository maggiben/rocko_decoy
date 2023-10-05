import * as React from "react"
import { BiChevronRight } from "react-icons/bi";

const BlogsContainer = ({ blogDetails, blogsCategory, grayBG, viewButton }) => {
  return (
    <section className={`${grayBG && "bg-[#F9F9F9]"} py-16`}>
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-[32px]">{blogsCategory}</h1>
          {viewButton && (
            <p className="text-[#2C3B8D] font-[500] text-sm inline-block">
              {viewButton}{" "}
              <BiChevronRight className="text-3xl inline-block -ml-2" />
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-10">
          {blogDetails.map(
            ({ image, category, title, description, publishedDate }, i) => (
              <React.Fragment key={i}>
                <article>
                  <img
                    src={image}
                    alt="blog3"
                    height={197}
                    style={{ width: "100%" }}
                    className="rounded-[20px] mb-6 object-cover"
                  />

                  <div className="space-y-2">
                    <p className="text-[#545454] text-sm">{category}</p>
                    <h2 className="text-[28px]">{title}</h2>
                    <p>{description}</p>
                    <p className="text-xs text-[#545454]">{publishedDate}</p>
                  </div>
                </article>
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsContainer;
