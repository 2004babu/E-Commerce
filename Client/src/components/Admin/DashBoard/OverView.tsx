import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
// import HomeHeader from '../../HomeHeader'
// import SideBar from '../../static/SideBar'
import { useNavigate } from 'react-router-dom'


// set:(open:boolean)=>void
const OverView = () => {

  const navigate = useNavigate()
  const productHover=useRef<HTMLDivElement>(null)

  useEffect(()=>{
const HoverElement=productHover.current

const handleHover=()=>{

  // make right of this element when its  hover 
  // <ul>
  //   <li>edit product </li>
  //   <li> product detail</li>
  //   <li>AddProduct</li>
  // </ul>
}
if (HoverElement) {
  HoverElement.addEventListener('hover',handleHover)

  return ()=>HoverElement?.removeEventListener('hover',handleHover)
}
  },[])

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className='w-screnn h-screen mt-[65px] p-3 '>
      <h1>DashBoard</h1>
      <div className='flex flex-row p-2 gap-3 flex  flex-wrap max-[465px]:justify-center '>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}   className='md:min-w-72 md:min-h-52 max-[465px]:w-[150px] max-[465px]:h-36 min-[465px]:w-[200px] min-[465px]:h-40 border-2 border-gray-500 relative rounded-lg p-3 text-balck flex flex-col justify-start '>
          <div className='flex flex-row justify-between items-center'>
            <h2>Products</h2>
            <i className="fa-solid fa-angles-right"></i>
          </div>
          <span>Total 10/P</span>
          {isHovered&&
          <ul   className="absolute top-0 right-[-50px] w-32 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
          <li onClick={() => navigate('/editproducts')} className="hover:bg-gray-100 p-2 cursor-pointer">Edit Product</li>
          <li onClick={() => navigate('/productsdetails')} className="hover:bg-gray-100 p-2 cursor-pointer">Product Detail</li>
          <li onClick={() => navigate('/addproducts')} className="hover:bg-gray-100 p-2 cursor-pointer">Add Product</li>
        </ul>
        }
        </div>
        <div className='md:min-w-72 md:min-h-52 max-[465px]:w-[150px] max-[465px]:h-36 min-[465px]:w-[200px] min-[465px]:h-40 border-2 border-gray-500 rounded-lg p-3 text-balck flex flex-col justify-start '>
          <div className='flex flex-row justify-between items-center'>
            <h2>Sells</h2>
            <i className="fa-solid fa-angles-right"></i>
          </div>
          <span>Total 10/P</span>

        </div>
        {/* <div className='flex flex-row p-2 gap-3 flex  flex-wrap max-[465px]:justify-center '> */}
          <div onClick={()=>navigate('/dashboard/comments')} className='md:min-w-72 md:min-h-52 max-[465px]:w-[150px] max-[465px]:h-36 min-[465px]:w-[200px] min-[465px]:h-40 border-2 border-gray-500 rounded-lg p-3 text-balck flex flex-col justify-start '>
            <div className='flex flex-row justify-between items-center'>
              <h2>New Comments</h2>
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <span>Total 1000 CMTS</span>

          </div>
          <div className='md:min-w-72 md:min-h-52 max-[465px]:w-[150px] max-[465px]:h-36 min-[465px]:w-[200px] min-[465px]:h-40 border-2 border-gray-500 rounded-lg p-3 text-balck flex flex-col justify-start '>
            <div className='flex flex-row justify-between items-center'>
              <h2>New Orders</h2>
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <span>Total 10/P</span>

          </div>
          <div onClick={()=>navigate('/set_category')} className='md:min-w-72 md:min-h-52 max-[465px]:w-[150px] max-[465px]:h-36 min-[465px]:w-[200px] min-[465px]:h-40 border-2 border-gray-500 rounded-lg p-3 text-balck flex flex-col justify-start '>
            <div className='flex flex-row justify-between items-center'>
              <h2>Category</h2>
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <span></span>

          </div>
          <div className='md:min-w-72 md:min-h-52 max-[465px]:w-[150px] max-[465px]:h-36 min-[465px]:w-[200px] min-[465px]:h-40 border-2 border-gray-500 rounded-lg p-3 text-balck flex flex-col justify-start '>
            <div className='flex flex-row justify-between items-center'>
              <h2>Achives</h2>
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <span>Total 10/P</span>

          </div>


       

        {/* </div> */}
      </div>
    </div>
  )
}

export default OverView
