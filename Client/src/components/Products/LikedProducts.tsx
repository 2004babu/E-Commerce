import React, { useEffect, useState } from 'react'
import ListProducts from './ListProducts'
import { useAuthContext } from '../../Context/authContextPrivider'
import axios from 'axios'

import { productType } from '../utils/Types'


const LikedProducts = () => {
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHaseMore] = useState<boolean>(true)
    const { user, setError } = useAuthContext()
    const [Product, setProduct] = useState<productType[]>([])

    // const navigate = useNavigate()
    useEffect(() => {
        fetchLikedProducts()
    }, [user])

    const fetchLikedProducts = async () => {
        const apiurl = import.meta.env.VITE_API_URL
        try {
            const response = await axios.get(`${apiurl}/api/product/liked/${user._id}/?page=${page}`, { withCredentials: true })
            console.log(response);

            if (response.data.product) {
                setProduct((prev) => [...prev, ...response.data.product]);
                setPage(page + 1)
                setHaseMore(true)
            } if (response.data.product.length < 10) {
                setHaseMore(false)
            }
        } catch (error) {
            console.log(error);
            setError((error as Error).message)

        }


    }
        const handleViewAll = async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()


        }

        //this one For endof The listProducts
        const listEndMSG: React.ReactNode = <div onClick={handleViewAll} className=' w-48 h-[300px] flex  justify-center items-center '>
            <div className='bg-gray-400 p-3 rounded-full flex  justify-center items-center gap-3'>
                <i className='fa-solid fa-arrow-right'></i>
                view Other
            </div>
        </div>

    return (
        <div id='likedproducts' className='w-full h-full p-2 mt-[65px] '>
            {Product.length > 0 && <ListProducts className="flex flex-row p-2  justify-start items-start gap-3 flex-wrap" endMSG={listEndMSG} scrollFunc={fetchLikedProducts} haseMore={hasMore} Product={Product} setProduct={setProduct} />}
        </div>
    )
}

export default LikedProducts
