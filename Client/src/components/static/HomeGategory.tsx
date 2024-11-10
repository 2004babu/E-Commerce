import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeGategory = () => {

  const navigate=useNavigate()
  const catogeryEnnum = [
    "Electronics",
    "Computers",
    "Wearables",
    "Accessories",
    "Health",
    "Footwear",
    "Kitchen",
    "Gaming Laptop",
    "Dress",
    "Mobile",
    "Gadgets",
    "Food",
    "Toys",
    "Camara",
  ]
const handlecategory =async(category:string)=>{
navigate( `/product/category?q=${category}`)
}
  return (
    <div className='flex flex-col flex-wrap w-100 h-64 lg:gap-6 hide-side-bar gap-3 gap-y-4 p-3 bg-orange-900/[.07] text-black overflow-x-scroll justify-pevenly'>
          {catogeryEnnum && catogeryEnnum.map((item, index) => (
            <div onClick={()=>handlecategory(item)} key={index} className="flex flex-col">
              <img style={{ height: "80px", width: '80px' }} src="https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&w=600" alt="mobile23" className='object-fit rounded-full ' />
              <span className='text-black text-sm'>{item}</span>
          </div>))}
    </div>
  )
}

export default HomeGategory
