import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../Context/authContextPrivider'
import axios from 'axios'
import FilterHeader from '../../static/FilterHeader'
import { Link } from 'react-router-dom'

import { productType } from '../../utils/Types' 



const DashComments = () => {

    const [Product, setProduct] = useState<productType[]>([])
    const [page, setPage] = useState<number>(0)
    const [haseMore, setHashMore] = useState<boolean>(true)
    const { setError, user } = useAuthContext()

    interface openDEtype {
        id: string,
        isOpen: boolean
    }

    const [openFullDetails, setOpenFullDetails] = useState<openDEtype[]>([])


    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetchCommentsAndRatings()
    }, [])

    const fetchCommentsAndRatings = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/product/admin/comments/?page=${page}`, { withCredentials: true });


            console.log(response?.data?.Product);
            if (response?.data?.Product?.length) {
                setProduct((prev) => [...prev, ...response.data.Product])
                setPage(page + 1)
            }

            if (response?.data?.Product?.length < 10) {
                setHashMore(false)
            }



        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }
    }

    const toggleDetails = (id: string) => {

        setOpenFullDetails((prev) => {
            const item = prev.find(value => value.id === id)

            if (item) {

                return prev.map(item =>
                    item.id === id ? { ...item, isOpen: !item.isOpen } : item)
            } else {
                return [...prev, { id: id, isOpen: true }]
            }
        })
    }

    console.log(openFullDetails);

    const ratingColor = ["red", "black", "red", "FFB22C", '399918']

    console.log(ratingColor[1]);


    return (
        <div className='bg-gray-100 h-full w-full  mt-[65px] flex flex-row p-3 '>
            <FilterHeader FilterName='Products' className=' flex flex-row w-full p-1 justify-between items-center rounded-sm border-b-1 border-gray-300 shadow-md shadow-gray-300 bg-white p-2 ' >
                {/* view more Means Full Details Page Redirect */}

                {Product && Product.length ? Product.map((item) =>
                    <div key={item._id} className='flex flex-col w-full  gap-2 mb-2 '>

                        <h1 onClick={(e) => {
                            e.stopPropagation()
                            toggleDetails(item._id)
                        }} className='text-lg font-bold w-full flex p-2 bg-blue-100 justify-between cursor-pointer '>
                            {item.Product_Name}
                            <span className='text-sm font-normal w-14 text-center cursor-pointer'><i className={`fa-solid fa-chevron-${openFullDetails.find(value => value.id === item._id)?.isOpen ? "up" : "down"}`}></i></span>
                        </h1>

                        {openFullDetails.find(value => value.id === item._id)?.isOpen &&
                            <div className='flex flex-row max-[465px]:flex-col justify-start items-center p-2  border-t-2 border-black-400 relative'>
                                <div className="absolute bottom-0 right-2">
                                    <Link to={'#'} className='text-blue-800 text-sm select-none cursor-pointer'>view More</Link>
                                </div>
                                <div className=' w-fit h- rounded-lg  '>
                                    <img className='rounded-xl w-48 h-48 object-contain  ' src={item.imageUrl} alt="" />
                                </div>
                                <div className="flex flex-col p-2 justify-start h-full w-full items-center ">
                                    <div className='flex flex-row p-1 justify-between w-full items-start text-sm font-normal gap-3'>
                                        <h1>Comments  </h1>
                                        <span>Total Cmt : {item.Comments.length}</span>
                                    </div>
                                    <FilterHeader FilterName='CMT' className='flex flex-row w-full  px-2 justify-between items-center rounded-sm border-none   p-2 text-sm font-normal h-6 bg-orange-300'>
                                        {item.Comments && item.Comments.length ? item.Comments.map(cmt => <div className='flex flex-row justify-between items-center p-1 w-full'>
                                            <div className='font-normal text-sm'>{cmt.userName && cmt.userName} </div>
                                            <div>{cmt.comment && cmt.comment}</div>
                                            <div className='font-normal text-sm'>{cmt.likes ? cmt.likes.length : '0'} Likes</div>


                                        </div>) : null}
                                    </FilterHeader>
                                </div>

                                <div className="flex flex-col p-3 items-center justify-start bg-red-100 rounded-md w-full h-full">
                                    <div className="flex flex-row px-2 justify-between gap-2 w-full items-center border-b-2 border-gray-400">
                                        <h1 className='text-lg font-bold'>Ratings</h1>
                                        <p className='text-sm font-normal '>Total Ratings {item?.Ratings && item.Ratings.length}</p>

                                    </div>
                                    <div style={{
                                        background: `conic-gradient(#4CAF50 ${item.totalRate/5*360}deg, #E0E0E0 ${item.totalRate/5*360}deg)`,
                                    }} className="flex rounded-full w-48 h-48  justify-center items-center ">

                                        <div style={{}} className="flex justify-center items-center rounded-full w-44 h-44 bg-white">
                                            {item.totalRate}
                                        </div>
                                    </div>
                                </div>
                            </div>}

                    </div>

                ) : <>not Found</>}
            </FilterHeader>
            {/* <div className="p-2 flex flex-col rounded-md bg-gray-300 border-2 border-black-300 w-full overflow-x-hidden overflow-y-scroll hide-side-bar items-center  "><h2>Comments</h2></div>
            <div className="p-2 flex flex-col rounded-md bg-gray-300 border-2 border-black-300 w-full overflow-x-hidden overflow-y-scroll hide-side-bar items-center">Ratings</div> */}
        </div>
    )
}

export default DashComments
