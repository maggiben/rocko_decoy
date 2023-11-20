import * as React from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import slugify from '@sindresorhus/slugify'
import SearchField from '../SearchField/SearchField'

function BlogsCategories({ selectCategory, setSelectCategory }) {
  const [query, setQuery] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleInputChange = event => {
    setQuery(event.target.value)
    setSubmitted(false)
  }
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setSubmitted(true)
      navigate(`/learn/search?query=${query}`, { state: { query } })
    }
  }

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

  const tags = data?.allMarkdownRemark?.edges.map(tag => ({
    id: tag.node.id,
    tag: tag.node.frontmatter?.tags[0],
  }))

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

  // console.log(uniqueTagsArray)

  return (
    <section className="tags_container_parent">
      <div className="tags_container">
        <div className="!space-x-2 !order-2 !flex !flex-wrap !justify-center !gap-y-3 tags_container_tags">
          <button
            type="button"
            // to={`/${mainPath}`}
            key="all"
            className={`tags_container_tags_buttons ${
              selectCategory.id === 'all'
                ? 'tags_container_tags_buttons_select'
                : 'tags_container_tags_buttons_unselect'
            }`}
            onClick={() =>
              setSelectCategory(prev => ({
                ...prev,
                id: 'all',
                name: 'All',
                hash: '',
              }))
            }
          >
            All
          </button>
          {uniqueTagsArray.length > 0 &&
            uniqueTagsArray.map(tag => {
              const path = slugify(tag?.tag)

              return (
                <button
                  type="button"
                  key={tag?.id}
                  className={`tags_container_tags_buttons ${
                    selectCategory.hash === path
                      ? 'tags_container_tags_buttons_select'
                      : 'tags_container_tags_buttons_unselect'
                  }`}
                  onClick={() =>
                    setSelectCategory(prev => ({
                      ...prev,
                      id: tag?.id,
                      name: tag?.tag,
                      hash: path,
                    }))
                  }
                >
                  {tag?.tag}
                </button>
              )
            })}
        </div>
        <SearchField
          handleInputChange={handleInputChange}
          query={query}
          handleKeyPress={handleKeyPress}
          submitted={submitted}
        />
      </div>
    </section>
  )
}

export default BlogsCategories
