// src/templates/search.js
import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../Components/Layout/Layout"
import SearchField from "../../components/SearchField/SearchField"

const SearchPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query?.length) {
        const regex = new RegExp(query, "gi")
        const filteredPosts = posts.filter(post => {
          return (
            post.node.frontmatter.title.match(regex) ||
            post.node.frontmatter.description.match(regex)
          )
        })
        setResults(filteredPosts)
      } else {
        setResults(posts)
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  // console.log(results)
  return (
    <Layout>
      <div className="flex items-center justify-end px-10 container mx-auto">
        <SearchField
          handleInputChange={handleInputChange}
          query={query}
          isFocused={true}
        />
      </div>
      <section className={`!py-16`}>
        <div className="category_blogs_container space-y-5">
          {results.length > 0 &&
            results.map(({ node }) => (
              <Link
                to={`/learning-resources/${node.fields.slug}`}
                key={node.id}
                className="block"
              >
                <article className="category_blogs_content">
                  <img
                    src={node.frontmatter.coverUrl}
                    alt="blog3"
                    height={197}
                    className="category_blogs_content_image"
                  />
                  <div className="category_blogs_content_details">
                    <p className="category_blogs_content_details_p_1">
                      {node.frontmatter.tags[0]}
                    </p>
                    <h2 className="category_blogs_content_details_h2_1">
                      {node.frontmatter.title}
                    </h2>
                    <p className="category_blogs_content_details_p_2">
                      {node.frontmatter.description}
                    </p>
                    <p className="category_blogs_content_details_p_3">
                      {node.frontmatter.date}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </section>
    </Layout>
  )
}

export const blogPostWithRegex = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: ASC } }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            description
            coverUrl
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default SearchPage
