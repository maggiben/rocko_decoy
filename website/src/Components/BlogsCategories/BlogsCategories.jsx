import * as React from "react"
import { BiSearchAlt2 } from "react-icons/bi";



const blogCategories = [
  {
    category: "All",
  },
  {
    category: "Category-1",
  },
  {
    category: "Category-2",
  },
  {
    category: "Category-3",
  },
  {
    category: "Category-4",
  },
  {
    category: "Category-5",
  },
];

const BlogsCategories = ({ selectCategory, setSelectCategory }) => {
  return (
    <section className="pt-10 pb-16 container mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-5 md:gap-y-0">
        <div className="space-x-2 order-2 md:order-1 flex flex-wrap justify-center gap-y-3 md:gap-y-0">
          {blogCategories.map(({ category }, i) => (
            <button
              key={i}
              className={`py-[10px] px-6 rounded-3xl border-[1px] border-[#E2E2E2] font-[500] text-sm ${
                selectCategory === category
                  ? "text-white bg-[#0E2A32]"
                  : "text-black bg-transparent"
              }`}
              onClick={() => setSelectCategory((prev) => (prev = category))}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="md:max-w-[280px] w-full py-[10px] px-4 flex items-center gap-x-2 border-[1px] border-[#E2E2E2] rounded-3xl order-1 md:order-2">
          <BiSearchAlt2 className="text-2xl" />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            id="search"
            className="w-full text-sm placeholder:text-[#545454]"
          />
        </div>
      </div>
    </section>
  );
};

export default BlogsCategories;