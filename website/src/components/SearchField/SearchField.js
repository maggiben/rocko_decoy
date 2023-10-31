import { navigate } from "gatsby"
import React, { useEffect } from "react"
import { BiSearchAlt2 } from "react-icons/bi"

const SearchField = ({ query, handleInputChange,isFocused }) => {
  
  useEffect(() => {
    if (query?.length) {
      navigate(`/learn/search?query=${encodeURIComponent(query)}`)
    }
  }, [query])
  return (
    <div className="tags_container_search_input">
      <BiSearchAlt2 className="tags_container_search_icon" />
      <input
        type="text"
        name="search"
        placeholder="Search..."
        id="search"
        className="tags_container_search_inputfield"
        value={query}
        onChange={handleInputChange}
        onFocus={() =>{
          navigate(`/learn/search?query=`)
        }}
        autoFocus={isFocused}
        
      />
    </div>
  )
}

export default SearchField
