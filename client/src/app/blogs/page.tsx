"use client";
import Image from "next/image";
import React, { useState } from "react";
import image1 from "@/assets/Blogs/Image-1.png";
import image2 from "@/assets/Blogs/Image-2.png";
import image3 from "@/assets/Blogs/Image-3.png";
import BlogsContainer from "@/components/blogsContainer/BlogsContainer";
import BlogsCategories from "@/components/blogsCategories/BlogsCategories";
import HeroBlog from "@/components/heroBlog/HeroBlog";
import Subscribe from "@/components/subscribe/Subscribe";
import CategoryBlogsContainer from "@/components/categoryBlogsContainer/CategoryBlogsContainer";

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
        style={{ width: "100%" }}
        className="rounded-[20px] mb-6 object-cover"
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
        style={{ width: "100%" }}
        className="rounded-[20px] mb-6 object-cover"
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
        style={{ width: "100%" }}
        className="rounded-[20px] mb-6 object-cover"
      />
    ),
    category: "Category 3",
    title: "A blog post title 3",
    description: "A description of the article 3",
    publishedDate: "Sept 26, 2023",
  },
];

const Blogs = () => {
  //* useState Hooks
  const [selectCategory, setSelectCategory] = useState<string>("All");

  return (
    <>
      {/* //! ------BlogsCategories Container Start----- */}
      <BlogsCategories
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      {/* //! ------BlogsCategories Container End----- */}
      {/* //! ------Category name will show when user click any of the listed category----- */}
      {selectCategory !== "All" && (
        <h1 className="font-[500] text-[32px] mb-16 container ml-4 md:mx-auto">
          {selectCategory}
        </h1>
      )}
      {/* //! ------HeroBlog Start----- */}
      <HeroBlog />
      {/* //! ------HeroBlog End----- */}
      {/* //! ------Subscribe Start----- */}
      {selectCategory === "All" && <Subscribe />}{" "}
      {/* //!Subscribe will show only when "All" category is selected */}
      {/* //! ------Subscribe End----- */}
      {selectCategory === "All" ? (
        <>
          {/* //! ------Latest-Post Container Start----- */}
          <BlogsContainer
            blogDetails={blogDetails}
            blogsCategory="Latest Posts"
          />
          {/* //! ------Latest-Post Container End----- */}
          {/* //! ------Top-Post Container Start----- */}
          <BlogsContainer
            blogDetails={blogDetails}
            blogsCategory="Top Posts"
            grayBG="bg-[#F9F9F9]"
          />
          {/* //! ------Top-Post Container End----- */}
          {/* //! ------Category 1-Post Container Start----- */}
          <BlogsContainer
            blogDetails={blogDetails}
            blogsCategory="Category 1 Posts"
            viewButton="View All"
          />
          {/* //! ------Category 1-Post Container End----- */}
          {/* //! ------Category 2-Post Container Start----- */}
          <BlogsContainer
            blogDetails={blogDetails}
            blogsCategory="Category 2 Posts"
            viewButton="View All"
            grayBG="bg-[#F9F9F9]"
          />
          {/* //! ------Category 2-Post Container End----- */}
        </>
      ) : (
        <>
          <BlogsContainer
            blogDetails={blogDetails}
            blogsCategory="Title"
            grayBG="bg-[#F9F9F9]"
          />
          <CategoryBlogsContainer />
        </>
      )}
    </>
  );
};

export default Blogs;
