import * as React from "react"
import image2 from "../../images/Image-2.png";
import user from "../../images/blog-user.png";

const HeroBlog = () => {
  return (
    <section className="container mx-auto mb-16 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10 px-4 md:px-0">
      <div className="basis-3/5">
        <img
          src={image2}
          alt="blog2"
          style={{ width: "100%", height: "371px" }}
          className="rounded-[20px] object-cover"
        />
      </div>
      <article className="basis-2/5 space-y-2  self-center h-max">
        <p className="text-[#545454] text-sm">Category</p>
        <h2 className="text-[48px] leading-[56px] py-2">
          A blog post title will go here.
        </h2>
        <p>A description of the article will go here</p>
        <p className="text-xs text-[#545454]">Sept 24, 2023</p>
        <div className="flex space-x-3 items-center pt-2">
          <img
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
    </section>
  );
};

export default HeroBlog;