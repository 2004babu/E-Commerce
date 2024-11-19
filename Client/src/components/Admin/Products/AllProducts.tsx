import React, { FormEvent, FormEventHandler, useState } from 'react'
import ProductTable from './ProductTable'
import { useAuthContext } from '../../../Context/authContextPrivider'
import axios from 'axios'




interface productType {
    search: string,
    MRP: string,
    Offer: string
    inStock: string,
    category: string,
    // description: string

}

const AllProducts:React.FC<{Re_path?:string}> = ({Re_path='/product?id='}) => {

    const { setError } = useAuthContext()

    const [responseGet,setResponseGet]=useState<boolean>(false)

    const [ProductDetails, setProductDetails] = useState<productType>({
        search: "",
        MRP: "",
        Offer: "",
        inStock: "",
        category: "",
        // description:"",

    })

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


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResponseGet(true)

        const apiurl =import.meta.env.VITE_API_URL;

    try {
        const response = await axios.get(`${apiurl}/api/product/filter?search=${ProductDetails.search}&category=${ProductDetails.category}&inStock=${ProductDetails.inStock}`, { withCredentials: true })
        
        
        console.log(response?.data);
        
    } catch (error) {
        console.log(error);
        setError((error as Error).message)
    }finally{
        setResponseGet(false)
    }
    

}


    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

        await setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value });
    }

    const selectHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value });
    }


    console.log(ProductDetails);

    return (
        <div className=' w-screen h-screen scroll-smooth max-[465px]:text-sm '>
            <form  onSubmit={handleSubmit} id='productdetail' className='mt-[65px] flex flex-row gap-2 p-3 justify-start items-start flex-wrap '>

                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-start items-start  '>
                    <label htmlFor="search" className='font-bold max-[465px]:text-sm'>search</label>
                    <input onChange={changeHandler} type="text" name="search" id="search" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" placeholder='search' />
                </div>

                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <label htmlFor="category" className='font-bold max-[465px]:text-sm '>category</label>
                    <select onChange={selectHandler} form='productdetail' name="category" id="category" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" >
                        {catogeryEnnum.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                        }
                    </select>
                </div>

                {/* <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <label htmlFor="MRP" className='font-bold max-[465px]:text-sm'>Price</label>
                    <input onChange={changeHandler} type="number" name="MRP" id="MRP" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" placeholder='Price' />
                </div>
                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <label htmlFor="inStock" className='font-bold max-[465px]:text-sm'>inStock</label>
                    <input onChange={changeHandler} type="number" name="inStock" id="inStock" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" placeholder='inStock' />
                </div> */}
                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <button type='submit' disabled={responseGet} className='outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2' >Search</button>
                </div>


            </form>
            <ProductTable Re_path={Re_path} />
        </div>
    )
}

export default AllProducts
