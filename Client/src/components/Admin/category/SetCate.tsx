import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuthContext } from '../../../Context/authContextPrivider';
import RowCategory from './RowCategory';

interface typecategory {
    _id: string,
    category: string,
    image: { imageURL: string },

}

interface getIndividualtypecate {
    category: string,
    cateItem: [typecategory]
}



const SetCate = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const scrollEll = useRef<HTMLDivElement>(null)

    const { setError } = useAuthContext()

    const [page, setPage] = useState<number>(1); 
    const [hasMore, setHasMore] = useState<boolean>(true);

    const [category, setCategory] = useState<typecategory[]>([])
    const [individualCategory, setindividualCategory] = useState<getIndividualtypecate[]>([])

    const [rowCatepage, setRowCatePage] = useState<number>(0)


    useEffect(() => {

        fetchCategory()
    }, [])


    const fetchCategory = async () => {

        try {
            let cancel;
            const response = await axios({
                method: 'GET',
                url: `${apiUrl}/api/controll/categoryimages`,
                // /?page=${page}
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
            if (response.data.category) {
                setCategory((prev) => [...prev, ...response.data.category]);
                response.data.category.forEach((item: getIndividualtypecate) => {
                    getIndividualCate(item.category.toString(), 0)
                })
                setPage(page + 1)
                if (response.data.category.length === 0) {
                    setHasMore(false);
                }
            }
            console.log(response);


        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }
    }
  const getIndividualCate = async (category: string, page: number) => {
console.log('ffffffffffffff');

        try {
            const response = await axios.get(`${apiUrl}/api/controll/categoryimages?page=${page}&category=${category}`)
            if (response.data.category) {
                setindividualCategory((prev) => [...prev, { category: category, cateItem: response.data.category }]);
                // setPage(page + 1)
                if (response.data.category.length === 0) {
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
                {/* <InfiniteScroll
                    dataLength={category.length}
                    next={fetchCategory}
                    hasMore={hasMore}
                    scrollableTarget='scrollEll'
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>End of feed</p>}
                > */}
                    {category.length>0&&category.map((item, index) =>
                    (<div key={index} className=" min-h-48 w-full flex flex-row gap-3 overflow-hidden p-1 border-2 border-blue-500  rounded-lg ">
                        <div className="flex flex-col h-48 justify-center items-center min-w-52  ">

                            <div className="flex     rounded-md h-[100%] min-w-[40%] overflow-hidden object-cover">
                                <img src={item.image.imageURL} alt="" className=' h-[100%] w-full' style={{ objectFit: "cover" }} />
                            </div>

                        </div>
                            <RowCategory individualCategory={individualCategory} Eachitem={item} getIndividualCate={getIndividualCate}/>
                       
                    </div>)
                    )}
                {/* </InfiniteScroll> */}
            </div>
        </div>
    )
}

export default SetCate
