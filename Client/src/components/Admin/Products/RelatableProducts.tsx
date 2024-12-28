import React, { Dispatch, SetStateAction, useRef } from 'react'
import ListProducts from '../../Products/ListProducts'


import { productType } from '../../utils/Types' 
import Loading from '../../static/Loading'


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
                    Rating={Rating}
                    likeShare={likeShare}
                    children={children}
                /> :
                <div className='h-screen w-screen flex justify-center items-center '>  <Loading />
            </div>
            }
        </div>
    )
}

export default RelatableProducts
