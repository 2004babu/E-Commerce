import React, { useEffect, useState } from 'react'

import HomeGategory from '../static/HomeGategory'
import Search from '../static/Search'
import AutoMoveTab from '../static/AutoMoveTab'
import RelatableProducts from '../Admin/Products/RelatableProducts'
import Recent_Products from '../Admin/Products/Recent_Products'
import { productType } from '../utils/Types'
import axios from 'axios'
import { useAuthContext } from '../../Context/authContextPrivider'

const Home = () => {
  const [search, setSearch] = useState<string>('')

  const apiurl = import.meta.env.VITE_API_URL

  const { setError, user } = useAuthContext()


  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => [
    await Promise.all([fetchRecentView(), fetchRelatedProduct()])
  ]

  ///////recent  Products
  const [page, setPage] = useState<number>(0)
  const [ViewhasMore, setViewHaseMore] = useState<boolean>(true)
  const [ViewProduct, setViewProduct] = useState<productType[]>([])


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
  const handleViewAll = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    console.dir(e, 'feature will be add');

  }

  //this one For endof The listProducts
  const listEndMSG: React.ReactNode = <div onClick={handleViewAll} className=' w-48 h-[300px] flex  justify-center items-center '>
    <div className='bg-gray-400 p-3 rounded-full flex  justify-center items-center gap-3'>
      <i className='fa-solid fa-arrow-right'></i>
      view all
    </div>
  </div>


  //relatedProducts

  const [RelatedProduct, setRelatedProduct] = useState<productType[]>([])
  const [Relatedpage, setRelatedpage] = useState<number>(0)
  const [RelatedhasMore, setRelatedHaseMore] = useState<boolean>(true)


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




  return (
    <>

      <div className='flex flex-col w-screen h-fit gap-3 mt-[62px]'>
        <Search search={search} setSearch={setSearch} />
        <HomeGategory />
        <AutoMoveTab />
        <RelatableProducts endMSG={listEndMSG} setRelatedProduct={setRelatedProduct} RelatedhasMore={RelatedhasMore} fetchRelatedProduct={fetchRelatedProduct} RelatedProduct={RelatedProduct} />

        { user._id&&<Recent_Products endMSG={listEndMSG} RecentProduct={ViewProduct} RecenthasMore={ViewhasMore} fetchRecentProduct={fetchRecentView} setRecentProduct={setViewProduct} />}

      </div>
    </>
  )
}

export default Home
