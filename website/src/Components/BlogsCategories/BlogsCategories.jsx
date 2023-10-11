import * as React from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { useStaticQuery, graphql } from "gatsby"
import slugify from "slugify"

const BlogsCategories = ({ selectCategory, setSelectCategory }) => {
  // const [tags, setTags] = React.useState([])

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

  const tags = data?.allMarkdownRemark?.edges.map(tag => {
    return {
      id: tag.node.id,
      tag: tag.node.frontmatter?.tags[0],
    }
  })

  const uniqueTagsMap = new Map()

  tags.forEach(item => {
    const { id, tag } = item

    uniqueTagsMap.set(tag, id)
  })
  // console.log(uniqueTagsMap)
  const uniqueTagsArray = Array.from(uniqueTagsMap, ([tag, id]) => ({
    tag,
    id,
  }))

  return (
    <section className="tags_container_parent">
      <div className="tags_container">
        <div className="!space-x-2 !order-2 !flex !flex-wrap !justify-center !gap-y-3 tags_container_tags">
          <button
            // to={`/${mainPath}`}
            key={"all"}
            className={`tags_container_tags_buttons ${
              selectCategory.id === "all"
                ? "tags_container_tags_buttons_select"
                : "tags_container_tags_buttons_unselect"
            }`}
            onClick={() =>
              setSelectCategory(prev => ({
                ...prev,
                id: "all",
                name: "All",
              }))
            }
          >
            All
          </button>
          {uniqueTagsArray.length > 0 &&
            uniqueTagsArray.map(tag => {
              const path = slugify(tag?.tag, {
                trim: true,
                lower: true,
              })
              let mainPath = ""
              if (path === "defi-borrowing-and-lending") {
                mainPath = "de-fi-borrowing-and-lending"
              } else if (path === "rocko-faqs") {
                mainPath = "rocko-fa-qs"
              } else if (path === "crypto-and-defi") {
                mainPath = "crypto-and-de-fi"
              } else {
                mainPath = "blog"
              }

              return (
                <button
                  // to={`/${mainPath}`}
                  key={tag?.id}
                  className={`tags_container_tags_buttons ${
                    selectCategory.id === tag?.id
                      ? "tags_container_tags_buttons_select"
                      : "tags_container_tags_buttons_unselect"
                  }`}
                  onClick={() =>
                    setSelectCategory(prev => ({
                      ...prev,
                      id: tag?.id,
                      name: tag?.tag,
                    }))
                  }
                >
                  {tag?.tag}
                </button>
              )
            })}
        </div>
        <div className="tags_container_search_input">
          <BiSearchAlt2 className="tags_container_search_icon" />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            id="search"
            className="tags_container_search_inputfield"
          />
        </div>
      </div>
    </section>
  )
}

export default BlogsCategories
