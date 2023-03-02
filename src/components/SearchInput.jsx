import React from 'react'

export default function SearchInput(props) {

  const { handleSearchValue } = props;

  const handleChange = (e) => {
    handleSearchValue(e.target.value)
  }

  return (
    <div>
      <input type="text" name="search" onChange={handleChange} placeholder="What are you looking for?" />
    </div>
  )
}
