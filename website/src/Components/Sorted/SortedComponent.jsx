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

const hero = {
  "DeFi Borrowing & Lending": {
    Component: <HeroBlogDiFi />,
    ThreeTitle: <ThreeTitleDeFi />,
    CategoryBlogs: <CategoryBlogsDeFi />,
  },
  "Rocko FAQs": {
    Component: <HeroBlogFaq />,
    ThreeTitle: <ThreeTitleFAQ />,
    CategoryBlogs: <CategoryBlogsFAQ />,
  },
  "Crypto & DeFi": {
    Component: <HeroBlogCryptoDeFi />,
    ThreeTitle: <ThreeTitleCryptoDeFi />,
    CategoryBlogs: <CategoryBlogsCryptoDeFi />,
  },
}
const SortedComponent = ({ selectCategory }) => {
  const tag = selectCategory?.name

  return (
    <>
      {/* //! hero start */}
      {hero[tag].Component}
      {/* //! hero end */}

      {/* //! Three Title start */}
      {hero[tag].ThreeTitle}
      {/* //! Three Title end */}

      {/* //! Category Blogs start */}
      {hero[tag].CategoryBlogs}
      {/* //! Category Blogs end */}
    </>
  )
}

export default SortedComponent
