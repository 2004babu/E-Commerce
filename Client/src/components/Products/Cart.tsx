import { useEffect, useState } from 'react'
import ListProducts from './ListProducts'
// import { useProductContext } from '../../Context/ProductContext'
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
  Comments: [{ userId: string, _id: string, comment: string, userName: string, likes: [{ userId: string }] }],
  Ratings: [{ userId: string, _id: string, Rate: number }],
  likedBy: [{ userId: string, _id: string }],
  totalRate: number,

}
const Cart = () => {
  const [hasMore, setHaseMore] = useState<boolean>(true)

  const [page, setPage] = useState<number>(0)
  const [ViewhasMore, setViewHaseMore] = useState<boolean>(true)
  const [ViewProduct, setViewProduct] = useState<productType[]>([])

  const [RelatedProduct, setRelatedProduct] = useState<productType[]>([])
  const [Relatedpage, setRelatedpage] = useState<number>(0)
  const [RelatedhasMore, setRelatedHaseMore] = useState<boolean>(true)

  const [Product, setProduct] = useState<productType[]>([])
  const apiurl = import.meta.env.VITE_API_URL
  const { setError } = useAuthContext()
  useEffect(() => {
    fetchCart()
    fetchRecentView()
    fetchRelatedProduct()
  }, [])

  const fetchCart = async () => {
    try {

      const response = await axios.get(`${apiurl}/api/product/cart`, { withCredentials: true })


      if (response.data.product) {
        setProduct((prev) => [...prev, ...response.data.product]);
        // setPage(page + 1)
        setHaseMore(true)
      } if (response.data.product.length < 10) {
        setHaseMore(false)
      }

    } catch (error) {
      console.log(error);
      setError((error as Error).message)
    } finally {
      // setClear(!clear)
    }
  }
  const fetchRecentView = async () => {
    try {

      const response = await axios.get(`${apiurl}/api/product/getRecentView/?page=${page}`, { withCredentials: true })


      if (response.data.product) {
        setViewProduct((prev) => [...prev, ...response.data.product]);
        setPage(page + 1)
        setViewHaseMore(true)
      } if (response?.data?.product?.length < 10) {
        setViewHaseMore(false)
      }

    } catch (error) {
      console.log(error);
      setError((error as Error).message)
    } finally {
      // setClear(!clear)
    }
  }
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

  const fetchRelatedProduct = async () => {
    const apiurl = import.meta.env.VITE_API_URL;
    // setLoading(true)
    console.log('rrrrrrrrrrr');
    
    try {
      const response = await axios.get(`${apiurl}/api/product/getRelatedProducts/?page=${Relatedpage}`, { withCredentials: true })
      console.log(response.data.product);
      
      if (response.data.product) {
        setRelatedProduct((prev) => [...prev, ...response.data.product]);
        setRelatedpage(page + 1)
        setRelatedHaseMore(false)
      } 
      if (response?.data?.product?.length < 10) {
        setRelatedHaseMore(false)
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message)

    } finally {
      // setLoading(false)
    }
  }

  console.log(RelatedhasMore,Relatedpage);


  return (
    <div id='cartHead'  className='flex flex-col w-full h-full p-2 relative overflow-y-scroll overflow-x-hidden mt-[65px] '>

      {Product && Product.length ? <ListProducts  className="flex flex-row p-2  justify-start items-start gap-3 flex-wrap" scrollFunc={fetchCart} haseMore={hasMore} Product={Product} setProduct={setProduct} /> :
        <div className="flex flex-col w-full p-3 font-bold text-xl h-80">
          Your Cart Is Empty
        </div>
      }

      <div id='Related_Products' className="flex flex-row overflow-x-scroll overflow-y-hidden hide-side-bar   p-2 w-full h-full border-t-2 border-gray-300 relative flex-nowrap mt-[100px]">
        <h1 className='absolute top-3 left-5 z-10 font-bold text-lg'>Related Products</h1>
        {RelatedProduct && RelatedProduct.length ? <ListProducts parentEl='Related_Products' className="flex flex-row p-2  justify-start items-start gap-3 mt-[65px]" scrollFunc={fetchRelatedProduct} haseMore={RelatedhasMore} Product={RelatedProduct} setProduct={setRelatedProduct} /> :
          <div className="flex flex-col w-full p-3 font-bold text-xl h-80">
            random fetch will be Add
          </div>
        }
      </div>
      <div id='Recent_Products' className="flex flex-row overflow-x-scroll overflow-y-hidden hide-side-bar   p-2 w-full h-full border-t-2 border-gray-300 relative flex-nowrap mt-[100px]">
        <h1 className='absolute top-3 left-5 z-10 font-bold text-lg'>Recent Products</h1>
        {ViewProduct && ViewProduct.length ? <ListProducts  className="flex flex-row p-2  justify-start items-start gap-3 mt-[65px]" scrollFunc={fetchRecentView} haseMore={ViewhasMore} Product={ViewProduct} setProduct={setViewProduct} /> :
          <div className="flex flex-col w-full p-3 font-bold text-xl h-80">
            random fetch will be Add
          </div>
        }
      </div>


    </div>
  )
}

export default Cart


{/* <div className="flex flex-col rounded-md justify-center items-center p-2 w-48-h-48 mt-6">
          <div>
          <img src='./image.png' alt="" />

          </div>
          <h1>Product Name</h1>

          <button className='flex justify-cneter items-center px-2 py-1 bg-green-600'> Add Cart</button>
        </div> */}