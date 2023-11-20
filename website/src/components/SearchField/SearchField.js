import { navigate } from "gatsby"
import React from "react"
import { BiSearchAlt2 } from "react-icons/bi"

const SearchField = ({ query, handleInputChange ,submitted,handleKeyPress}) => {

  const handleSearch = () => {
    navigate(`/learn/search?query=${query}`, { state: { query } })
  }
 
  return (
    <div className="tags_container_search_input">
      <BiSearchAlt2 onClick={handleSearch} className="tags_container_search_icon" />
      <input
        type="text"
        name="search"
        placeholder="Search..."
        id="search"
        className="tags_container_search_inputfield"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default SearchField
