import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'


interface searchContent {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<searchContent> = ({ search, setSearch }) => {


  const navigate = useNavigate()
  const [catogeryEnnum, setCategoryEnnum] = useState<string[]>([])
  const [NavigateIndex, setNavigateIndex] = useState<number>(0)
  const catogery = [
    "Electronics",
    "Computers",
    "Wearables",
    "Accessories",
    "Health",
    "Footwear",
    "Kitchen",
    "Gaming Laptop",
    "Dress",
    "Mobile",
    "Gadgets",
    "Food",
    "Toys",
    "Camara",
  ]

  
  

  useEffect(() => {
    let newArrayCato = catogery.filter(item => item.toLowerCase().includes(search.toLowerCase()))
    console.log(
      newArrayCato
    );

    setCategoryEnnum([...newArrayCato, ...catogery.filter(item => !item.toLowerCase().includes(search.toLowerCase()))])
  }, [search])


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log();
    e.preventDefault()

    return navigate(`/product/category?q=${catogeryEnnum[0]}`)
  }
  const searchREF = useRef<HTMLInputElement | null>(null)
  
  const handleBtn = (e: React.KeyboardEvent<HTMLFormElement>) => {
    
    if (e.key==='ArrowDown'&&NavigateIndex<catogeryEnnum.length-1) {
      setNavigateIndex(NavigateIndex+1)

    }else if(e.key==='ArrowUp'&&NavigateIndex>0){
      setNavigateIndex(NavigateIndex-1)
      listUlElement?.current?.scrollTo({top:0,behavior:'smooth'})    

    }


  }
  //ul auto Scroll when use Key arrow Up OrDown 
  const listUlElement = useRef<HTMLUListElement | null>(null)

  // const handleULScroll = (e: React.UIEvent<HTMLUListElement>) => {
  //   onScroll={handleULScroll}
  // }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleBtn} className='relative w-full'>

      <input ref={searchREF} type="text" id='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Brands,Products and More ' className='p-3 rounded-md  w-screen outline-none border-none bg-[#f0f5ff]' />
      {search &&
        <ul ref={listUlElement}   className='overflow-y-scroll h-[200px] w-full hide-side-bar flex flex-col bg-white absolute gap-2 p-2 opacity'>{catogeryEnnum.map((item,index) =>

          <li onClick={() => navigate(`/product/category?q=${item}`)} key={item} className={`text-sm font-semibold text-gray-500 ps-10 cursor-pointer hover:text-gray-900 ${item.toLowerCase().includes(search.toLowerCase()) && 'text-gray-900'  } ${NavigateIndex===index&& "bg-gray-300"}`}>{item}</li>
        )}


        </ul>
      }
    </form>

  )
}

export default Search
