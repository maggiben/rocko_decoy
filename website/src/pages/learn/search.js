// src/templates/search.js
import React, { useState, useEffect } from "react"
import { Link, graphql, navigate} from "gatsby"
import SearchField from "../../components/SearchField/SearchField"
import Layout from "../../components/layout"
import { BiChevronRight } from "react-icons/bi"
const SHOW_BLOG = process.env.FEATURE_FLAG_SHOW_BLOG === 'true';
const SearchPage = ({ data,location }) => {

  const posts = data.allMarkdownRemark.edges
  
  const [query, setQuery] = useState(location?.state?.query || "")
  const [results, setResults] = useState([])

  const handleBackButton = () => {
    navigate(-1) || navigate("/learn")
  }

  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (SHOW_BLOG) {
      const delayDebounceFn = setTimeout(() => {
        if (query?.length) {
          const regex = new RegExp(query, "gi")
          const filteredPosts = posts.filter(post => {
            return (
              post.node.frontmatter.description.match(regex)||  post.node.frontmatter.title.match(regex)
            )
          })
          setResults(filteredPosts)
        } else {
          setResults([])
        }
      }, 1000)
  
      return () => clearTimeout(delayDebounceFn)
    }
  }, [query])

  if (!SHOW_BLOG) {
    return null
  }

  // console.log(results)
  return (
    <Layout>
       <section className="tags_container_parent">
        <div className="tags_container">
        <button className="blog_home_button" onClick={handleBackButton}>
            <BiChevronRight className="blog_home_button_icon" />{" "}
            <span>Back</span>
          </button>
          <SearchField
            handleInputChange={handleInputChange}
            query={query}
            isFocused={true}
          />
        </div>
      </section>
      <section className={`!py-16`}>
        <div className="category_blogs_container space-y-5">
          {results.length > 0 &&
            results.map(({ node }) => (
              <Link
                to={`/learn/${node.fields.slug}`}
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
