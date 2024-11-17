import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ListProducts from '../../Products/ListProducts'
import axios from 'axios'
import { useAuthContext } from '../../../Context/authContextPrivider'
import { jsx } from 'react/jsx-runtime'


import { productType } from '../../utils/Types' 


interface RelatableTtype {
    RelatedProduct: productType[],
    fetchRelatedProduct: () => (void),
    RelatedhasMore: boolean,

    setRelatedProduct: Dispatch<SetStateAction<productType[]>>
    likeShare?: boolean,
    Rating?: boolean,
    children?: React.ReactNode,
    endMSG?: React.ReactNode

}
const RelatableProducts: React.FC<RelatableTtype> = ({
    RelatedProduct,
    fetchRelatedProduct,
    RelatedhasMore,
    setRelatedProduct, likeShare = true,
    Rating = false, children, endMSG
}) => {

    const Related_Products = useRef<HTMLDivElement>(null);

    return (
        <div id='Related_Products' ref={Related_Products} className="flex flex-row overflow-x-scroll overflow-y-hidden hide-side-bar   p-2 w-full h-full border-t-2 border-gray-300 relative flex-nowrap mt-[100px]">
            <h1 className='absolute top-15 left-5 z-10 font-bold text-lg'>
                Related Products
            </h1>
            {RelatedProduct && RelatedProduct.length ?
                <ListProducts
                    parentEl='Related_Products'
                    className="flex flex-row p-2  justify-start items-start gap-3 mt-[65px]"
                    scrollFunc={fetchRelatedProduct}
                    endMSG={endMSG}
                    haseMore={RelatedhasMore}
                    Product={RelatedProduct}
                    setProduct={setRelatedProduct}
                /> :
                <div className="flex flex-col w-full p-3 font-bold text-xl h-80">
                    random fetch will be Add
                </div>
            }
        </div>
    )
}

export default RelatableProducts
