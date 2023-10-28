import React from "react";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";
import image1 from "@/assets/Blogs/Image-1.png";
import image2 from "@/assets/Blogs/Image-2.png";
import image3 from "@/assets/Blogs/Image-3.png";
import user from "@/assets/Blogs/blog-user.png";
import Subscribe from "@/components/subscribe/Subscribe";
import BlogsContainer from "@/components/blogsContainer/BlogsContainer";

const dummyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec dignissim magna. Aliquam volutpat fringilla leo sit amet dignissim. Fusce id dapibus orci. Integer a eros turpis. Praesent vitae laoreet lectus. Phasellus nulla lacus, mattis at mauris nec, commodo tincidunt dui. Aliquam mollis ex risus, non tincidunt eros tempus et. Donec dictum consectetur iaculis. Sed est arcu, hendrerit quis ultricies elementum, tincidunt viverra dolor. Vestibulum cursus ante ac turpis laoreet, ut varius leo porta. Duis mauris enim, venenatis in rhoncus non, ullamcorper sit amet ex. Praesent imperdiet, libero et dignissim iaculis, nunc turpis pharetra ligula, eu pulvinar nunc odio at orci.";

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
];

// *Create an array of blog post objects
const blogDetails = [
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

const SingleBlog = () => {
  return (
    <>
      {/* //!Share to social-media section -- start */}
      <section className="container mx-auto my-10 flex flex-wrap items-center justify-between space-x-2 px-4 md:px-0">
        <button className="px-4 py-2 rounded-3xl text-[#2C3B8D] bg-[#EEE] font-[500] flex items-center">
          <BiChevronRight className="text-3xl inline-block -rotate-180 -mr-1" />{" "}
          <span>Blog Home</span>
        </button>
        <div className="flex space-x-2 items-center max-[452px]:mt-4">
          <p className="text-sm pr-4 border-r-[1px] border-[#E2E2E2] mr-4">
            Share
          </p>
          
        </div>
      </section>
      {/* //!Share to social-media section -- end */}
      {/* //!Blog section -- start */}
      <main className="max-w-[660px] w-full mx-auto">
        {/* //!Photo & Publication details section -- start */}
        <section className="mb-16 space-y-14 px-4 md:px-0">
          <article className="space-y-2  h-max">
            <p className="text-[#2C3B8D] text-sm">Category</p>
            <h2 className="text-[48px] leading-[56px] py-2">
              A blog post title will go here.
            </h2>
            <p>A description of the article will go here</p>
            <p className="text-xs text-[#545454]">Sept 24, 2023</p>
            <div className="flex space-x-3 items-center pt-6">
              <Image
                src={user}
                alt="user"
                height={40}
                width={40}
                className="rounded-full object-cover"
              />
              <p className="text-sm">
                Vince DePalma{" "}
                <span className="text-xs text-[#545454] block">Co-Founder</span>
              </p>
            </div>
          </article>
          <Image
            src={image2}
            alt="blog2"
            style={{ width: "100%", height: "371px" }}
            className="rounded-[20px] object-cover"
          />
        </section>
        {/* //!Photo & Publication details section -- end */}
        <p className="px-4 md:px-0">{dummyText}</p>
        {/* //!singleBlog prop changes some style in subscriber component */}
        <Subscribe singleBlog={true} />
        <p className="px-4 md:px-0">{dummyText}</p>
        <h1 className="my-6 text-[28px] px-4 md:px-0">Subhead</h1>
        <p className="px-4 md:px-0">{dummyText}</p>
        <div className="flex flex-wrap gap-x-2 gap-y-3 md:gap-y-0 justify-center md:justify-start mt-10 mb-[75px] px-4 md:px-0">
          {tags.map(({ tag }, i) => (
            <button
              key={i}
              className="py-[10px] px-6 rounded-3xl border-[1px] border-[#E2E2E2] font-[500] text-sm text-black bg-[#EEE]"
            >
              {tag}
            </button>
          ))}
        </div>
      </main>
      {/* //!Blog section -- end */}
      {/* //! ------Latest-Post Container Start----- */}
      <BlogsContainer
        blogDetails={blogDetails}
        blogsCategory="Latest Posts"
        grayBG="bg-[#F9F9F9]"
      />
      {/* //! ------Latest-Post Container End----- */}
    </>
  );
};

export default SingleBlog;
