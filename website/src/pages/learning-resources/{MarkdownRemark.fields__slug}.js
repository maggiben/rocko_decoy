import * as React from "react"
import { BiChevronRight } from "react-icons/bi"
import fb_icon from "../../images/fb-icon.png"
import x_icon from "../../images/x-icon.png"
import linkedin_icon from "../../images/linkedin-icon.png"
import whatsapp_icon from "../../images/whatsapp-icon.png"
import user from "../../images/blog-user.png"
import { graphql, Link } from "gatsby"

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import LatestPosts from "../../components/HomeBlogs/LatestPosts"
import Layout from "../../components/Layout/Layout"
import Subscribe from "../../components/Subscribe/Subscribe"

const SingleBlog = ({ data }) => {
  console.log("SingleBlog", data)
  const [shareUrl, setShareUrl] = React.useState("")
  React.useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const post = data.allMarkdownRemark.edges[0]?.node

  const socialIcons = [
    {
      icon: (
        <FacebookShareButton url={shareUrl}>
          <img src={fb_icon} alt="social-icon" height={16} width={16} />
        </FacebookShareButton>
      ),
    },
    {
      icon: (
        <TwitterShareButton url={shareUrl}>
          <img src={x_icon} alt="social-icon" height={16} width={16} />
        </TwitterShareButton>
      ),
    },
    {
      icon: (
        <LinkedinShareButton url={shareUrl}>
          <img src={linkedin_icon} alt="social-icon" height={16} width={16} />
        </LinkedinShareButton>
      ),
    },
    {
      icon: (
        <WhatsappShareButton url={shareUrl}>
          <img src={whatsapp_icon} alt="social-icon" height={16} width={16} />
        </WhatsappShareButton>
      ),
    },
  ]
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
            <span>Blog Home</span>
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
                {icon}
              </div>
            ))}
          </div>
        </section>
        {/* //!Share to social-media section -- end */}
        {/* //!Blog section -- start */}
        <main className="!max-w-[760px] !w-full !mx-auto">
          {/* //!Photo & Publication details section -- start */}
          <section className="!mb-16 !space-y-14 !px-4 single_blog_container">
            <article className="!space-y-2  h-max">
              <p className="!text-[#2C3B8D] !text-sm">
                {post?.frontmatter?.tags}
              </p>
              <h2 className="!text-[48px] !leading-[56px] !py-2 !tracking-[0px]">
                {post?.frontmatter?.title}
              </h2>
             
              <p className="!text-xs !text-[#545454]">Sept 24, 2023</p>
              <div className="!flex !space-x-3 !items-center !pt-6">
              <div className="!w-10 !h-10 !rounded-full">
            <img
              src={post?.frontmatter.authorImg || user}
              alt="user"
              height={40}
              width={40}
              className="!rounded-full !object-cover !w-full !h-full"
            />
          </div>
                <p className="!text-sm">
                 {
                    post?.frontmatter?.author
                 }
                  <span className="!text-xs !text-[#545454] !block">
                   
                   {
                      post?.frontmatter?.authorByline
                   }
                  </span>
                </p>
              </div>
            </article>
            <img
              src={post?.frontmatter?.coverUrl}
              alt="blog2"
              style={{ width: "100%", height: "371px" }}
              className="!rounded-[20px] !object-cover"
            />
          </section>
          {/* //!Photo & Publication details section -- end */}
          <p className="!px-4 single_blog_p">
            {post?.frontmatter?.description}
          </p>
          {/* //!singleBlog prop changes some style in subscriber component */}
          <Subscribe singleBlog={true} />
          <div
            dangerouslySetInnerHTML={{ __html: post?.html }}
            className="blog-content"
          ></div>
          {/* //!Article Tags Section Start */}
          <div className="!flex !flex-wrap !gap-x-2 !gap-y-3 !justify-center !mt-10 !mb-[75px] !px-4 article_tags_container">
            {post?.frontmatter?.tags.map((tag, i) => (
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
        <LatestPosts />
        {/* //! ------Latest-Post Container End----- */}
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostsWithTag($id: String = "") {
    allMarkdownRemark(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            description
            coverUrl
            author
            authorImg
            authorByline
          }
          fields {
            slug
          }
          excerpt
          html
        }
      }
    }
  }
`

export default SingleBlog
