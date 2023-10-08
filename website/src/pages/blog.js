import * as React from "react"
import BlogsCategories from "../components/BlogsCategories/BlogsCategories"
import HeroBlog from "../components/HeroBlog/HeroBlog"
import Subscribe from "../components/Subscribe/Subscribe"
import Layout from "../Components/Layout/Layout"
import LatestPosts from "../components/HomeBlogs/LatestPosts"
import TopPosts from "../components/HomeBlogs/TopPosts"
import Category from "../components/HomeBlogs/Category"
import CryptoDeFi from "../components/HomeBlogs/CryptoDeFi"

const Index = () => {
  //* useState Hooks
  const [selectCategory, setSelectCategory] = React.useState({
    id: "",
    name: "All",
  })

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
        {selectCategory.name !== "All" && (
          <h1 className="!font-[500] !text-[32px] !mb-16 !container !px-4 category_name">
            {selectCategory.name}
          </h1>
        )}
        {/* //! ------HeroBlog Start----- */}
        <HeroBlog />
        {/* //! ------HeroBlog End----- */}
        {/* //! ------Subscribe Start----- */}
        {selectCategory.name === "All" && <Subscribe />}{" "}
        {/* //!Subscribe will show only when "All" category is selected */}
        {/* //! ------Subscribe End----- */}
        {selectCategory.name === "All" ? (
          <>
            {/* //! ------Latest-Post Container Start----- */}
            <LatestPosts />
            {/* //! ------Latest-Post Container End----- */}
            {/* //! ------Top-Post Container Start----- */}
            <TopPosts />
            {/* //! ------Top-Post Container End----- */}
            {/* //! ------Category 1-Post Container Start----- */}
            <Category />
            {/* //! ------Category 1-Post Container End----- */}

            {/* //! ------Category 2-Post Container Start----- */}
            <CryptoDeFi />
            {/* //! ------Category 2-Post Container End----- */}

          </>
        ) : (
          <>
            {/*  <BlogsContainer
              blogDetails={latestPost}
              blogsCategory="Title"
              grayBG="bg-[#F9F9F9]"
            />
            <CategoryBlogsContainer /> */}
          </>
        )}
      </>
    </Layout>
  )
}

export default Index
