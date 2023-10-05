
import * as React from "react"
import image1 from "../images/Image-1.png";
import image2 from "../images/Image-2.png";
import image3 from "../images/Image-3.png";
import BlogsCategories from "../Components/BlogsCategories/BlogsCategories";
import HeroBlog from "../Components/HeroBlog/HeroBlog";
import Subscribe from "../Components/Subscribe/Subscribe";
import BlogsContainer from "../Components/BlogsContainer/BlogsContainer";
import CategoryBlogsContainer from "../Components/CategoryBlogsContainer/CategoryBlogsContainer";
import Layout from "../Components/Layout/Layout";


const Index = () => {
  //* useState Hooks
  const [selectCategory, setSelectCategory] = React.useState("All");

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
];
  return (
   <Layout>
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
   </Layout>
  );
};

export default Index;
