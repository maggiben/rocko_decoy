import * as React from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { useStaticQuery, graphql } from "gatsby"

/* const blogCategories = [
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
] */

const BlogsCategories = ({ selectCategory, setSelectCategory }) => {
  const [tags, setTags] = React.useState([])

  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  React.useEffect(() => {
    const filteredTags = data.allMarkdownRemark.edges.map(tag => {
      return tag.node
    })
    setTags(filteredTags)
  }, [data.allMarkdownRemark.edges])
  return (
    <section className="!pt-10 !pb-16 !container !mx-auto !px-4 tags_container_parent">
      <div className="!flex !flex-col !items-center !justify-center  !gap-y-5 tags_container">
        <div className="!space-x-2 !order-2 !flex !flex-wrap !justify-center !gap-y-3 tags_container_tags">
          
          {tags.length > 0 &&
            tags.map(tag => (
              <button
                key={tag?.id}
                className={`!py-[10px] !px-6 !rounded-3xl !border-[1px] !border-[#E2E2E2] !font-[500] !text-sm ${
                  selectCategory.id === tag?.id
                    ? "text-white bg-[#0E2A32]"
                    : "text-black bg-transparent"
                }`}
                onClick={() =>
                  setSelectCategory(prev => ({
                    ...prev,
                    id: tag?.id,
                    name: tag?.frontmatter?.tags[0],
                  }))
                }
              >
                {tag?.frontmatter?.tags[0]}
              </button>
            ))}
        </div>
        <div className="!w-full !py-[10px] !px-4 !flex !items-center !gap-x-2 !border-[1px] !border-[#E2E2E2] !rounded-3xl !order-1 tags_container_search_input">
          <BiSearchAlt2 className="!text-2xl" />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            id="search"
            className="!w-full !text-sm !placeholder:text-[#545454] !p-0 !border-0"
          />
        </div>
      </div>
    </section>
  )
}

export default BlogsCategories
