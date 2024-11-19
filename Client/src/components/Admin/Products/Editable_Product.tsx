import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../../Context/authContextPrivider'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { productType } from '../../utils/Types'
import { useDropzone } from 'react-dropzone'
import HandleHoverBtn from '../../utils/HandleHoverBtn'


const Editable_Product = () => {

    const navigate = useNavigate()
    const apiurl = import.meta.env.VITE_API_URL
    const useQuery = async () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()
    const location = useLocation()

    const StatusProduct = ["Publish", "Schedule", "Processing", "Waiting", "Private"]

    const { setError, user, setUser } = useAuthContext()
    const [changeImage, setChangeImage] = useState<boolean>(false)
    const [addNewImage, setAddNewImage] = useState<boolean>(false)
    const [ProductDetails, setProductDetails] = useState<productType>({
        _id: "",
        Price: {
            MRP: "",
            Offer: ""
        },
        inStock: "",
        category: "",
        description: "",
        imageUrl: "",
        Product_Name: "",
        P_Status: "",
        Comments: [{ userId: "", _id: "", comment: "", userName: "", likes: [{ userId: "" }] }],
        Ratings: [{ userId: "", _id: "", Rate: 0 }],
        likedBy: [{ userId: "", _id: "" }],
        totalRate: 0,

    })
    const onDrop = useCallback((file: any[]) => {
        console.log(file);
        if (file.length > 10 && Array.isArray(File)) {
            setError('your Upload over the limit it wil automatically delete over the limit !! limit is 10')
            file = file.slice(0, 10)
        }





    }, [])

    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const response = await axios.get(`${apiurl}/api/product/p/${(await query).get('id')}`, { withCredentials: true })

                //this one for recent history session log///
                const res = await axios.get(`${apiurl}/api/product/filter?viewId=${(await query).get('id')}`, { withCredentials: true })


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

    const handleRating = async (productId: "", userRate: number) => {
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
            //                         if (item._id.to""()===response?.data?.product._id.to""()) {
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
    const handleThumpUp = async (id: "") => {
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
    const handleThumpDown = async (id: "") => {
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
    const handleCart = async (productId: "") => {

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


    // useEffect(() => {
    //     if (ProductDetails?._id && user.Cart.length > 0) {
    //         let cart = user.Cart.some(item => item.product_id.to""() === ProductDetails._id.to""())
    //         setIsCart(user.Cart.some(item => item.product_id.to""() === ProductDetails._id.to""()))

    //         console.log(cart);

    //     } else {
    //         setIsCart(false)
    //     }
    // }, [ProductDetails, user])

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.value);


        if (e.target.name === 'MRP' || e.target.name === 'Offer') {
            setProductDetails({
                ...ProductDetails, Price: { ...ProductDetails.Price, [e.target.name]: e.target.value }
            })
            return
        }
        // setProductDetails({...ProductDetails,[e.target.name]:e.target.value});
        setProductDetails({
            ...ProductDetails, [e.target.name]: e.target.value,
        })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setProductDetails({
            ...ProductDetails, [e.target.name]: e.target.value,
        })
    }


    return (
        <>
            {ProductDetails && <div className='h-screen w-screen flex-col max-[750px]:overflow-y-scroll hide-side-bar  min-[750px]:flex-row flex gap-2 '>
                <div>
                    <div className="flex flex-row p-2 px-4 mt-[65px] h-[70px] w-full justify-between items-center border-b-2 border-gray-300 ">
                        <i onClick={() => navigate(location?.state?.from || '/')} className='fa-solid fa-arrow-left'></i>


                    </div>
                    <div className="flex flex-row p-2 px-4 justify-between items-center gap-1">
                        <i className='fa-solid fa-chevron-left w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i>

                        <div className="img w-80 bg-gray-900 h-96 min-[750px]:h-full">
                            <img src={ProductDetails.imageUrl[0] ?? "./image.png"} alt="product image" className='h-96 w-80 object-cover min-[750px]:h-full  ' />
                        </div>

                        <i className='fa-solid fa-chevron-right w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2 p-4 min-[750px]:mt-[65px] min-[750px]:overflow-x-hidden hide-side-bar  min-[750px]:overflow-none">
                    <input name='Product_Name' placeholder='Product_Name' value={ProductDetails.Product_Name} onChange={handleChange} className='border-none outline-none  text-2xl font-bold' />


                    <div className='flex flex-row gap-2 '>
                        $   <input type='number' name='MRP' placeholder='MRP' className='border-none outline-none' value={ProductDetails.Price.MRP ?? ""} onChange={handleChange} />
                        $   <input type='number' name='Offer' placeholder='Offer' className='border-none outline-none' value={ProductDetails.Price.Offer ?? ""} onChange={handleChange} />

                    </div>
                    <div className="bg-[#388e3c] font-bold text-md rounded-sm text-white flex flex-row gap-1 px-2 py-1 justify-center items-center w-fit">

                        {ProductDetails.totalRate} <i className='fa-solid fa-star'></i>
                    </div>
                    <div className='text-wrap w-full flex flex-col gap-3 items-start justify-center w-full  '>

                        <input name='description' placeholder='description' className='border-none outline-none text-pretty text-sm w-full' value={ProductDetails.description} onChange={handleChange} style={{ wordWrap: "break-word" }} />
                        <select name='P_Status' value={ProductDetails.P_Status} onChange={handleSelect} className='border-none outline-none text-2xl font-bold w-fit' >
                            {StatusProduct.map(item => <option key={item} className='text-sm font-semibold' value={item}>{item}</option>)}
                        </select>
                        <input name='inStock' type='number' placeholder='inStock' value={ProductDetails.inStock} onChange={handleChange} className='border-none outline-none text-2xl font-bold' />
                    </div>

                    <div onClick={() => setChangeImage(!changeImage)} className="flex flex-row p-2 justify-start gap-4 items-center">
                        <span className='font-bold text-md '>ChangeImage</span>
                        {!changeImage ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                    </div>
                    {/* ///chaneg Iimage */}
                    <div className="flex flex-row w-full gap-2 p-2 h-fit">
                        <button onMouseEnter={(e)=>HandleHoverBtn(e,'Romove This Image !')} onMouseLeave={(e)=>HandleHoverBtn(e)} className="p-2  bg-blue-400 rounded-md hover:bg-blue-500 text-[12px]  ">Remove this</button>
                        <button onMouseEnter={(e)=>HandleHoverBtn(e,'Romove All Image !')} onMouseLeave={(e)=>HandleHoverBtn(e)}  className="p-2  bg-blue-400 rounded-md hover:bg-blue-500 text-[12px]">Remove All</button>
                        {!addNewImage ?
                            <button onMouseEnter={(e)=>HandleHoverBtn(e,'Add Image !')} onMouseLeave={(e)=>HandleHoverBtn(e)} onClick={() => setAddNewImage(!addNewImage)} className="p-2  bg-blue-400 rounded-md hover:bg-blue-500 text-[12px]">Change Img
                            </button>
                            :
                            <button onMouseEnter={(e)=>HandleHoverBtn(e,'Close Add Image options !')} onMouseLeave={(e)=>HandleHoverBtn(e)} onClick={() => setAddNewImage(!addNewImage)} className="p-2  bg-blue-400 rounded-md hover:bg-blue-500 text-[12px]">Close
                            </button>
                        }
                        <button onMouseEnter={(e)=>HandleHoverBtn(e,'Romove This Image !')} onMouseLeave={(e)=>HandleHoverBtn(e)} className="p-2  bg-blue-400 rounded-md hover:bg-blue-500 text-[12px]">kk</button>

                    </div>
                    {addNewImage && <>
                        <div {...getRootProps()} className='flex flex-row w-full h-14 border-2 border-black border-dashed rounded-md'>
                            <input {...getInputProps()} type="file" placeholder='select File' />
                        </div>
                        {isDragActive && <p>dropzone here</p>}
                    </>}
                </div>

            </div>}</>
    )
}

export default Editable_Product

