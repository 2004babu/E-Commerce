import React, {  useEffect, useState } from 'react'
import ProductTable from './ProductTable'
import { useAuthContext } from '../../../Context/authContextPrivider'
import axios from 'axios'
import { productType } from '../../utils/Types'




interface productTypeFilter {
    search: string,
    MRP: string,
    Offer: string
    inStock: string,
    category: string,
    // description: string

}

const AllProducts: React.FC<{ Re_path?: string }> = ({ Re_path = '/product?id=' }) => {

    const { setError } = useAuthContext()

    const [responseGet, setResponseGet] = useState<boolean>(false)
    const [products, setProducts] = useState<productType[]>([])

    const [SubmitFilter, setSubmitFilter] = useState<boolean>(false)
    const [ItemStateChange, setItemStateChange] = useState<boolean>(false)

    ///For Infinite Scroll
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)




    const [ProductDetails, setProductDetails] = useState<productTypeFilter>({
        search: "",
        MRP: "",
        Offer: "",
        inStock: "",
        category: "AllProducts",
        // description:"",

    })

    const catogeryEnnum = [
        "Choose",
        "AllProducts",
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
        if (ProductDetails.category === 'AllProducts'&&!ProductDetails.search.length) {
            setSubmitFilter(false)
            fetchProduct(false,0,true)
            setPage(0)
            return
        }
        setSubmitFilter(true)
        fetchProduct(true,0,true)
        setPage(0)
        setItemStateChange(true)

    }


    const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

        await setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value,category:"Choose" });
    }

    const selectHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
         setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value,search:"" });
    }
    useEffect(() => {
        fetchProduct(false,0)
    }, [])


    //Product List Table 

    const fetchProduct = async (submit: boolean = SubmitFilter,FPage:number=page,stateChange:boolean=ItemStateChange) => {


        const apiurl = import.meta.env.VITE_API_URL;
        console.log(FPage)
        if (submit) {

            try {
                const response = await axios.get(`${apiurl}/api/product/admin/filter?search=${ProductDetails.search ?? ''}&category=${ProductDetails.category ?? ""}&inStock=${ProductDetails.inStock ?? ""}&page=${FPage}`, { withCredentials: true })

                console.log(response?.data);

                if (response?.data.product) {
                    if (stateChange) {
                        // setProductDetails({
                        //     search: "",
                        //     MRP: "",
                        //     Offer: "",
                        //     inStock: "",
                        //     category: "AllProducts",
                        //     // description:"",

                        // })
                        setProducts([]);
                        setItemStateChange(false)
                    }
                    setProducts((prev) => [...prev, ...response?.data.product])

                    if (response?.data.product < 10) {
                        setHasMore(false)
                        
                    }else{

                        setHasMore(true)
                        setPage(FPage + 1)
                    }



                }

            } catch (error) {
                console.log(error);
                setError((error as Error).message)
            } finally {
                setResponseGet(false)
            }
        } else {
            try {

                const response = await axios.get(`${apiurl}/api/product/allproduct?page=${FPage}`, { withCredentials: true })
                console.log(response?.data.product);
                if (response?.data.product) {

                    if (stateChange) {
                        // setProductDetails({
                        //     search: "",
                        //     MRP: "",
                        //     Offer: "",
                        //     inStock: "",
                        //     category: "AllProducts",
                        //     // description:"",

                        // })
                        setProducts([]);
                        setItemStateChange(false)
                    }
                    setProducts((prev) => [...prev, ...response?.data.product])

                    if (response?.data.product < 10) {
                        setHasMore(false)
                        return
                    }
                    setHasMore(true)
                    setPage(FPage + 1)

                    //   setFilteredProduct(response?.data.product)

                }
            } catch (error) {
                console.log(error);
                setError((error as Error).message)
            } finally {
                setResponseGet(false)
            }
        }
    }

    console.log(products)
    return (
        <div className=' w-screen h-screen scroll-smooth max-[465px]:text-sm '>
            <form onSubmit={handleSubmit} id='productdetail' className='mt-[65px] flex flex-row gap-2 p-3 justify-start items-start flex-wrap '>

                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-start items-start  '>
                    <label htmlFor="search" className='font-bold max-[465px]:text-sm'>search</label>
                    <input value={ProductDetails.search} onChange={changeHandler} type="text" name="search" id="search" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" placeholder='search' />
                </div>

                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <label htmlFor="category" className='font-bold max-[465px]:text-sm '>category</label>
                    <select onChange={selectHandler} form='productdetail' value={ProductDetails.category} name="category" id="category" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" >
                        {catogeryEnnum.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                        }
                    </select>
                </div>

                {/* //Feature Will Be Add this filter fun//
                //  <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <label htmlFor="MRP" className='font-bold max-[465px]:text-sm'>Price</label>
                    <input onChange={changeHandler} type="number" name="MRP" id="MRP" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" placeholder='Price' />
                </div>
                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <label htmlFor="inStock" className='font-bold max-[465px]:text-sm'>inStock</label>
                    <input onChange={changeHandler} type="number" name="inStock" id="inStock" className="outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2" placeholder='inStock' />
                </div> 
                */}
                <div className='flex max-[465px]:flex-col min-[465px]:flex-row p-1 gap-2 justify-center items-start  '>
                    <button type='submit' disabled={responseGet} className='outline-none border-2 border-gray-400 hover:bg-gary-200 rounded-lg p-2' >Search</button>
                </div>


            </form>
            <ProductTable hasMore={hasMore} products={products} setProducts={setProducts} fetchProduct={fetchProduct} Re_path={Re_path} />
        </div>
    )
}

export default AllProducts
