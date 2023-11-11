import * as React from "react"
import BlogsCategories from "../components/BlogsCategories/BlogsCategories"

import Subscribe from "../components/Subscribe/Subscribe"
import LatestPosts from "../components/HomeBlogs/LatestPosts"
import TopPosts from "../components/HomeBlogs/TopPosts"
import Category from "../components/HomeBlogs/Category"
import CryptoDeFi from "../components/HomeBlogs/CryptoDeFi"
import Faq from "../components/HomeBlogs/Faq"
import HeroBlog from "../components/HeroBlog/HeroBlog"
import SortedComponent from "../components/Sorted/SortedComponent"
import { navigate } from "gatsby"
import slugify from "@sindresorhus/slugify"
import Layout from "../components/layout"
const SHOW_BLOG = process.env.FEATURE_FLAG_SHOW_BLOG === 'true';

const Index = () => {

  //* useState Hooks
  const [selectCategory, setSelectCategory] = React.useState({
    id: "all",
    name: "All",
    hash: "",
  })

  React.useEffect(() => {
    if (window.location.hash) {
      console.log(window.location.hash, selectCategory)
      setSelectCategory({
        id: window.location.hash,
        name: window.location.hash.replace("#", ""),
        hash: window.location.hash.replace("#", ""),
      })
    }
  }, [])

  React.useEffect(() => {
    if (selectCategory.name === "All") {
      navigate("/learn")
    } else {
      window.location.hash = slugify(selectCategory.hash)
    }
  }, [selectCategory])

  console.log(selectCategory)

  if (!SHOW_BLOG) {
    return null
  }

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

        {/* //! ------Subscribe End----- */}
        {selectCategory.name === "All" ? (
          <>
            {/* //! hero start */}
            <HeroBlog />
            {/* //! hero end */}

            {/* //! ------Subscribe Start----- */}
            <Subscribe />
            {/* //!Subscribe will show only when "All" category is selected */}

            {/* //! ------Latest-Post Container Start----- */}
            <LatestPosts />
            {/* //! ------Latest-Post Container End----- */}
            {/* //! ------Top-Post Container Start----- */}
            <TopPosts />
            {/* //! ------Top-Post Container End----- */}
            {/* //! ------Category 1-Post Container Start----- */}
            <Category />
            <CryptoDeFi />
            <Faq />
            {/* //! ------Category 1-Post Container End----- */}
          </>
        ) : (
          <SortedComponent selectCategory={selectCategory} />
        )}
      </>
    </Layout>
  )
}

export default Index
