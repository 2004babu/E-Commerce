import React, { Dispatch, ElementRef, ForwardedRef, ReactNode, Ref, RefObject, SetStateAction, useEffect, useState } from 'react'
import { useAuthContext } from '../../Context/authContextPrivider';
import axios from 'axios';
import Loading from '../static/Loading';
import StartRating from 'react-star-ratings'
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { productType } from '../utils/Types';


interface listType {
    Product: productType[],
    setProduct?: (Dispatch<SetStateAction<productType[]>>),
    scrollFunc: () => void;
    haseMore: boolean,
    className: string,
    parentEl?: string,
    refer?: ReactNode,
    likeShare?: boolean,
    Rating?: boolean,
    children?: React.ReactNode
    endMSG?: React.ReactNode
}




const ListProducts: React.FC<listType> = ({ refer, parentEl, className, Product, setProduct, scrollFunc, haseMore, likeShare = true, Rating = true, children, endMSG }) => {

    // const [isFirstToLast, setIsFirstToLast] = useState<boolean>(true)
    // const [isAToZ, setIsAToZ] = useState<boolean | undefined>(undefined)
    // useEffect(() => {

    //     if (!isFirstToLast && Product.length > 0) {

    //         setFilteredProduct([...Product.slice().reverse()])
    //     } else {
    //         setFilteredProduct([...Product])

    //     }

    // }, [isFirstToLast])

    const navigate = useNavigate()
    const { setError, user ,SetAsyncAfterAuthFuc,asyncAfterAuthFuc} = useAuthContext()

    const [loading, setLoading] = useState<boolean>(false)

    const [isFilter, setIsFilter] = useState<boolean>(false)
    const [filteredProduct, setFilteredProduct] = useState<productType[]>([])

    const apiurl = import.meta.env.VITE_API_URL;


    const handleLike = async (e: React.MouseEvent<HTMLElement, MouseEvent>, productId: string) => {
        e.stopPropagation()
        console.log('jfvhdfgvjdf',user);
        

        const setLike=async(e: React.MouseEvent<HTMLElement, MouseEvent>, productId: string)=>{
            console.dir(e);
            console.log(e.currentTarget?.classList);
            
        const targetClassList =  e.currentTarget?.classList ??e.target?.classList

        setLoading(true);
        try {
            const response = await axios.get(
                `${apiurl}/api/product/addLike?likeId=${productId}`,
                { withCredentials: true }
            );
            if (response.statusText === 'OK') {
                if (targetClassList.contains('fa-regular')) {
                    console.log('solid');
                    targetClassList.add('fa-solid', 'text-red-500');
                    targetClassList.remove('fa-regular');
                } else {
                    console.log('regular');
                    targetClassList.add('fa-regular');
                    targetClassList.remove('fa-solid', 'text-red-500');
                }
            }

            if (asyncAfterAuthFuc.status && user?._id) {
                console.log(user);
                
                // asyncAfterAuthFuc.fun();
                SetAsyncAfterAuthFuc({ status: false, fun: () => { } })
              }
          
        } catch (error) {
            console.log(error);
            setError((error as Error).message);
        } finally {
            setLoading(false);

        }
        }
        if (!user?._id) {
         return asyncAfterAuthFuc.status?null: 
           SetAsyncAfterAuthFuc({status:true,fun:()=>setLike(e, productId)}) ,navigate('/login', { state: { from: location.href.slice(location.origin.length) } })
        }
setLike(e,productId)

    };

    const checkAuthUser=async(e: React.MouseEvent<HTMLElement, MouseEvent>, productId: string)=>{
        
     
   
    }


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


    return (
        <>    <InfiniteScroll className={className}
            dataLength={filteredProduct.length}
            next={scrollFunc}
            hasMore={haseMore}
            scrollableTarget={refer ? refer : parentEl}

            loader={<h1>loading</h1>}
            endMessage={endMSG ?? <div>no value</div>}

        >


            {filteredProduct && filteredProduct.length > 0 ? filteredProduct.map((item, index) => (
                <div onClick={(e) => handleOpen(e, item._id)} key={index} className="flex flex-col p-1 gap-1 justify-center items-start relative ">
                    {(likeShare) && <div className="w-10 h-10 px-2 py-1 text-md absolute top-0 right-0">
                        {(item?.likedBy && item?.likedBy?.some(value => value?.userId.toString() === user._id.toString())) ?
                            (<i onClick={(e) => handleLike(e, item._id)} className='fa-solid fa-heart text-red-500 cursor-pointer'></i>)
                            :
                            (<i onClick={(e) => handleLike(e, item._id)} className='fa-regular fa-heart cursor-pointer'></i>)
                        }
                        <i onClick={(e) => handleShare(e, item._id)} className='fa-solid fa-share cursor-pointer'></i>
                    </div>}
                    <div key={index} className='h-60 max-[465px]:h-48 max-[465px]:w-40 w-56 '>
                        <img src={item?.imageUrl?.length ? item.imageUrl[0] : "./image.png"} alt={` ${item.Product_Name} category photo`} className='h-60 max-[465px]:h-48 max-[465px]:w-40 w-56 max-[465px]:object-contain object-contain' />
                    </div>
                    <h1 className='font-bold text-lg'>{item.Product_Name.substring(0, 15)}</h1>
                    <div className="flex flex-col items-start justify-center gap-1 p-1 text-md">
                        <span className='font-bold text-lg' >{"₹" + Number(item.Price.MRP) * Number(item.Price.Offer) / 100}</span>
                        <div className='flex flex-row gap-2'>
                            <span className=' font-semibold  line-through text-sm text-gray-600 flex'>{"₹" + Number(item.Price.MRP)} </span>
                            <p className='ms-5 text-sm font-medium  text-green-600'>{"%  " + item.Price.Offer + "  off"}</p>

                        </div>
                    </div>

                    <div className="flex flex-row p-1 gap-2">
                        <div className="bg-[#388e3c] font-bold text-sm rounded-sm text-white flex flex-row gap-1 px-[4px] py-[2px] justify-center items-center w-fit">
                            {item.totalRate.toFixed(1)} <i className='fa-solid fa-star text-sm'></i>

                        </div>
                        <span className='text-sm font-medium text-gray-600'>{item.Ratings.length} reviews</span>
                    </div>
                    {Rating &&
                        <div onClick={(e) => {
                            e.stopPropagation()
                        }} className="ratings  flex flex-col">
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
                    }

                    {children}
                </div>
            )) : !loading ? <h1>not Found</h1> : <Loading />}
        </InfiniteScroll>

        </>
    )
}

export default ListProducts

{/* <div className='bg-gray-100 h-14 w-full items-center justify-end   mt-[65px] flex flex-row p-3 '>
                filter fuctions like assending desending order a-z z-a highPrice -lowPrice

                <div onClick={handleFilter} className="flex flex-row gap-1 p-2 justify-center items-center cursor-pointer select-none ">
                    filter <i className={`fa fa-solid fa-caret-${isFilter ? "down" : "up"}`}></i>
                </div>
            </div> */}
{/* {isFilter ? <div className='flex flex-row p-2 items-center justify-start '>
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
                </div> */}

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

{/* </div> : null} */ }