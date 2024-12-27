import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../Context/authContextPrivider'
import { productType } from '../../utils/Types'
interface commnetType {
    CommentSubmit: (React.FormEventHandler<HTMLFormElement>),
    handleThumpUp: (id: string) => (void),
    handleThumpDown?: (id: string) => (void),
    clearCMTInput: (boolean)
    ProductDetails: productType
}

const CommentList: React.FC<commnetType> = ({ CommentSubmit, handleThumpUp, clearCMTInput, ProductDetails }) => {

    const { user } = useAuthContext()
    const [cmt, setcmt] = useState<string>('')
    const [viewAll, setViewAll] = useState<boolean>(false)
    console.log(ProductDetails)
    useEffect(() => {
        if (clearCMTInput) setcmt('')
    }, [clearCMTInput])




    ProductDetails.Comments.forEach(item => {

        item.likes.some(item => {

            item.userId.toString() === user._id.toString()
        })
    }
    )


    return (
        <div key={ProductDetails._id}

            className={`w-fit h-fit  flex flex-col gap-2 jusitfy-center items-center p-2 border-2 border-gray-200 `}>
            {/* add Comment  */}
            <form onSubmit={CommentSubmit} className="flex flex-row p-2 gap-2 justify-between items-center w-full ">
                <div className="grow text-sm ">
                    <label htmlFor="comment-input " className='font-semibold text-md text-gray-500'>Leave Comment </label>
                    <input type="text" value={cmt} onChange={(e) => {

                        setcmt(e.target.value)
                    }} name="comment-input" className="p-1  border-b-2 border-gray-500 outline-none w-full" />

                </div>
                <div className="grow-0">
                    <button type="submit" className='bg-sky-500 px-2 py-1 text-white flex flex-row items-center justify-center gap-2 text-sm'><i className='fa-solid fa-arrow-up text-sm'></i>submit</button>
                </div>
            </form>
            <div className="flex  w-full flex-col h-52 overflow-y-scroll ">

                {(ProductDetails.Comments && ProductDetails.Comments.length > 0) ?
                    ProductDetails.Comments.map((_cmt, index) =>
                    (
                        <>{(index < 3 || viewAll) ?
                            <div key={index} className="flex  w-full flex-col  jsutify-start p-1 border-b-2 border-gray-300 text-sm" >
                                <h1 className='font-bold'><i className="fa-solid fa-circle-check text-green-700"></i> {_cmt.userName}</h1>
                                <div className="flex flex-row  justify-between w-full items-end ">
                                    <span className='font-semibold text-sm'>{_cmt.comment}</span>
                                    <div className='flex flex-row gap-4 p-2 cursor-pointer '>
                                        {_cmt.likes.some(item => item.userId.toString() === user._id.toString()) ?
                                            <i onClick={() => handleThumpUp(_cmt._id)} className="fa-solid fa-thumbs-up text-gray-500 font-normal">{"  " + _cmt.likes.length}</i>
                                            : <i onClick={() => handleThumpUp(_cmt._id)} className="fa-regular fa-thumbs-up text-gray-500 font-normal">{"  " + _cmt.likes.length}</i>}
                                    </div>
                                </div>
                            </div> : null}
                        </>
                    )

                    ).reverse()
                    : <h2 className='font-bold text-gray-400 text-lg '>No Comments Yet!</h2>}
            </div>


            {/* <div className="felx flex-col gap-1 jsutify-start p-1 border-b-2 border-gray-300 text-sm">
                <h1>userName</h1>
                <div className="flex flex-row justify-between w-full items-end p-1">
                <span>comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perspiciatis.</span>
                <div className='flex flex-row gap-4 p-2 '>
                <i className="fa-regular fa-thumbs-up"></i>
                <i className="fa-regular fa-thumbs-down"></i>
                </div>
                </div>
                </div> */}

            {ProductDetails.Comments.length > 2 &&
                <div onClick={() => setViewAll(!viewAll)} className="flex flex-row text-sm text-gray-400 font-bold cursor-pointer">
                    {!viewAll ? <>
                        <span>viewAll</span>
                        <span>{`(${ProductDetails.Comments.length - 2})`}</span>
                    </> : <> <span>Collopse All</span>
                    </>}
                </div>}
        </div>

    )
}

export default CommentList
