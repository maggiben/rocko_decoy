import * as React from "react"
import image1 from "../../images/placeHolderImage-1.png"
import image2 from "../../images/placeHolderImage-2.png"
import image3 from "../../images/placeHolderImage-3.png"
// *Create an array of blog post objects
const blogDetails = [
  {
    image: image1,
    category: "Category 1",
    title: "A blog post title 1",
    description: "A description of the article 1",
    publishedDate: "Sept 24, 2023",
  },
  {
    image: image2,
    category: "Category 2",
    title: "A blog post title 2",
    description: "A description of the article 2",
    publishedDate: "Sept 25, 2023",
  },
  {
    image: image3,
    category: "Category 3",
    title: "A blog post title 3",
    description: "A description of the article 3",
    publishedDate: "Sept 26, 2023",
  },
  {
    image: image1,
    category: "Category 1",
    title: "A blog post title 1",
    description: "A description of the article 1",
    publishedDate: "Sept 24, 2023",
  },
  {
    image: image2,
    category: "Category 2",
    title: "A blog post title 2",
    description: "A description of the article 2",
    publishedDate: "Sept 25, 2023",
  },
  {
    image: image3,
    category: "Category 3",
    title: "A blog post title 3",
    description: "A description of the article 3",
    publishedDate: "Sept 26, 2023",
  },
]

const CategoryBlogsContainer = () => {
  return (
    <section className={`!py-16`}>
      <div className="!container !mx-auto !px-4 !space-y-10 category_blogs_container">
        {blogDetails.map(
          ({ image, category, title, description, publishedDate }, i) => (
            <React.Fragment key={i}>
              <article className="!flex !flex-col !gap-y-6 category_blogs_content">
                <img
                  src={image}
                  alt="blog3"
                  height={197}
                  className="!rounded-[20px] !object-cover !w-full category_blogs_content_image"
                />
                <div className="!space-y-2 category_blogs_content_details">
                  <p className="!text-[#545454] !text-sm">{category}</p>
                  <h2 className="!text-[28px] !tracking-[0px]">{title}</h2>
                  <p>{description}</p>
                  <p className="!text-xs !text-[#545454]">{publishedDate}</p>
                </div>
              </article>
            </React.Fragment>
          )
        )}
      </div>
    </section>
  )
}

export default CategoryBlogsContainer
