import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ListProducts from './ListProducts'
import { useProductContext } from '../../Context/ProductContext'
import axios from 'axios'
import { useAuthContext } from '../../Context/authContextPrivider'

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
const Cart = () => { 
    const [Product, setProduct] = useState<productType[]>([])
    const apiurl = import.meta.env.VITE_API_URL
const {setError}=useAuthContext()
useEffect(()=>{
  const fetchCart=async()=>{
    try {

      const response = await axios.get(`${apiurl}/api/product/cart`, { withCredentials: true })

      console.log(response);
      if (response?.data?.product) {

          setProduct(response.data.product)
      }

  } catch (error) {
      console.log(error);
      setError((error as Error).message)
  } finally {
      // setClear(!clear)
  }
  }
  fetchCart()
},[])
    
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

  return (
    <div className='flex flex-col w-screen h-screen p-2 relative overflow-y-scroll overflow-x-hidden '>
      
      <ListProducts Product={Product} setProduct={setProduct} />
    </div>
  )
}

export default Cart
