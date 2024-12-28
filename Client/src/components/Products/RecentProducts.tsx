import React, { useEffect, useState } from 'react'
import Recent_Products from '../Admin/Products/Recent_Products'
import { productType } from '../utils/Types'
import { useAuthContext } from '../../Context/authContextPrivider'
import axios from 'axios'
import Loading from '../static/Loading'

const RecentProducts = () => {

    ///////recent  Products
    const [page, setPage] = useState<number>(0)
    const [ViewhasMore, setViewHaseMore] = useState<boolean>(true)
    const [ViewProduct, setViewProduct] = useState<productType[]>([])


    const { setError, user } = useAuthContext()

    useEffect(() => {
        fetchRecentView()
    }, [])


    const handleViewAll = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        console.dir(e, 'feature will be add');

    }

    const apiurl = import.meta.env.VITE_API_URL


    const fetchRecentView = async () => {
        try {
            if (!user._id) return
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

    //this one For endof The listProducts
    const listEndMSG: React.ReactNode = <div onClick={handleViewAll} className=' w-48 h-[300px] flex  justify-center items-center '>
        <div className='bg-gray-400 p-3 rounded-full flex  justify-center items-center gap-3'>
            <i className='fa-solid fa-arrow-right'></i>
            view all
        </div>
    </div>


console.log(!user._id && ViewProduct.length > 0)
    return (
        <div className='h-screen w-screen flex justify-center items-center '>
            {(user._id && ViewProduct.length > 0) ? <Recent_Products endMSG={listEndMSG} RecentProduct={ViewProduct} RecenthasMore={ViewhasMore} fetchRecentProduct={fetchRecentView} setRecentProduct={setViewProduct} /> : <Loading />}
        </div>
    )
}

export default RecentProducts
