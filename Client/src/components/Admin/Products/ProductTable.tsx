import React, { TableHTMLAttributes, useEffect, useState } from 'react';
import { useAuthContext } from '../../../Context/authContextPrivider';
import axios from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

interface Row {
  id: number;
  title: string;
  count: number;
  group: string;
}

interface productType {
  Product_Name: string,
  _id: string,
  Price: {
    MRP: string,
    Offer: string
  }
  inStock: string,
  category: string,
  description: string

}

const ProductTable = () => {

  const { setError } = useAuthContext()

  
  const navigate=useNavigate()


  const [products, setProducts] = useState<productType[]>([])
  const [inStock_icon, set_inStock_icon] = useState<boolean>(false)
  const [Price_icon, set_Price_icon] = useState<boolean>(false)
  const [filteredPrduct, setFilteredProduct] = useState<productType[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiurl =import.meta.env.VITE_API_URL;

        const response = await axios.get(`${apiurl}/api/product/allproduct`, { withCredentials: true })
        console.log(response?.data.product);
        if (response?.data.product) {
          setProducts(response?.data.product)
          setFilteredProduct(response?.data.product)

        }
      } catch (error) {
        console.log(error);
        setError((error as Error).message)
      }
    }

    fetchProduct()
  }, [])


  const handleStock = () => {

    const sorted = products.sort((a, b) =>

      Number(a.inStock) - Number(b.inStock)
    )

    if (inStock_icon) {
      setFilteredProduct(sorted.reverse());

    } else {
      setFilteredProduct(sorted);
    }

    set_inStock_icon(!inStock_icon);


  }
  const handlePrice = () => {

    const sorted = products.sort((a, b) =>

      Number(a.Price) - Number(b.Price)
    )

    if (Price_icon) {
      setFilteredProduct(sorted.reverse());

    } else {
      setFilteredProduct(sorted);
    }

    set_Price_icon(!Price_icon);


  }

const handleOpenProduct=async(id:string)=>{
  if (id) {
  console.log(id);

  navigate('/product?id='+id,{state:{from:location.href.replace(location.origin,'')}});

}

}


  return (
    <table className='border-2 border-black w-full p-2'  >
      <tr className='flex flex-row gap-3 w-full justify-between items-center border-b-2 border-gray-500 p-2 '>
        <th>NO</th>
        <th>Product_Name</th>
        <th>Category</th>
        {
          !Price_icon ? (<th className='cursor-pointer mr-1' onClick={handlePrice}>Price<i className="fa-solid fa-caret-up"></i></th>) : (<th className='cursor-pointer mr-1' onClick={ handlePrice}>Price<i className="fa-solid fa-caret-down"></i></th>)
        }
        {
          !inStock_icon ? (<th className='cursor-pointer mr-1' onClick={handleStock}>inStock<i className="fa-solid fa-caret-up"></i></th>) : (<th className='cursor-pointer mr-1' onClick={ handleStock}>inStock<i className="fa-solid fa-caret-down"></i></th>)
        }
      </tr>
      {filteredPrduct && filteredPrduct.map((item, index) => (
        <tr key={index} onClick={()=>handleOpenProduct(item._id)} className='flex flex-row gap-3 w-full justify-between items-center  border-b-2 border-gray-200 p-1 '>
          <td className='p-4'>{index + 1}</td>
          <td className='p-4'>{item.Product_Name}</td>
          <td className='p-4'>{item.category}</td>
          <td className='p-4'>{item.Price.MRP}</td>
          <td className='p-4'>{item.inStock}</td>
          {/* <td>{}</td> */}
        </tr>
      ))}
    </table>
  )
}

export default ProductTable
