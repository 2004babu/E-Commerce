import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../Context/authContextPrivider';
import axios from 'axios';
import { useProductContext } from '../../Context/ProductContext';
import Loading from '../static/Loading';
import ListProducts from './ListProducts';


interface productType {
    _id: string,
    search: string,
    Price: {
        MRP: string,
        Offer: string
    },
    inStock: string,
    category: string,
    description: string,
    imageUrl: string,
    Product_Name: string,
    P_Status: string,
    Comments: [{userId:string,_id:string,comment:string,userName:string,likes:[{userId:string}]}],
    Ratings: [{userId:string,_id:string,Rate:number}],
    likedBy: [{ userId: string, _id: string }],
    totalRate:number,

}

const FilteredProducts = () => {
    const { setError, user } = useAuthContext()
    // const { ProductDetails, setProductDetails } = useProductContext()
    const [loading, setLoading] = useState<boolean>(false)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery()

    const [Product, setProduct] = useState<productType[]>([])

    useEffect(() => {
        const fetchProduct = async () => {
            const apiurl = import.meta.env.VITE_API_URL;
            setLoading(true)
            try {
                const response = await axios.get(`${apiurl}/api/product/filter?category=${query.get('q')}`, { withCredentials: true })
                console.log(response);

                if (response.data.product) {
                    setProduct(response.data.product)
                }
            } catch (error) {
                console.log(error);
                setError((error as Error).message)

            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

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



    return (
        <div className='w-screen h-screen p-2 '>
            {Product.length > 0 && <ListProducts setProduct={setProduct}  Product={Product} />}
        </div>

    )
}

export default FilteredProducts
