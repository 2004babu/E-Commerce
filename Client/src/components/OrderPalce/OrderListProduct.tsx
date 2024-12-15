import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { productType } from '../utils/Types'
import { useNavigate } from 'react-router-dom'

interface orderListType{
    item:productType,
    index:number

}

const OrderListProduct:React.FC<orderListType> = ({item,index}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)

const navigate=useNavigate()


    useEffect(() => {
      
        if (document.body.clientWidth >= 550) {
            setShowDetails(true)
        }
    }, [])
    const handleShowdetails = () => {
        setShowDetails(!showDetails)

    }

  return (
    <div onClick={()=>navigate(`/product?id=${item?._id}`,{state:{from:location.href.substring(location.origin.length)}})}  className='flex-row flex max-[550px]:flex-col w-full h-full justify-center items-center overflow-hidden border-b-2 border-gray-300'  key={index} ><motion.div className="flex flex-col h-48 w-48  overflow-hidden p-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img style={{ objectFit: 'fill' }} src={`${item?.imageUrl[0] ?? "../image.png"}`} alt="kjdbkbfhd" className='rounded-md' />

                </motion.div>
                    <div className='flex flex-col min-[550px]:hidden  items-start justify-start w-full  '>
                        {showDetails ? <div onClick={handleShowdetails} className='flex items-center justify-center gap-2 font-normal text-[10px] cursor-pointer'>
                            <i className="fa-solid fa-chevron-up "></i>
                            <p className=''>view Details</p>
                        </div>
                            :
                            <div onClick={handleShowdetails} className='flex items-center justify-center gap-2 font-normal text-[10px] cursor-pointer'>
                                <i className="fa-solid fa-chevron-down"></i>
                                <p className=''>view Details</p>
                            </div>}
                    </div>

                    {showDetails && <motion.div className="flex grow flex-col gap-4 mt-2 p-4 min-[750px]:mt-[65px] min-[750px]:overflow-x-hidden hide-side-bar  min-[750px]:overflow-none"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}

                    >
                        <h1 className='text-2xl font-bold'>
                            {item?.Product_Name ?? ""}
                        </h1>
                        <div className='flex flex-row gap-2 text-md font-bold items-center'>
                        <h1 className="text-[30px]"> {"₹"  +`${(Number(item.Price.MRP)-Number(item.Price.MRP)*Number(item.Price.Offer)/100).toFixed(2)}`}</h1>
                        <span className='line-through font-normal text-gray-400'> {"₹" + Number(item.Price.MRP)}</span>
                        <span className='text-sm text-green-800 font-semibold'> { item.Price.Offer+"%  Off" }</span>
                        </div>
                        <div className="bg-[#388e3c] font-bold text-md rounded-sm text-white flex flex-row gap-1 px-2 py-1 justify-center items-center w-fit">

                            {item?.totalRate ?? ""} <i className='fa-solid fa-star'></i>
                        </div>
                        <div className='text-wrap w-full  '>
                            <p className='text-pretty text-sm w-full' style={{ wordWrap: "break-word" }}>{item?.description.substring(0, 20) ?? ''}</p>
                        </div>
                    </motion.div>}
                </div>
  )
}

export default OrderListProduct
