import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAuthContext } from '../../Context/authContextPrivider';
import axios from 'axios';
import Loading from '../static/Loading';
import StartRating from 'react-star-ratings'
import {  useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
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

const ListProducts: React.FC<{ Product: productType[], setProduct?: (Dispatch<SetStateAction<productType[]>>), scrollFunc: () => void; haseMore: boolean }> = ({ Product, setProduct, scrollFunc, haseMore }) => {


    const navigate = useNavigate()
    const { setError, user } = useAuthContext()

    const [loading, setLoading] = useState<boolean>(false)

    const [isFilter, setIsFilter] = useState<boolean>(false)
    const [isFirstToLast, setIsFirstToLast] = useState<boolean>(true)
    // const [isAToZ, setIsAToZ] = useState<boolean | undefined>(undefined)
    const [filteredProduct, setFilteredProduct] = useState<productType[]>([])

    const apiurl = import.meta.env.VITE_API_URL;


    const handleLike = async (e: React.MouseEvent<HTMLElement, MouseEvent>, productId: string) => {
        e.stopPropagation()

        const targetClassList = e.currentTarget.classList;
        if (targetClassList.contains('fa-regular')) {
            console.log('solid');
            targetClassList.add('fa-solid', 'text-red-500');
            targetClassList.remove('fa-regular');
        } else {
            console.log('regular');
            targetClassList.add('fa-regular');
            targetClassList.remove('fa-solid', 'text-red-500');
        }
        setLoading(true);
        try {
            const response = await axios.get(
                `${apiurl}/api/product/filter?likeId=${productId}`,
                { withCredentials: true }
            );
            console.log(response);
            if (response.data.product) {
                // setProduct(response.data.product);
            }
        } catch (error) {
            console.log(error);
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }

    };



    const handleShare = (e: React.MouseEvent<HTMLElement>, productId: string) => {
        e.stopPropagation()

        if (navigator) {
            try {
                navigator.share({
                    title: 'Product link!',
                    url: `${window.location.origin}/product/${productId}`,
                    // text:'kjfbfd,fdmfvdhf,dj',

                })

            } catch (error) {

                console.log(error);
                setError((error as Error).message)
            }
        }
    }

    ///////
    const handleRating = async (productId: string, userRate: number) => {

        console.log(productId);


        try {
            const response = await axios.patch(
                `${apiurl}/api/product/rating`,
                {},
                {
                    params: { productId, userRate },
                    withCredentials: true,
                }
            );
            console.log(response?.data?.product, Product);

            if (response?.data?.product && Product) {
                let filteredProduct = Product.map(item => {
                    if (item._id.toString() === response?.data?.product._id.toString()) {
                        item = response?.data?.product
                        return item
                    }
                    return item
                })
                // console.log(filteredProduct);

                setProduct ? setProduct(filteredProduct) : null
            }

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }
    }


    const handleOpen = (e: React.MouseEvent<HTMLDivElement>, productId: string) => {

        e.stopPropagation()
        console.log(productId);

        navigate('/product?id=' + productId, { state: { from: location.href.replace(location.origin, '') } });
    }

    useEffect(() => {
        if (Product.length > 0) {
            setFilteredProduct(Product)
        }
    }, [Product])

    const handleFilter = async (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e);
        e.stopPropagation()
        setIsFilter(!isFilter)
    }
    useEffect(() => {

        if (!isFirstToLast && Product.length > 0) {

            setFilteredProduct([...Product.slice().reverse()])
        } else {
            setFilteredProduct([...Product])

        }

    }, [isFirstToLast])

    return (
        // <div >
        <>
            <div className='bg-gray-100 h-14 w-full items-center justify-end   mt-[65px] flex flex-row p-3 '>
                filter fuctions like assending desending order a-z z-a highPrice -lowPrice

                <div onClick={handleFilter} className="flex flex-row gap-1 p-2 justify-center items-center cursor-pointer select-none ">
                    filter <i className={`fa fa-solid fa-caret-${isFilter ? "down" : "up"}`}></i>
                </div>
            </div>
            {isFilter ? <div className='flex flex-row p-2 items-center justify-start '>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setIsFirstToLast(!isFirstToLast)
                }} className='cursor-pointer select-none flex gap-2 flex-row px-2 py-1 border-2 border-gray-300 items-center '>
                    {isFirstToLast ? <>
                        <h2>
                            First-Last
                        </h2>
                        <i className='fa-solid fa-arrow-up'></i>
                    </> : <>
                        <h2>
                            Last-First
                        </h2>
                        <i className='fa-solid fa-arrow-down'></i>
                    </>}
                </div>

                {/* 
                A-Z function will be Add
                <div className='cursor-pointer flex gap-2 flex-row px-2 py-1 border-2 border-gray-300 items-center '>
                {isFirstToLast ? <>
                        <h2>
                            A-Z
                        </h2>
                        <i className='fa-solid fa-arrow-up'></i>
                    </> : <>
                        <h2>
                            Z-A
                        </h2>
                        <i className='fa-solid fa-arrow-down'></i>
                    </>}
                </div> */}

            </div> : null}

            <InfiniteScroll className="flex flex-row p-2  justify-start items-start gap-3 flex-wrap"
                dataLength={filteredProduct.length}
                next={scrollFunc}
                hasMore={haseMore}
                loader={<div className="border border-blue-300 shadow rounded-md h-full p-4 max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-700 h-20 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-48 bg-slate-700 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>}
                endMessage={<p>End of feed</p>}
            >


                {filteredProduct && filteredProduct.length > 0 ? filteredProduct.map((item, index) => (
                    <div onClick={(e) => handleOpen(e, item._id)} key={index} className="flex flex-col p-1 gap-1 justify-center items-start relative ">
                        <div className="w-10 h-10 px-2 py-1 text-md absolute top-0 right-0">
                            {(item?.likedBy.length && item?.likedBy?.some(value => value?.userId.toString() === user._id.toString())) ?
                                (<i onClick={(e) => handleLike(e, item._id)} className='fa-solid fa-heart text-red-500'></i>)
                                :
                                (<i onClick={(e) => handleLike(e, item._id)} className='fa-regular fa-heart'></i>)
                            }
                            <i onClick={(e) => handleShare(e, item._id)} className='fa-solid fa-share'></i>
                        </div>
                        <div key={index} className='h-60 max-[465px]:h-48 max-[465px]:w-40 w-56 '>
                            <img src={item.imageUrl[0]} alt={` ${item.Product_Name} category photo`} className='h-60 max-[465px]:h-48 max-[465px]:w-40 w-56 max-[465px]:object-contain object-contain' />
                        </div>
                        <h1 className='font-bold text-lg'>{item.Product_Name}</h1>
                        <div className="flex flex-row p-1 text-md">
                            <span>{item.Price.MRP}</span>
                            <span>{item.Price.Offer}</span>
                        </div>
                        <div className="bg-[#388e3c] font-bold text-sm rounded-sm text-white flex flex-row gap-1 px-[10px] py-[5px] justify-center items-center w-fit">

                            {item.totalRate} <i className='fa-solid fa-star'></i>
                        </div>
                        <div className="ratings  flex flex-col">
                            <span className='text-sm text-gray-300'>{item.Ratings?.length ? item.Ratings.length : 0}  votes</span>

                            <StartRating
                                ignoreInlineStyles={false}
                                starDimension='16px'
                                starSpacing='0px'
                                rating={item?.totalRate && item?.Ratings?.length ? item.totalRate / item.Ratings.length : 0}
                                starRatedColor='yellow'
                                numberOfStars={5}
                                changeRating={(newrating) => handleRating(item._id, newrating)}
                                name='rating'
                            />
                        </div>
                    </div>
                )) : !loading ? <h1>not Found</h1> : <Loading />}
            </InfiniteScroll>

        </>
        // </div>
    )
}

export default ListProducts
