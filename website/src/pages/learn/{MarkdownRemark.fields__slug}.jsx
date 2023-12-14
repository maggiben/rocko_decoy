import * as React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { FaClipboardList, FaClipboardCheck } from 'react-icons/fa'
import { Link, graphql, navigate } from 'gatsby'
import slugify from '@sindresorhus/slugify'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share'
import FbIcon from '../../images/fb-icon.svg'
import XIcon from '../../images/x-icon.svg'
import LinkedinIcon from '../../images/linkedin-icon.svg'
import WhatsappIcon from '../../images/whatsapp-icon.svg'
import TelegramIcon from '../../images/telegram-svgrepo-com.svg'
import Seo from '../../components/seo'
import LatestPosts from '../../components/HomeBlogs/LatestPosts'
import Subscribe from '../../components/Subscribe/Subscribe'
import Layout from '../../layout'

export function Head({ data }) {
  const post = data.allMarkdownRemark.edges[0]?.node
  return (
    <Seo
      authorTwitter={post?.frontmatter?.authorTwitter}
      image={post?.frontmatter?.coverUrl}
      title={post?.frontmatter?.title}
      description={post?.frontmatter?.description}
    />
  )
}

function SingleBlog({ data }) {
  // console.log("SingleBlog", data)
  const [shareUrl, setShareUrl] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const post = data.allMarkdownRemark.edges[0]?.node

  const socialIcons = [
    {
      Icon: (
        <div className="!h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center">
          <FacebookShareButton url={shareUrl}>
            <FbIcon alt="social-icon" height={16} width={16} />
          </FacebookShareButton>
        </div>
      ),
    },
    {
      Icon: (
        <div className="!h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center">
          <TwitterShareButton url={shareUrl}>
            <XIcon alt="social-icon" height={16} width={16} />
          </TwitterShareButton>
        </div>
      ),
    },
    {
      Icon: (
        <div className="!h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center">
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon alt="social-icon" height={16} width={16} />
          </LinkedinShareButton>
        </div>
      ),
    },
    {
      Icon: (
        <div className="!h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center">
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon alt="social-icon" height={16} width={16} />
          </TelegramShareButton>
        </div>
      ),
    },
    {
      Icon: (
        <div className=" md:!hidden  !h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center ">
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon alt="social-icon" height={16} width={16} />
          </WhatsappShareButton>
        </div>
      ),
    },
  ]

  const handleCopyButton = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
  }

  const handleBackButton = () => {
    // eslint-disable-next-line no-unused-expressions
    navigate(-1) || navigate('/learn')
  }

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])

  return (
    <Layout>
      <>
        {/* //!Share to social-media section -- start */}
        <section className="share_social_media_container">
          <button
            type="button"
            className="blog_home_button"
            onClick={handleBackButton}
          >
            <BiChevronRight className="blog_home_button_icon" />{' '}
            <span>Back</span>
          </button>
          <div className="!flex !space-x-2 !items-center">
            <p className="!text-sm !pr-4 !border-r-[1px] !border-[#E2E2E2] !mr-4 !text-black">
              Share
            </p>
            {socialIcons.map(({ Icon }) => Icon)}
            {/* copy to clipboard button */}
            <button
              type="button"
              className="!h-8 !w-8 !rounded-full !bg-[#EEE] !flex !justify-center !items-center"
              onClick={handleCopyButton}
            >
              {copied ? (
                <FaClipboardCheck className="!text-[#2C3B8D] !text-lg" />
              ) : (
                <FaClipboardList className="!text-[#2C3B8D] !text-lg" />
              )}
            </button>
          </div>
        </section>
        {/* //!Share to social-media section -- end */}
        {/* //!Blog section -- start */}
        <main className="single_blog_container_parent">
          {/* //!Photo & Publication details section -- start */}
          <section className="single_blog_container">
            <article className="!space-y-2  h-max">
              <p className="!text-[#2C3B8D] !text-sm">
                {post?.frontmatter?.tags}
              </p>
              <h1 className="!text-[48px] !leading-[56px] !py-2 !tracking-[0px]">
                {post?.frontmatter?.title}
              </h1>

              <p className="!text-xs !text-[#545454]">
                {post?.frontmatter.date}
              </p>
              <div className="!flex !space-x-3 !items-center !pt-6">
                <a
                  href={
                    post?.frontmatter?.authorTwitter
                      ? `https://x.com/${post?.frontmatter?.authorTwitter}`
                      : '#'
                  }
                >
                  <div
                    className={`!w-10 !h-10 !rounded-full ${
                      !post?.frontmatter.authorImg &&
                      'border-2 !border-blue-700'
                    }`}
                  >
                    {post?.frontmatter.authorImg && (
                      <img
                        src={post?.frontmatter.authorImg}
                        alt="user"
                        height={40}
                        width={40}
                        className="!rounded-full !object-cover !w-full !h-full"
                      />
                    )}
                  </div>

                  <p className="!text-sm">
                    {post?.frontmatter?.author}
                    <span className="!text-xs !text-[#545454] !block">
                      {post?.frontmatter?.authorByline}
                    </span>
                  </p>
                </a>
              </div>
            </article>
            <img
              src={post?.frontmatter?.coverUrl}
              alt="blog2"
              style={{ width: '100%', height: '371px' }}
              className="!rounded-[20px] !object-cover"
            />
          </section>
          {/* //!Photo & Publication details section -- end */}
          <p className="single_blog_p">{post?.frontmatter?.description}</p>
          {/* //!singleBlog prop changes some style in subscriber component */}
          <Subscribe singleBlog />
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post?.html }}
            className="blog-content"
          />
          {/* //!Article Tags Section Start */}
          <div className="article_tags_container">
            {post?.frontmatter?.tags.map(tag => {
              const hash = slugify(tag)
              return (
                <Link
                  key={hash}
                  to={`/learn/#${hash}`}
                  className="!py-[10px] !px-6 !rounded-3xl !border-[1px] !border-[#E2E2E2] !font-[500] !text-sm !text-black !bg-[#EEE]"
                >
                  {tag}
                </Link>
              )
            })}
          </div>
          {/* //!Article Tags Section End */}
          <h2 className="!text-2xl !font-bold !px-4 !mb-4"> What is Rocko?</h2>

          <p className="single_blog_p">
            Rocko is a soon-to-launch platform that enables crypto owners to
            easily and securely borrow from popular DeFi protocols like Compound
            and get funds in minutes — no experience needed! Use the loan to
            purchase real estate, pay down higher-rate debt, make investments,
            and much more.
          </p>
          <p className="single_blog_p">
            Rocko also provides a loan management dashboard and tools like text
            and email alerts to help manage your loan and collateral. The Rocko
            team consists of crypto enthusiasts who are ready to help you with
            any questions you may have. You can join the Rocko{' '}
            <Link
              to="https://discord.gg/AhtVvhDRG4"
              className="underline italic"
            >
              {' '}
              Discord server
            </Link>
            , follow our{' '}
            <Link
              to="https://twitter.com/rockodefi"
              className="underline italic"
            >
              {' '}
              Twitter account
            </Link>
            , or visit our{' '}
            <Link to="https://rocko.co/learn" className="underline italic">
              {' '}
              resource center
            </Link>{' '}
            to learn more about DeFi borrowing.
          </p>
          <Subscribe singleBlog />
          <p className="single_blog_p">
            Join{' '}
            <Link to="https://rocko.co" className="underline italic">
              Rocko&apos;s waitlist
            </Link>{' '}
            today and be the first to be notified when they launch! You can also
            learn more on Rocko&apos;s homepage.
          </p>
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
            authorTwitter
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
