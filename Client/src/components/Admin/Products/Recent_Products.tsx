import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ListProducts from '../../Products/ListProducts'
import axios from 'axios'
import { useAuthContext } from '../../../Context/authContextPrivider'

import { productType } from '../../utils/Types' 


interface RecentPTtype {
    RecentProduct: productType[],
    fetchRecentProduct: () => (void),
    RecenthasMore: boolean,
    setRecentProduct: Dispatch<SetStateAction<productType[]>>
    likeShare?: boolean,
    Rating?: boolean,
    children?: React.ReactNode,
    endMSG?: React.ReactNode

}

const Recent_Products: React.FC<RecentPTtype> = ({
    RecentProduct,
    fetchRecentProduct,
    RecenthasMore,
    setRecentProduct,
    likeShare = true,
    Rating = false,
    children,
    endMSG
}) => {

    
    const Recent_Products = useRef<HTMLDivElement>(null);
    return (
        <div id='Recent_Products' ref={Recent_Products} className="flex flex-row overflow-x-scroll overflow-y-hidden hide-side-bar   p-2 w-full h-full border-t-2 border-gray-300 relative flex-nowrap mt-[100px]">
            <h1 className='absolute top-3 left-5 z-10 font-bold text-lg'>Recent Products</h1>
            {RecentProduct && RecentProduct.length ?
                <ListProducts parentEl='Recent_Products'
                    className="flex flex-row p-2  justify-start items-start gap-3 mt-[65px]"
                    Rating={Rating}
                    likeShare={likeShare}
                    scrollFunc={fetchRecentProduct}
                    haseMore={RecenthasMore}
                    Product={RecentProduct}
                    setProduct={setRecentProduct}
                    endMSG={endMSG}
                    
                    >

                    {/* //children in listProducts */}
                {children??null}
                </ListProducts> :
                // if list is empty then get random Products
                <div className="flex flex-col w-full p-3 font-bold text-xl h-80">
                    random fetch will be Add
                </div>
            }
        </div>
    )
}

export default Recent_Products
