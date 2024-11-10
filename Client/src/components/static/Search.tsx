import React from 'react'


interface searchContent {
  search:string,
  setSearch:React.Dispatch<React.SetStateAction<string>>
}

const Search:React.FC<searchContent> = ({search,setSearch}) => {





  return (
      <input type="text" id='search' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search Brands,Products and More ' className='p-3 rounded-md  w-screen outline-none border-none bg-[#f0f5ff]' />
 
  )
}

export default Search
