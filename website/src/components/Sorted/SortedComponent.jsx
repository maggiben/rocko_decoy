import React from "react"
import HeroBlogDiFi from "./Hero/HeroBlogDiFi"
import HeroBlogFaq from "./Hero/HeroBlogFaq"
import HeroBlogCryptoDeFi from "./Hero/HeroBlogCryptoDeFi"
import ThreeTitleFAQ from "./ThreeTitle/ThreeTitleFAQ"
import ThreeTitleDeFi from "./ThreeTitle/ThreeTitleDeFi"
import ThreeTitleCryptoDeFi from "./ThreeTitle/ThreeTitleCryptoDeFi"
import CategoryBlogsDeFi from "./CategoryBlogs/CategoryBlogsDeFi"
import CategoryBlogsFAQ from "./CategoryBlogs/CategoryBlogsFAQ"
import CategoryBlogsCryptoDeFi from "./CategoryBlogs/CategoryBlogsCryptoDeFi"
import HeroBlogBorrowing from "./Hero/HeroBlogDiFiBorrowing"
import ThreeTitleBorrowing from "./ThreeTitle/ThreeTitleBorrowing"
import CategoryBlogsBorrowing from "./CategoryBlogs/CategoryBlogsBorrowing"

const hero = {
  "de-fi-borrowing-and-lending": {
    Component: <HeroBlogDiFi />,
    ThreeTitle: <ThreeTitleDeFi />,
    CategoryBlogs: <CategoryBlogsDeFi />,
  },
  "borrowing": {
    Component: <HeroBlogBorrowing />,
    ThreeTitle: <ThreeTitleBorrowing />,
    CategoryBlogs: <CategoryBlogsBorrowing />,
  },
  "rocko-how-tos": {
    Component: <HeroBlogFaq />,
    ThreeTitle: <ThreeTitleFAQ />,
    CategoryBlogs: <CategoryBlogsFAQ />,
  },
  "crypto-and-de-fi": {
    Component: <HeroBlogCryptoDeFi />,
    ThreeTitle: <ThreeTitleCryptoDeFi />,
    CategoryBlogs: <CategoryBlogsCryptoDeFi />,
  },
}
const SortedComponent = ({ selectCategory }) => {
  const tag = selectCategory?.hash

  return (
    <>
      {/* //! hero start */}
      {hero[tag]?.Component}
      {/* //! hero end */}

      {/* //! Three Title start */}
      {hero[tag]?.ThreeTitle}
      {/* //! Three Title end */}

      {/* //! Category Blogs start */}
      {hero[tag]?.CategoryBlogs}
      {/* //! Category Blogs end */}
    </>
  )
}

export default SortedComponent
