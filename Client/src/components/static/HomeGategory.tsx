import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import HandleHoverBtn from '../utils/HandleHoverBtn'
//for portfolio wepsite statci data 
import { ProductData } from '../../Static_data.json'

interface typecategory {
  _id: string,
  category: string,
  imageUrl: string[]

}

const HomeGategory = () => {

  const navigate = useNavigate()
  // const catogeryEnnum = [
  //   "Electronics",
  //   "Computers",
  //   "Wearables",
  //   "Accessories",
  //   "Health",
  //   "Footwear",
  //   "Kitchen",
  //   "Gaming Laptop",
  //   "Dress",
  //   "Mobile",
  //   "Gadgets",
  //   "Food",
  //   "Toys",
  //   "Camara",
  // ]
  const [category, setCategory] = useState<typecategory[]>([])


  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/controll/categoryimages`
        )

        if (response.data.category) {
          setCategory((prev) => [...prev, ...response.data.category]);
        }
      } catch (error) {
        console.log(error);
        if (ProductData[0].imageUrl) {
          setCategory(ProductData);
        }
      }

    }
    fetchCategory()
  }, [])
  const handlecategory = async (category: string) => {
    navigate(`/product/category?q=${category}`)
  }

  return (
    <div className='flex flex-col flex-wrap w-full h-64 lg:gap-6 hide-side-bar gap-3 gap-y-4 p-3 bg-orange-900/[.07] text-black overflow-x-scroll justify-pevenly'>
      {category.length > 0 && category.map((item, index) => (
        <div onClick={() => handlecategory(item.category)} key={index} className="flex flex-col">
          <img style={{ height: "80px", width: '80px' }} src={item?.imageUrl[0]} alt="mobile23" className='object-contain rounded-full ' />
          <span className='text-black text-sm'>{item.category}</span>
        </div>))}

      {/* for dev time look pretty  */}
      {category.length < 16 && Array.from({ length: category.length ? 16 - category.length : 16 }).map((_, index) => (
        <div onMouseEnter={(e) => HandleHoverBtn(e, 'feauture will be Add !')} onMouseLeave={(e) => HandleHoverBtn(e)} onClick={() => toast('feature Will be Add')} key={index} className="flex flex-col">
          <img style={{ height: "80px", width: '80px' }} src={'./image.png'} alt="mobile23" className='object-cover rounded-full ' />
          <span className='text-black text-sm'>Just Look</span>
        </div>))}

    </div>
  )
}

export default HomeGategory
