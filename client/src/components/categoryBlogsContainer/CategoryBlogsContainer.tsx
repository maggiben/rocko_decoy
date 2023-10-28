import Image from "next/image";
import React from "react";
import image1 from "@/assets/Blogs/Image-1.png";
import image2 from "@/assets/Blogs/Image-2.png";
import image3 from "@/assets/Blogs/Image-3.png";

//* Typescript
interface BlogPost {
  image: JSX.Element;
  category: string;
  title: string;
  description: string;
  publishedDate: string;
}

// *Create an array of blog post objects
const blogDetails: BlogPost[] = [
  {
    image: (
      <Image
        src={image1}
        alt="blog1"
        height={197}
        className="rounded-[20px] object-cover md:order-2 w-full md:w-[349px]"
      />
    ),
    category: "Category 1",
    title: "A blog post title 1",
    description: "A description of the article 1",
    publishedDate: "Sept 24, 2023",
  },
  {
    image: (
      <Image
        src={image2}
        alt="blog2"
        height={197}
        className="rounded-[20px] object-cover md:order-2 w-full md:w-[349px]"
      />
    ),
    category: "Category 2",
    title: "A blog post title 2",
    description: "A description of the article 2",
    publishedDate: "Sept 25, 2023",
  },
  {
    image: (
      <Image
        src={image3}
        alt="blog3"
        height={197}
        className="rounded-[20px] object-cover md:order-2 w-full md:w-[349px]"
      />
    ),
    category: "Category 3",
    title: "A blog post title 3",
    description: "A description of the article 3",
    publishedDate: "Sept 26, 2023",
  },
  {
    image: (
      <Image
        src={image1}
        alt="blog1"
        height={197}
        className="rounded-[20px] object-cover md:order-2 w-full md:w-[349px]"
      />
    ),
    category: "Category 1",
    title: "A blog post title 1",
    description: "A description of the article 1",
    publishedDate: "Sept 24, 2023",
  },
  {
    image: (
      <Image
        src={image2}
        alt="blog2"
        height={197}
        className="rounded-[20px] object-cover md:order-2 w-full md:w-[349px]"
      />
    ),
    category: "Category 2",
    title: "A blog post title 2",
    description: "A description of the article 2",
    publishedDate: "Sept 25, 2023",
  },
  {
    image: (
      <Image
        src={image3}
        alt="blog3"
        height={197}
        className="rounded-[20px] object-cover md:order-2 w-full md:w-[349px]"
      />
    ),
    category: "Category 3",
    title: "A blog post title 3",
    description: "A description of the article 3",
    publishedDate: "Sept 26, 2023",
  },
];

const CategoryBlogsContainer = () => {
  return (
    <section className={`py-16`}>
      <div className="container mx-auto px-4 md:px-0 space-y-10">
        {blogDetails.map(
          ({ image, category, title, description, publishedDate }, i) => (
            <React.Fragment key={i}>
              <article className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
                {image}
                <div className="space-y-2 md:order-1">
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
    </section>
  );
};

export default CategoryBlogsContainer;
