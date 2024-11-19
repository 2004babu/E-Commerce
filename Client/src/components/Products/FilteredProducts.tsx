import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../Context/authContextPrivider';
import axios from 'axios';
import ListProducts from './ListProducts';


import { productType } from '../utils/Types'; 


const FilteredProducts = () => {
    const navigate=useNavigate()
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHaseMore] = useState<boolean>(true)
    const { setError, user } = useAuthContext()
    const [loading, setLoading] = useState<boolean>(false)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery()

    const [Product, setProduct] = useState<productType[]>([])

    useEffect(() => {

        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        const apiurl = import.meta.env.VITE_API_URL;
        setLoading(true)
        try {
            const response = await axios.get(`${apiurl}/api/product/filter/?category=${query.get('q')}&page=${page}`, { withCredentials: true })
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

        } finally {
            setLoading(false)
        }
    }
    const handleLike = async (e: React.MouseEvent<HTMLElement, MouseEvent>, productId: string) => {
        const targetClassList = e.currentTarget.classList;
        const apiurl = import.meta.env.VITE_API_URL;

        setLoading(true);
        try {
            const response = await axios.get(
                `${apiurl}/api/product/filter?likeId=${productId}`,
                { withCredentials: true }
            );
            console.log(response);
            if (response.data.product) {
                // setProduct(response.data.product);
            }
        } catch (error) {
            console.log(error);
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }

        // Toggle class after async operation
        if (targetClassList.contains('fa-regular')) {
            console.log('solid');
            targetClassList.add('fa-solid', 'text-red-500');
            targetClassList.remove('fa-regular');
        } else {
            console.log('regular');
            targetClassList.add('fa-regular');
            targetClassList.remove('fa-solid', 'text-red-500');
        }
    };



    const handleShare = (productId: string) => {
        if (navigator) {
            try {
                navigator.share({
                    title: 'Product link!',
                    url: `${window.location.origin}/product/${productId}`,
                    // text:'kjfbfd,fdmfvdhf,dj',

                })

            } catch (error) {

                console.log(error);
                setError((error as Error).message)
            }
        }
    }

    const filterEndMSG:React.ReactNode=<div onClick={()=>navigate('/',{state:{msg:"from filter "}})} className='ms-3 select-none cursor-pointer w-fit h-[300px] flex  justify-center items-center '>
    <div className='bg-gray-400 p-3 rounded-full flex  justify-center items-center gap-3'>
      <i className='fa-solid fa-arrow-right'></i>
      view all
    </div>
  </div>


    return (
        <div id='filteredProducts' className='w-screen h-screen p-2 '>
            {Product.length > 0 && <ListProducts  Rating={false} endMSG={filterEndMSG} className="flex flex-row p-2 mt-[65px]  justify-start items-start gap-3 flex-wrap" scrollFunc={fetchProduct} haseMore={hasMore} setProduct={setProduct} Product={Product} />}
        </div>

    )
}

export default FilteredProducts
