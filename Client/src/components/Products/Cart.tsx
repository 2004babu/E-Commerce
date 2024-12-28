import React, { useEffect, useState } from 'react'
import ListProducts from './ListProducts'
import axios from 'axios'
import { useAuthContext } from '../../Context/authContextPrivider'
import RelatableProducts from '../Admin/Products/RelatableProducts'
import Recent_Products from '../Admin/Products/Recent_Products'
import {  useNavigate } from 'react-router-dom'
// import InfiniteScroll from 'react-infinite-scroller'

import { productType } from '../utils/Types'

const Cart = () => {

    const {setError,  user } = useAuthContext()
  

  const navigate=useNavigate()
  const [hasMore, setHaseMore] = useState<boolean>(true)
  const [cartPage, setCartPage] = useState<number>(0)

  const [page, setPage] = useState<number>(0)
  const [ViewhasMore, setViewHaseMore] = useState<boolean>(true)
  const [ViewProduct, setViewProduct] = useState<productType[]>([])

  const [RelatedProduct, setRelatedProduct] = useState<productType[]>([])
  const [Relatedpage, setRelatedpage] = useState<number>(0)
  const [RelatedhasMore, setRelatedHaseMore] = useState<boolean>(true)

  const [Product, setProduct] = useState<productType[]>([])
  const apiurl = import.meta.env.VITE_API_URL
  useEffect(() => {

    if (!user._id) {
      return setError('Con`t Access cart without login !!')
    }

    fetchCart()
    fetchRecentView()
    fetchRelatedProduct()
  }, [])

  const fetchCart = async () => {
    try {

      const response = await axios.get(`${apiurl}/api/product/cart/?page=${cartPage}`, { withCredentials: true })


      if (response.data?.product) {
        setProduct((prev) => [...prev, ...response.data.product]);
        setCartPage(page + 1)
        setHaseMore(true)
      } if (response.data?.product?.length < 10) {
        setHaseMore(false)
      }

    } catch (error) {
      console.log(error);
      setError((error as Error).message)
    } finally {
      // setClear(!clear)
    }
  }
  const fetchRecentView = async () => {
    try {

      const response = await axios.get(`${apiurl}/api/product/getRecentView/?page=${page}`, { withCredentials: true })
      if (response.data.product) {
        setViewProduct((prev) => [...prev, ...response.data.product]);
        setPage(page + 1)
        // scroll element not work while using this row side so no fetch need secound time
        setViewHaseMore(false)
      } if (response?.data?.product?.length < 10) {
        setViewHaseMore(false)
      }

    } catch (error) {
      console.log(error);
      setError((error as Error).message)
    } finally {
      // setClear(!clear)
    }
  }
  //   const handleCart =async (productId: string) => {

  //     if (!productId) return
  //     try {

  //         const response = await axios.post(`${apiurl}/api/product/cart`, {  productId }, { withCredentials: true })

  //         console.log(response);
  //         if (response?.data?.product) {

  //             setProductDetails(response.data.product)
  //         }

  //     } catch (error) {
  //         console.log(error);
  //         setError((error as Error).message)
  //     } finally {
  //         // setClear(!clear)
  //     }

  // }

  const fetchRelatedProduct = async () => {
    const apiurl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiurl}/api/product/getRelatedProducts/?page=${Relatedpage}`, { withCredentials: true })
      console.log(response.data.product);

      if (response.data.product) {
        setRelatedProduct((prev) => [...prev, ...response.data.product]);
        setRelatedpage(Relatedpage + 1)
        // scroll element not work while using this row side so no fetch need secound time

        setRelatedHaseMore(false)
      }
      if (response?.data?.product?.length < 4) {
        setRelatedHaseMore(false)
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message)

    } finally {
      // setLoading(false)
    }
  }

  const handleViewAll = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    console.dir(e);

  }

  //this one For endof The listProducts
  const listEndMSG: React.ReactNode = <div onClick={handleViewAll} className=' w-48 h-[300px] flex  justify-center items-center '>
    <div className='bg-gray-400 p-3 rounded-full flex  justify-center items-center gap-3'>
      <i className='fa-solid fa-arrow-right'></i>
      view Other
    </div>
  </div>
  //this one For cart end msg to viewmore Products
  const cartEndMSG: React.ReactNode = <div onClick={()=>navigate('/',{state:{msg:"from cart"}})} className='ms-3 select-none cursor-pointer w-fit h-[300px] flex  justify-center items-center '>
    <div className='bg-gray-400 p-3 rounded-full flex  justify-center items-center gap-3'>
      <i className='fa-solid fa-arrow-right'></i>
      view other
    </div>
  </div>


  return (
    <div id='cartHead' className='flex flex-col w-full h-full p-2 relative overflow-y-scroll overflow-x-hidden mt-[65px] '>

      {Product && Product.length ?
        <>
        <ListProducts
          className="flex flex-row p-2  justify-start items-start gap-3 flex-wrap"
          scrollFunc={fetchCart}
          haseMore={hasMore}
          Product={Product}
          setProduct={setProduct}
          endMSG={cartEndMSG}
          Rating={false}
        />
        
        <button onClick={()=>{navigate('/place-order?cart=true',{state:{from:location.href}})}} className='bg-yellow-500 px-3 py-2'>BUY CART</button>
</>
        :
        <div className="flex flex-col w-full p-3 font-bold text-xl h-80">
          Your Cart Is Empty
        </div>
      }

      <RelatableProducts endMSG={listEndMSG} setRelatedProduct={setRelatedProduct} RelatedhasMore={RelatedhasMore} fetchRelatedProduct={fetchRelatedProduct} RelatedProduct={RelatedProduct} />

      <Recent_Products endMSG={listEndMSG} RecentProduct={ViewProduct} setRecentProduct={setViewProduct} RecenthasMore={ViewhasMore} fetchRecentProduct={fetchRecentView} />
    </div>
  )
}

export default Cart


{/* <div className="flex flex-col rounded-md justify-center items-center p-2 w-48-h-48 mt-6">
          <div>
          <img src='./image.png' alt="" />

          </div>
          <h1>Product Name</h1>

          <button className='flex justify-cneter items-center px-2 py-1 bg-green-600'> Add Cart</button>
        </div> */}