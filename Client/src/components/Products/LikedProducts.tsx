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
    Comments: [{userId:string,_id:string,comment:string,userName:string,likes:[{userId:string}]}],
    Ratings: [{userId:string,_id:string,Rate:number}],
    likedBy: [{ userId: string, _id: string }],
    totalRate:number,

}   
const LikedProducts = () => {
    const [page,setPage]=useState<number>(0)
    const [hasMore,setHaseMore]=useState<boolean>(true)
    const {user,setError}=useAuthContext()
    const [Product, setProduct] = useState<productType[]>([])


    useEffect(()=>{
           fetchLikedProducts()
    },[user])

    const fetchLikedProducts=async()=>{
        const apiurl =import.meta.env.VITE_API_URL
try {
const response =await axios.get(`${apiurl}/api/product/liked/${user._id}/?page=${page}`,{withCredentials:true})
console.log(response);

if (response.data.product) {
    setProduct((prev)=>[...prev,...response.data.product]);
    setPage(page+1)
    setHaseMore(true)
}if (response.data.product.length<10) {
    setHaseMore(false)
}
} catch (error) {
console.log(error);
setError((error as Error).message)

}
    }
  return (
    <div className='w-screen h-screen p-2 '>
{  Product.length>0&&  <ListProducts scrollFunc={fetchLikedProducts} haseMore={hasMore}  Product={Product} setProduct={setProduct} />}
 </div>
  )
}

export default LikedProducts
