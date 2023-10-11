import * as React from "react"
import { BiChevronRight } from "react-icons/bi"
import fb_icon from "../images/fb-icon.png"
import x_icon from "../images/x-icon.png"
import linkedin_icon from "../images/linkedin-icon.png"
import at_icon from "../images/at-icon.png"
import whatsapp_icon from "../images/whatsapp-icon.png"
import image1 from "../images/placeHolderImage-1.png"
import image2 from "../images/placeHolderImage-2.png"
import image3 from "../images/placeHolderImage-3.png"
import user from "../images/blog-user.png"

import { Link } from "gatsby"

import BlogsContainer from "../components/BlogsContainer/BlogsContainer"
import Layout from "../Components/Layout/Layout"
import Subscribe from "../components/Subscribe/Subscribe"

const socialIcons = [
  {
    icon: fb_icon,
  },
  {
    icon: x_icon,
  },
  {
    icon: linkedin_icon,
  },
  {
    icon: at_icon,
  },
  {
    icon: whatsapp_icon,
  },
]

const dummyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec dignissim magna. Aliquam volutpat fringilla leo sit amet dignissim. Fusce id dapibus orci. Integer a eros turpis. Praesent vitae laoreet lectus. Phasellus nulla lacus, mattis at mauris nec, commodo tincidunt dui. Aliquam mollis ex risus, non tincidunt eros tempus et. Donec dictum consectetur iaculis. Sed est arcu, hendrerit quis ultricies elementum, tincidunt viverra dolor. Vestibulum cursus ante ac turpis laoreet, ut varius leo porta. Duis mauris enim, venenatis in rhoncus non, ullamcorper sit amet ex. Praesent imperdiet, libero et dignissim iaculis, nunc turpis pharetra ligula, eu pulvinar nunc odio at orci."

const tags = [
  {
    tag: "Article tag",
  },
  {
    tag: "Article tag",
  },
  {
    tag: "Article tag",
  },
  {
    tag: "Article tag",
  },
  {
    tag: "Article tag",
  },
]

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
]

const SingleBlog = () => {
  return (
    <Layout>
      <>
        {/* //!Share to social-media section -- start */}
        <section className="!container !mx-auto !my-10 !flex !flex-wrap !items-center !justify-between !gap-3 !px-4 share_social_media_container">
          <Link
            to="/"
            className="!px-4 !py-2 !rounded-3xl !text-[#2C3B8D] !bg-[#EEE] !font-[500] !flex !items-center"
          >
            <BiChevronRight className="!text-3xl !inline-block !-rotate-180 !-mr-1" />{" "}
            <span>Back</span>
          </Link>
          <div className="!flex !space-x-2 !items-center">
            <p className="!text-sm !pr-4 !border-r-[1px] !border-[#E2E2E2] !mr-4">
              Share
            </p>
            {socialIcons.map(({ icon }, i) => (
              <div
                key={i}
                className="!h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center"
              >
                <img src={icon} alt="social-icon" height={16} width={16} />
              </div>
            ))}
          </div>
        </section>
        {/* //!Share to social-media section -- end */}
        {/* //!Blog section -- start */}
        <main className="!max-w-[660px] !w-full !mx-auto">
          {/* //!Photo & Publication details section -- start */}
          <section className="!mb-16 !space-y-14 !px-4 single_blog_container">
            <article className="!space-y-2  h-max">
              <p className="!text-[#2C3B8D] !text-sm">Category</p>
              <h2 className="!text-[48px] !leading-[56px] !py-2 !tracking-[0px]">
                A blog post title will go here.
              </h2>
              <p>A description of the article will go here</p>
              <p className="!text-xs !text-[#545454]">Sept 24, 2023</p>
              <div className="!flex !space-x-3 !items-center !pt-6">
                <img
                  src={user}
                  alt="user"
                  height={40}
                  width={40}
                  className="!rounded-full !object-cover"
                />
                <p className="!text-sm">
                  Vince DePalma{" "}
                  <span className="!text-xs !text-[#545454] !block">
                    Co-Founder
                  </span>
                </p>
              </div>
            </article>
            <img
              src={image2}
              alt="blog2"
              style={{ width: "100%", height: "371px" }}
              className="!rounded-[20px] !object-cover"
            />
          </section>
          {/* //!Photo & Publication details section -- end */}
          <p className="!px-4 single_blog_p">{dummyText}</p>
          {/* //!singleBlog prop changes some style in subscriber component */}
          <Subscribe singleBlog={true} />
          <p className="!px-4 single_blog_p">{dummyText}</p>
          <h1 className="!my-6 !text-[28px] !px-4 single_blog_h1">Subhead</h1>
          <p className="!px-4 single_blog_p">{dummyText}</p>
          {/* //!Article Tags Section Start */}
          <div className="!flex !flex-wrap !gap-x-2 !gap-y-3 !justify-center !mt-10 !mb-[75px] !px-4 article_tags_container">
            {tags.map(({ tag }, i) => (
              <button
                key={i}
                className="!py-[10px] !px-6 !rounded-3xl !border-[1px] !border-[#E2E2E2] !font-[500] !text-sm !text-black !bg-[#EEE]"
              >
                {tag}
              </button>
            ))}
          </div>
          {/* //!Article Tags Section End */}
        </main>
        {/* //!Blog section -- end */}
        {/* //! ------Latest-Post Container Start----- */}
       {/*  <BlogsContainer
          blogDetails={blogDetails}
          blogsCategory="Latest Posts"
          grayBG="bg-[#F9F9F9]"
        /> */}
        {/* //! ------Latest-Post Container End----- */}
      </>
    </Layout>
  )
}

export default SingleBlog
