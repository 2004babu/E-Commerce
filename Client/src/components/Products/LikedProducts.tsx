import React, { useEffect, useState } from 'react'
import ListProducts from './ListProducts'
import { useAuthContext } from '../../Context/authContextPrivider'
import axios from 'axios'

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
    Comments: [],
    Ratings: [],
    likedBy: [{ userId: string, _id: string }],
    totalRate:number


}
const LikedProducts = () => {
    const {user,setError}=useAuthContext()
    const [Product, setProduct] = useState<productType[]>([])


    useEffect(()=>{
        const fetchLikedProducts=async()=>{
            const apiurl =import.meta.env.VITE_API_URL
try {
    const response =await axios.get(`${apiurl}/api/product/liked/${user._id}`,{withCredentials:true})
    console.log(response);
    
    if (response.data.product) {
        setProduct(response.data.product);
    }
} catch (error) {
    console.log(error);
    setError((error as Error).message)
    
}
        }
        fetchLikedProducts()
    },[user])
  return (
    <div className='w-screen h-screen p-2 '>
{  Product.length>0&&  <ListProducts Product={Product} setProduct={setProduct} />}
 </div>
  )
}

export default LikedProducts
