import React, { FormEventHandler, useEffect, useState } from 'react'
import { useAuthContext } from '../../../Context/authContextPrivider'
import axios from 'axios'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useProductContext } from '../../../Context/ProductContext'
import CommentList from './CommentList'

const ViewProduct = () => {

    const navigate = useNavigate()
    const apiurl = import.meta.env.VITE_API_URL
    const useQuery = async () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()
    const location = useLocation()

    // console.log();

    const { setError, user, setUser } = useAuthContext()
    const { ProductDetails, setProductDetails } = useProductContext()
    const [isCart, setIsCart] = useState<boolean>(false)
    const [ImageN, setImageN] = useState<number>(0)



    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const response = await axios.get(`${apiurl}/api/product/p/${(await query).get('id')}`, { withCredentials: true })

                //this one for recent history session log///
                 await axios.get(`${apiurl}/api/product/viewlog?viewId=${(await query).get('id')}`, { withCredentials: true })

                console.log(response);

                if (response.data.product) {
                    setProductDetails(response.data.product)
                }
            } catch (error) {
                console.log(error);
                setError((error as Error).message)
            }
        }
        fetchProduct()
    }, [])



    // console.log(ProductDetails);
    const handleShare = async () => {

        if (navigator) {
            try {
                navigator.share({
                    title: "Check this out!"
                    , text: ",  'Here is a link I wanted to share with you.'",
                    url: window.location.href
                })
                console.log('Content shared successfully')
            } catch (error) {
                console.log(error);
                setError((error as Error).message)

            }
        }

    }

    const handleRating = async (productId: string, userRate: number) => {
        console.log(productId);
        const apiurl = import.meta.env.VITE_API_URL

        try {
            const response = await axios.patch(
                `${apiurl}/api/product/rating`,
                {},
                {
                    params: { productId, userRate },
                    withCredentials: true,
                }
            );
            console.log(response?.data?.product);
            console.log(ProductDetails);

            //                 if (response?.data?.product&&Product) {
            //                   let filteredProduct =  Product.map(item=>{
            //                         if (item._id.toString()===response?.data?.product._id.toString()) {
            //                            item=response?.data?.product
            //                            return item
            //                         }
            //                         return item
            //                     })
            // // console.log(filteredProduct);

            //                    setProduct? setProduct(filteredProduct):null
            //                 }

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }
    }


    ///comment section
    const [clear, setClear] = useState<boolean>(false)

    const CommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (!e.currentTarget) return;

        if (!user._id) return navigate('/login',{state:{from:window.location.href}})
        const fromdata = new FormData(e.currentTarget)
        const userCMT = fromdata.getAll('comment-input');

        console.log(userCMT);
        if (!userCMT[0]) {
            return setError('Fill Comment value')
        }
        try {

            const comment = await axios.post(`${apiurl}/api/product/comment`, { userCMT, productId: (await query).get('id'), userName: user.userName }, { withCredentials: true })

            console.log(comment);
            if (comment?.data?.product) {

                setProductDetails(comment.data.product)
            }

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        } finally {
            setClear(!clear)
        }
    }


    ///
    const handleThumpUp = async (id: string) => {
        console.log(id);
        try {

            const comment = await axios.patch(`${apiurl}/api/product/comment/like`, { productId: (await query).get('id'), CMTId: id }, { withCredentials: true })

            if (comment?.data?.product) {

                setProductDetails(comment?.data?.product)
            }

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }


    }
    const handleThumpDown = async (id: string) => {
        console.log(id);
        try {
            // console.log('dfkjkdf');

            const comment = await axios.patch(`${apiurl}/api/product/comment/dislike`, { productId: (await query).get('id'), CMTId: id }, { withCredentials: true })

            console.log(comment);

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }


    }
    const handleCart = async (productId: string) => {

        if (!productId) return
        try {

            const response = await axios.post(`${apiurl}/api/product/cart`, { productId }, { withCredentials: true })


            if (response.data.user) setUser(response.data.user)
            if (response.data.product) setProductDetails(response.data.product)

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        } finally {
            // setClear(!clear)
        }

    }
    // console.log(user);


    useEffect(() => {
        if (ProductDetails?._id && user.Cart.length > 0) {
            let cart = user.Cart.some(item => item.product_id.toString() === ProductDetails._id.toString())
            setIsCart(user.Cart.some(item => item.product_id.toString() === ProductDetails._id.toString()))

            console.log(cart);

        } else {
            setIsCart(false)
        }
    }, [ProductDetails, user])

    const handleImageRight = () => {
        if (ProductDetails?.imageUrl?.length > 1 && ImageN < ProductDetails?.imageUrl?.length - 1) {
            setImageN(ImageN + 1)
            console.log(ProductDetails.imageUrl[ImageN], ImageN);

        }

    }
    const handleImageLeft = () => {
        if (ImageN > 0) {
            setImageN(ImageN - 1)
        }
    }


    return (
        <>
            {ProductDetails && <div className='h-screen w-screen flex-col max-[750px]:overflow-y-scroll hide-side-bar  min-[750px]:flex-row flex gap-2'>
                <div>
                    <div className="flex flex-row p-2 px-4 mt-[65px] h-[70px] w-full justify-between items-center border-b-2 border-gray-300">
                        <i onClick={() => navigate(location?.state?.from || '/')} className='fa-solid fa-arrow-left'></i>

                        <div onClick={handleShare} className="flex flex-row p-2 justify-center gap-2 items-center hover:text-blue-400">
                            {/* like  button will be Add */}
                            <i className='fa-solid fa-share'></i><span>Share</span>
                        </div>
                    </div>
                    {ProductDetails.imageUrl.length > 1 ?
                        <div className="flex flex-row p-2 px-4 justify-between items-center gap-1 select-none ">
                            <i onClick={handleImageLeft} className='fa-solid fa-chevron-left w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i>

                            <div className="img w-80 bg-gray-900 h-96 min-[750px]:h-full">
                                <img src={ProductDetails.imageUrl[ImageN] ?? "./image.png"} alt="product image" className='h-96 w-80 object-cover min-[750px]:h-full  ' />
                            </div>

                            <i onClick={handleImageRight} className='fa-solid fa-chevron-right w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i>
                        </div> : <div className="flex flex-row p-2 px-4 justify-between items-center gap-1 select-none  ">
                            {/* <i onClick={handleImageLeft} className='fa-solid fa-chevron-left w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i> */}

                            <div className="img w-80 bg-gray-900 h-96 min-[750px]:h-full">
                                <img src={ProductDetails.imageUrl[0] ?? "./image.png"} alt="product image" className='h-96 w-80 object-cover min-[750px]:h-full  ' />
                            </div>

                            {/* <i onClick={handleImageRight} className='fa-solid fa-chevron-right w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i> */}
                        </div>}
                </div>
                <div className="flex flex-col gap-4 mt-2 p-4 min-[750px]:mt-[65px] min-[750px]:overflow-x-hidden hide-side-bar  min-[750px]:overflow-none">
                    <h1 className='text-2xl font-bold'>
                        {ProductDetails.Product_Name}
                    </h1>
                    <div className='flex flex-row gap-2 '>
                        <h1> {'$' + ProductDetails.Price.MRP}</h1>
                        <span> {'$' + ProductDetails.Price.Offer}</span>
                    </div>
                    <div className="bg-[#388e3c] font-bold text-md rounded-sm text-white flex flex-row gap-1 px-2 py-1 justify-center items-center w-fit">

                        {ProductDetails.totalRate} <i className='fa-solid fa-star'></i>
                    </div>
                    <div className='text-wrap w-full  '>
                        <p className='text-pretty text-sm w-full' style={{ wordWrap: "break-word" }}>{ProductDetails.description}</p>
                    </div>
                    <div className='flex flex-row gap-2 justify-evenly items-center w-full'>
                        {!isCart ?
                            <button onClick={() => handleCart(ProductDetails._id)} type="button" className="h-12 text-center bg-blue-400 rounded-md w-fit  px-3 py-2">Add Cart </button> :
                            <button onClick={() => handleCart(ProductDetails._id)} type="button" className="h-12 text-center bg-blue-400 rounded-md w-fit  px-3 py-2">Remove Cart </button>}
                        <button type="button" className="h-12  text-center bg-yellow-400 rounded-md w-fit px-3 py-2 ">Buy Now</button>
                    </div>
                    <CommentList CommentSubmit={CommentSubmit} handleThumpUp={handleThumpUp} handleThumpDown={handleThumpDown} clearCMTInput={clear} />
                </div>
            </div>}</>
    )
}

export default ViewProduct

