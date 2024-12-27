import axios from 'axios'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'


interface searchContent {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
interface searchType {
  category?: string,
  _id?: string,
  Product_Name?: string,
  Description?: string,

}

const Search: React.FC<searchContent> = ({ search, setSearch }) => {

  const apiurl = import.meta.env.VITE_API_URL

  const navigate = useNavigate()
  const [catogeryEnnum, setCategoryEnnum] = useState<searchType[]>([])
  const [NavigateIndex, setNavigateIndex] = useState<number>(0)

  ///For Infinite Scroll
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)


  // const catogerylist = [
  //   { category: "Electronics" },
  //   { category: "Computers" },
  //   { category: "Wearables" },
  //   { category: "Accessories" },
  //   { category: "Health" },
  //   { category: "Footwear" },
  //   { category: "Kitchen" },
  //   { category: "Gaming Laptop" },
  //   { category: "Dress" },
  //   { category: "Mobile" },
  //   { category: "Gadgets" },
  //   { category: "Food" },
  //   { category: "Toys" },
  //   { category: "Camara" }
  // ]




  // useEffect(() => {
  //   // let newArrayCato = catogery.filter(item => item.toLowerCase().includes(search.toLowerCase()))
  //   // console.log(
  //   //   newArrayCato
  //   // );

  //   // setCategoryEnnum([...newArrayCato, ...catogery.filter(item => !item.toLowerCase().includes(search.toLowerCase()))])
  // }, [search])


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log();
    e.preventDefault()

    return navigate(`/product/category?q=${catogeryEnnum[0]}`)
  }
  const searchREF = useRef<HTMLInputElement | null>(null)

  const handleBtn = (e: React.KeyboardEvent<HTMLFormElement>) => {

    if (e.key === 'ArrowDown' && NavigateIndex < catogeryEnnum.length - 1) {
      setNavigateIndex(NavigateIndex + 1)

    } else if (e.key === 'ArrowUp' && NavigateIndex > 0) {
      setNavigateIndex(NavigateIndex - 1)
      listUlElement?.current?.scrollTo({ top: 0, behavior: 'smooth' })

    }


  }
  //ul auto Scroll when use Key arrow Up OrDown 

  const listUlElement = useRef<HTMLUListElement | null>(null)

  const abortControllerRef=useRef<AbortController|null>(null)


  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchSearch(e.target.value, 0)
    setPage(0)
    setCategoryEnnum([])
  }

  // setfetch Data when use search  



  const fetchSearch = async (searchItems: string = search, PageIndex: number = page) => {
    try {

      if(abortControllerRef.current)  abortControllerRef.current.abort('new Search Initiated !!')

        abortControllerRef.current=new AbortController();
      const resposne = await axios.get(`${apiurl}/api/product/autosuggest`,{
        params:{search:searchItems,page:PageIndex},
        signal:abortControllerRef.current.signal})

      if (resposne?.data?.product) {
        setCategoryEnnum((prev) => [...prev, ...resposne?.data?.product])
        if (resposne?.data?.product < 10) {
          setHasMore(false)
        } else {
          setPage(PageIndex + 1)
          setHasMore(true)
        }
      }
    } catch (error) {
      if((error as Error).name==='AbortError') {
          console.log('Request aborted:');
        
      }
      console.log(error);
    }
  }

//   const cancelTokenRef = useRef<CancelTokenSource | null>(null);

// const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//   setSearch(e.target.value);
//   setCategoryEnnum([]); // Clear previous results
//   setPage(0); // Reset page index
//   fetchSearch(e.target.value, 0);
// };

// const fetchSearch = async (searchItems: string = search, PageIndex: number = page) => {
//   try {
//     // Cancel any ongoing request before starting a new one
//     if (cancelTokenRef.current) {
//       cancelTokenRef.current.cancel('Request cancelled due to a new search input');
//     }

//     // Create a new cancel token
//     cancelTokenRef.current = axios.CancelToken.source();

//     const response = await axios.get(`${apiurl}/api/product/autosuggest`, {
//       params: { search: searchItems, page: PageIndex },
//       cancelToken: cancelTokenRef.current.token, // Attach cancel token to the request
//     });

//     console.log(response.data.product);

//     if (response?.data?.product) {
//       setCategoryEnnum((prev) => [...prev, ...response?.data?.product]);
//       if (response?.data?.product.length < 10) {
//         setHasMore(false);
//       } else {
//         setPage(PageIndex + 1);
//         setHasMore(true);
//       }
//     }
//   } catch (error) {
//     if (axios.isCancel(error)) {
//       console.log('Request cancelled:', error.message);
//     } else {
//       console.log(error);
//     }
//   }
// };
  return (
    <form onSubmit={handleSubmit} onKeyDown={handleBtn} className='relative w-full'>

      <input ref={searchREF} type="text" id='search' value={search} onChange={inputChangeHandler} placeholder='Search Brands,Products and More ' className='p-3 rounded-md  w-screen outline-none border-none bg-[#f0f5ff]' />
      {search && <ul ref={listUlElement} id="scrollableULDiv"
        className='overflow-y-scroll h-[200px] w-full hide-side-bar flex flex-col bg-white absolute gap-2 p-2 opacity'>
        <InfiniteScroll

          dataLength={catogeryEnnum?.length}
          hasMore={hasMore}
          next={fetchSearch}
          scrollableTarget={'scrollableULDiv'}
          loader={<h1 className='text-sm font-semibold text-gray-500 ' >loading</h1>}
        >

          {catogeryEnnum.map((item, index) =>

            <li onClick={() => navigate(`${item._id ? `/product?id=${item._id}` : `/product/category?q=${item.category}`}`)} key={index} className={`text-sm font-semibold text-gray-500 ps-10 cursor-pointer hover:text-gray-900 ${(item?.Product_Name?.toLowerCase()?.includes(search.toLowerCase()) || item?.Description?.toLowerCase()?.includes(search.toLowerCase()) || item?.category?.toLowerCase()?.includes(search.toLowerCase())) && 'text-gray-900'} ${NavigateIndex === index && "bg-gray-300"}`}>{item.Product_Name ?? item.category}</li>
          )}
        </InfiniteScroll>
      </ul>
      }
    </form>

  )
}

export default Search
