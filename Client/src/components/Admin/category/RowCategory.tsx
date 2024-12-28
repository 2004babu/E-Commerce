// import React from 'react'
// import InfiniteScroll from 'react-infinite-scroll-component'
// interface typecategory {
//     _id: string,
//     category: string,
//     imageUrl: string

// }

// interface getIndividualtypecate {
//     category: string,
//     cateItem: typecategory[]
// }

// interface catetype {
//     individualCategory: getIndividualtypecate[]
//     , getIndividualCate: (category: string, page: number) => Promise<void>,
//     Eachitem: { category: string }
// }

// const RowCategory: React.FC<catetype> = ({ individualCategory, getIndividualCate, Eachitem }) => {

//     // return (
//     //     <div id='cateRow' className="flex flex-row flex-nowrap gap-3 h-48 p-2 hide-side-bar items-start grow bg-red-900 overflow-x-scroll overflow--hidden  ">
//     //         <InfiniteScroll
//     //             dataLength={individualCategory.find(cate => cate.category === Eachitem.category)?.cateItem.length || 0}
//     //             next={() => getIndividualCate(Eachitem.category.toString(), 2)}
//     //             hasMore={true}
//     //             scrollableTarget='cateRow'
//     //             loader={<h4>Loading...</h4>}
//     //             endMessage={<p>End of feed</p>}
//     //         >
//     //             {individualCategory.find(cate => cate.category === Eachitem.category)?.cateItem?.map((cate, index) =>

//     //                 <React.Fragment key={index}>
//     //                     <div className="flex bg-yellow-500 rounded-md h-[40%] min-w-[40%]  object-cover">
//     //                         <img src={cate.image.imageURL} alt="" className='h-[40%] w-full' style={{ objectFit: "cover" }} />
//     //                     </div>

//     //                 </React.Fragment>
//     //             ) || (
//     //                     <p>No items found for category {Eachitem.category}</p>
//     //                 )}

//     //         </InfiniteScroll>
//     //     </div>
//     // )

//     return (
//         // <div id="cateRow" className=" ">
//             <InfiniteScroll
//             className='flex flex-row gap-3 h-48  hide-side-bar w-full items-start grow  overflow-x-scroll overflow-y-hidden'
//                 dataLength={individualCategory.find(cate => cate.category === Eachitem.category)?.cateItem.length || 0}
//                 next={() => getIndividualCate(Eachitem.category.toString(), individualCategory.find(cate=>cate.category===Eachitem.category)?.cateItem?.length ||0)}
//                 hasMore={true}
//                 // scrollableTarget="cateRow"
//                 loader={<h4>Loading...</h4>}
//                 endMessage={<p>End of feed</p>}
//             >
//                 {individualCategory.find(cate => cate.category === Eachitem.category)?.cateItem?.map((cate, index) => (
//                         <div key={index} className="  rounded-md max-h-[50%] min-h-[50%]  min-w-[40%]">
//                             <img src={cate?.imageUrl[0]} alt="" className="max-h-[50%] min-h-[50%] w-full" style={{ objectFit: "contain" }} />
//                         </div>
//                 )) || (
//                     <p>No items found for category {Eachitem.category}</p>
//                 )}
//             </InfiniteScroll>
//         //  </div>
//     );
// }

// export default RowCategory
