import axios from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Waypoint } from 'react-waypoint';
import { useAuthContext } from '../../../Context/authContextPrivider';

interface typecategory {
    _id: string,
    category: string,
    image: { imageURL: string },

}

interface getIndividualtypecate{
    category:string,
    cateItem:[typecategory]
}



const SetCate = () => {

    const scrollEll = useRef<HTMLDivElement>(null)
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setError } = useAuthContext()

    const [page, setPage] = useState<number>(1); // Track the current page
    const [hasMore, setHasMore] = useState<boolean>(true);

    const [category, setCategory] = useState<typecategory[]>([])
    const [individualCategory, setindividualCategory] = useState<getIndividualtypecate[]>([])

    useEffect(() => {

        fetchCategory()

    }, [])


    const fetchCategory = async () => {

        try {
            let cancel;
            const response = await axios({
                method: 'GET',
                url: `${apiUrl}/api/controll/categoryimages?page=${page}`,
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
            if (response.data.category) {
                setCategory((prev) => [...prev, ...response.data.category]);
                setPage(page + 1)
                if (response.data.category.length === 0) {
                    setHasMore(false);
                }
            }
            console.log(response);


        } catch (error) {
            console.log(error);
        }
    }

    // console.log(category);

    
    async function getIndividualCate(category: string,page:number) {
        console.log('fddddddddddddddddddddddddd');
        
        try {
            const response = await axios.get(`${apiUrl}/api/controll/categoryimages?page=${page}&category=${category}`)
            if (response.data.category) {
                setindividualCategory((prev) => [...prev, {category:category,cateItem:response.data.category}]);
                // setPage(page + 1)
                
                if (response.data.category.length === 0) {
                    // setHasMore(false);
                }
            }
            console.log(response);
        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }
    }

    console.log(individualCategory);
    

    return (
        <div ref={scrollEll} id='scrollEll' className='h-screen w-screen overflow-x-hidden hide-side-bar '>
            <div className="w-full h-full mt-[65px] flex flex-col  gap-3 p-2  ">
                <InfiniteScroll
                    dataLength={category.length}
                    next={fetchCategory}
                    hasMore={hasMore}
                    scrollableTarget='scrollEll'
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>End of feed</p>}
                >
                    {category.length>0&&category.map((item, index) =>
                    (<div key={index} className=" min-h-48 w-full flex flex-row gap-3 overflow-hidden p-1 border-2 border-blue-500  rounded-lg ">
                        <div className="flex flex-col h-48 justify-center items-center min-w-52  ">

                            <div className="flex     rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src={item.image.imageURL} alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div>

                        </div>
                        <div className="flex flex-row flex-nowrap gap-3 h-48 p-2 hide-side-bar items-start grow  overflow-x-scroll overflow-y-hidden  ">
                            <InfiniteScroll
                                     dataLength={individualCategory.find(cate=>cate.category===item.category)?.cateItem.length||0}
                                    next={()=>getIndividualCate(item.category.toString(),0)}
                                    hasMore={true}
                                    loader={<h4>Loading...</h4>}
                                    endMessage={<p>End of feed</p>}
                                >
                                  {individualCategory.find(cate=>cate.category===item.category)?.cateItem.map(cate=>
                                  
                                    <div className="flex  bg-yellow-500   rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                        <img src={cate.image.imageURL} alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                                    </div>
                                    
                                  )}
                                </InfiniteScroll>
                            {/* <div className="flex  bg-yellow-500   rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src={item.image.imageURL} alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div>
                            <div className="flex  bg-yellow-500   rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src="http://localhost:9000/uploads/category/1.webp" alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div>
                            <div className="flex  bg-yellow-500   rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src="http://localhost:9000/uploads/category/1.webp" alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div>
                            <div className="flex  bg-yellow-500   rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src="http://localhost:9000/uploads/category/1.webp" alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div>
                            <div className="flex  bg-yellow-500   rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src="http://localhost:9000/uploads/category/1.webp" alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div> */}
                        </div>
                    </div>)
                    )}
                </InfiniteScroll>
                {/* <Waypoint onEnter={fetchCategory} /> */}
            </div>
        </div>
    )
}

export default SetCate
