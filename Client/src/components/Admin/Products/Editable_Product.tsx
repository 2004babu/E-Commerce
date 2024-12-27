import  { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../../Context/authContextPrivider'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { productType } from '../../utils/Types'
import { useDropzone } from 'react-dropzone'
import HandleHoverBtn from '../../utils/HandleHoverBtn'
import { Slide, toast } from 'react-toastify'
import CryptoJS from 'crypto-js'


const Editable_Product = () => {

    const navigate = useNavigate()
    const apiurl = import.meta.env.VITE_API_URL
    const useQuery = async () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()
    const location = useLocation()

    const StatusProduct = ["Publish", "Schedule", "Processing", "Waiting", "Private"]

    const [ImageN, setImageN] = useState<number>(0)

    const [isEdited, setIsEdited] = useState<boolean>(false)

    const { setError } = useAuthContext()
    const [imgRefresh, setimgRefresh] = useState<boolean>(true)
    const [removedAll, setRemovedAll] = useState<boolean>(false)
    const [changeImage, setChangeImage] = useState<boolean>(false)

    // const [DiscardChanges, setDiscardChanges] = useState<boolean>(false)
    
    const [isValueset, setisValueSet] = useState<boolean>(false)
    // const [isValuesetSubmited, setisValueSubmited] = useState<boolean>(true)
    const [addNewImage, setAddNewImage] = useState<boolean>(false)
    const [ProductDetails, setProductDetails] = useState<productType>({
        _id: "",
        Price: {
            MRP: "",
            Offer: ""
        },
        inStock: "",
        category: "",
        description: "",
        imageUrl: [""],
        Product_Name: "",
        P_Status: "",
        Comments: [{ userId: "", _id: "", comment: "", userName: "", likes: [{ userId: "" }] }],
        Ratings: [{ userId: "", _id: "", Rate: 0 }],
        likedBy: [{ userId: "", _id: "" }],
        totalRate: 0,

    })
    const [preEditProductDetails, setPreEditProductDetails] = useState<productType>({
        _id: "",
        Price: {
            MRP: "",
            Offer: ""
        },
        inStock: "",
        category: "",
        description: "",
        imageUrl: [""],
        Product_Name: "",
        P_Status: "",
        Comments: [{ userId: "", _id: "", comment: "", userName: "", likes: [{ userId: "" }] }],
        Ratings: [{ userId: "", _id: "", Rate: 0 }],
        likedBy: [{ userId: "", _id: "" }],
        totalRate: 0,

    })

    const catogeryEnnum = [
        "Electronics",
        "Computers",
        "Wearables",
        "Accessories",
        "Health",
        "Footwear",
        "Kitchen",
        "Gaming Laptop",
        "Dress",
        "Mobile",
        "Gadgets",
        "Food",
        "Toys",
        "Camara",
      ]
    console.log('RomoveAlladd', addNewImage);

    // const fucSetRemovedAll = () => {
    //     if (removedAll) {
    //         console.log('enterd');

    //         setRemovedAll(false)
    //         setProductDetails({ ...ProductDetails, imageUrl: [] })
    //     } else {
    //         console.log('not Entered');

    //     }
    // }

    const onDrop = useCallback((file: any[]) => {
        console.log('RomoveAll', removedAll);

        if (file.length > 10 && Array.isArray(File)) {
            setError('your Upload over the limit it wil automatically delete over the limit !! limit is 10')
            file = file.slice(0, 10)
        }




        file.forEach(async (item) => {
            const fileReader = new FileReader()
            console.log(ProductDetails);

            fileReader.onload = () => {
                const result = fileReader.result

                if (typeof result === 'string') {
                    console.log(result);

                    setProductDetails((prev) => ({ ...prev, imageUrl: [result, ...prev.imageUrl] }))
                }
            }

            fileReader.readAsDataURL(item)
        }
        )




setIsEdited(true)
    }, [])

    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const response = await axios.get(`${apiurl}/api/product/p/${(await query).get('id')}`, { withCredentials: true })

                //this one for recent history session log///
                 await axios.get(`${apiurl}/api/product/viewlog?viewId=${(await query).get('id')}`, { withCredentials: true })


                if (response.data.product) {
                    setProductDetails(response.data.product)
                    setimgRefresh(false)
                }
            } catch (error) {
                console.log(error);
                setError((error as Error).message)
            }
        }
        fetchProduct()
    }, [])






    useEffect(() => {
        if (ProductDetails?._id && !isValueset) {
            setPreEditProductDetails({ ...ProductDetails })
            setisValueSet(true)
            
        }
    }, [ProductDetails])

    useEffect(() => {
        if (ProductDetails?.imageUrl?.length && preEditProductDetails?.imageUrl?.length && imgRefresh) {
            let f: boolean = true
            for (let i = 0; i < ProductDetails.imageUrl.length; i++) {
                console.log();

                f = ProductDetails.imageUrl[i] === preEditProductDetails.imageUrl[i]

            }
            setimgRefresh(f);

        }
    }, [preEditProductDetails, ProductDetails, imgRefresh])
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {

        setFeedback(detectWeirdness(e.target.value))
        setIsEdited(true)

        if (e.target.name === 'MRP' || e.target.name === 'Offer') {
            setProductDetails({
                ...ProductDetails, Price: { ...ProductDetails.Price, [e.target.name]: e.target.value }
            })
            return
        }
        // setProductDetails({...ProductDetails,[e.target.name]:e.target.value});
        setProductDetails({
            ...ProductDetails, [e.target.name]: e.target.value,
        })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setIsEdited(true)

        setProductDetails({
            ...ProductDetails, [e.target.name]: e.target.value,
        })
    }

    const handleImageRight = () => {
        if (ProductDetails?.imageUrl?.length > 1 && ImageN < ProductDetails?.imageUrl?.length - 1) {
            setImageN(ImageN + 1)

        }

    }
    const handleImageLeft = () => {
        if (ImageN > 0) {
            setImageN(ImageN - 1)
        }
    }
    const handleRemoveSingleIMG = () => {
        setIsEdited(true)

        console.log('Remove This');

        setProductDetails((prevDetails) => ({
            ...prevDetails,
            imageUrl: prevDetails.imageUrl.filter((_, index) => index !== ImageN),
        }));

    }
    const handleRemoveAllIMG = () => {
        setIsEdited(true)

        console.log('Remove All');
        setProductDetails({ ...ProductDetails, imageUrl: preEditProductDetails.imageUrl.filter((_, index) => index === ImageN) })
        setRemovedAll(true)
        setimgRefresh(false)

    }
    const handleRefreshIMG = () => {

        setProductDetails({ ...ProductDetails, imageUrl: preEditProductDetails.imageUrl })
        setRemovedAll(false)
        setimgRefresh(true)

        console.log('refresh');

    }

    //future will be Add alert box 

    // const handleNavigation=async()=>{
    //     console.log('dddddddddddd');
    //     const confirmLeave= await confirm('aerrrrrrrrrrrr')


    //     if (!confirmLeave) {
    //         // navigate(1)
    //     }
    // }


    // useEffect(() => {
    //     // Add popstate listener to detect back/forward navigation
    //     window.addEventListener("popstate", handleNavigation);
    //     console.log('eeeeeeeeeeeeeee');


    //     // Cleanup listener on component unmount
    //     return () => {
    //         window.removeEventListener("popstate", handleNavigation);
    //     };
    // }, [isEdited]);
    // const btnFuc = (name: string) => {
    //     console.log(name);

    // }


    ///input text appears "weird" or "different" and provide feedback

    const [feedback, setFeedback] = useState<{ message: string, isHuman: boolean }>({ message: "", isHuman: false });

    const detectWeirdness = (text: string): { message: string, isHuman: boolean } => {
        if (!text) return { message: "", isHuman: false };

        const patterns = [
            { regex: /[@#$%^&*()_+=]{4,}/, message: "Contains too many special characters" },
            { regex: /[A-Z]{50,}/, message: "Excessive use of capital letters" },
            { regex: /(.)\1{9,}/, message: "Repeated characters detected" },
            { regex: /\b\w{50,}\b/, message: "Unusually long words detected" },
            { regex: /^[^a-zA-Z0-9\s]+$/, message: "Appears to be gibberish or symbols" },
        ];


        for (const pattern of patterns) {
            if (pattern.regex.test(text)) {
                return { message: pattern.message, isHuman: false }
            }
        }

        return { message: "Looks like a human wrote this!", isHuman: true }
    };


    useEffect(() => {
        if (feedback.message.length && !feedback.isHuman) {
            toast(feedback.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "dark",
                transition: Slide,
            });
        }
    }, [feedback])


    const submitChanges = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!isEdited)return

        // check data isEdit or Not by using index of our object value 

        const generateHash =async(obj:any)=>{
            const json=JSON.stringify(obj,Object.keys(obj).sort())
            return CryptoJS.SHA256(json).toString(CryptoJS.enc.Hex); 

        }
        console.log('fffffffff');

     async   function areObjectsEqual(obj1:any, obj2:any) {
            const hash1 = generateHash(obj1);
            const hash2 = generateHash(obj2);
            
            return await hash1 === await hash2;
          }
        
          const checkIsEdited = await areObjectsEqual(preEditProductDetails,ProductDetails)

       
          if(checkIsEdited) {
            setError('Change Detail then Submit!')
            return setIsEdited(false)
          }
        
        try {
          const formData = new FormData()
            formData.append('Product_Name', ProductDetails.Product_Name)
            formData.append('MRP', ProductDetails.Price.MRP)
            formData.append('Offer', ProductDetails.Price.Offer)
            formData.append('inStock', ProductDetails.inStock)
            formData.append('description', ProductDetails.description)
            formData.append('category', ProductDetails.category)
            formData.append('P_Status', ProductDetails.P_Status)

            const isValidImage = Array.isArray(ProductDetails.imageUrl)

            if (isValidImage && ProductDetails.imageUrl.length > 1) {

                ProductDetails.imageUrl.forEach(item =>
                    formData.append('Product_Image[]', item)
                )

            } else if (isValidImage && ProductDetails.imageUrl.length === 1) {
                formData.append('Product_Image[]', ProductDetails.imageUrl[0])
            } else {
                        return setError('add Images ')

            }
            const response = await axios.patch(`${apiurl}/api/product/edit?id=${(await query).get('id')}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

            if (response.data.product) {
                setProductDetails(response.data.product)
                setPreEditProductDetails(response.data.product)
                
                setIsEdited(false)
                setRemovedAll(false)
                setimgRefresh(false)
            }

        } catch (error) {
            console.log(error);
            setError((error as Error).message)
        }
    }
    return (
        <>
            {ProductDetails && <div className='h-screen w-screen flex-col max-[750px]:overflow-y-scroll hide-side-bar  min-[750px]:flex-row flex gap-2 '>
                <div>
                    <div className="flex flex-row p-2 px-4 mt-[65px] h-[70px] w-full justify-between items-center border-b-2 border-gray-300 ">
                        <i onClick={() => navigate(location?.state?.from || '/')} className='fa-solid fa-arrow-left'></i>


                    </div>
                    {ProductDetails.imageUrl.length > 1 ?
                        <div className={`relative flex h-96 flex-row p-2 px-4 justify-between items-center gap-1 select-none ${removedAll ? 'opacity-20' : ''} `}>
                            <i onClick={handleImageLeft} className='fa-solid fa-chevron-left w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i>

                            <div className="img w-80 h-96 rounded-lg  min-[750px]:h-full">
                                <img src={ProductDetails.imageUrl[ImageN] ?? "./image.png"} alt="product image" className='h-96 w-80 object-contain object-center min-[750px]:h-full  ' />
                            </div>
                            {removedAll && <h1 className='absolute text-sm  top-[50%] right-[50%]'>opacity</h1>}


                            <i onClick={handleImageRight} className='fa-solid fa-chevron-right w-10 bg-gray-200   px-1 py-3  flex justify-center items-center '></i>
                        </div> : <div className={`flex flex-row p-2 px-4 justify-between items-center gap-1 select-none ${removedAll ? 'opacity-20' : ''} relative`}>

                            <div className="img w-80 bg-gray-900 h-96 min-[750px]:h-full">
                                <img src={ProductDetails.imageUrl[0] ?? "./image.png"} alt="product image" className='h-96 w-80 object-cover min-[750px]:h-full  ' />
                            </div>

                            {removedAll && <h1 className='absolute  text-sm font-bold  min-[750px]:right-[10%] top-[50%] right-[50%]'>Add New Image to Click me !!</h1>}
                        </div>}
                </div>
                <div className="flex flex-col gap-4 mt-2 p-4 min-[750px]:mt-[65px] min-[750px]:overflow-x-hidden hide-side-bar  min-[750px]:overflow-none">
                    <input name='Product_Name' placeholder='Product_Name' value={ProductDetails.Product_Name} onChange={handleChange} className='border-none outline-none  text-2xl font-bold' />


                    
                    <div className='flex flex-row gap-2 text-md font-bold items-center text-[20px]'>
                        $   <input type='number' name='MRP' placeholder='MRP' className='border-none outline-none ' value={ProductDetails.Price.MRP ?? ""} onChange={handleChange} />
                        %  <input type='number' name='Offer' placeholder='Offer' className='border-none outline-none' value={ProductDetails.Price.Offer ?? ""} onChange={handleChange} />

                    </div>
                    <div className="bg-[#388e3c] font-bold text-md rounded-sm text-white flex flex-row gap-1 px-2 py-1 justify-center items-center w-fit">

                        {ProductDetails.totalRate} <i className='fa-solid fa-star'></i>
                    </div>
                    <div className='text-wrap w-full flex flex-col gap-3 items-start justify-center w-full  '>

                        <input name='description' placeholder='description' className='border-none outline-none text-pretty text-sm w-full' value={ProductDetails.description} onChange={handleChange} style={{ wordWrap: "break-word" }} />
                        <select name='P_Status' value={ProductDetails.P_Status} onChange={handleSelect} className='border-none outline-none text-2xl font-bold w-fit' >
                            {StatusProduct.map(item => <option key={item} className='text-sm font-semibold' value={item}>{item}</option>)}
                        </select>
                        <select name='category' value={ProductDetails.category} onChange={handleSelect} className='border-none outline-none text-2xl font-bold w-fit' >
                            {catogeryEnnum.map(item => <option key={item} className='text-sm font-semibold' value={item}>{item}</option>)}
                        </select>
                        <input name='inStock' type='number' placeholder='inStock' value={ProductDetails.inStock} onChange={handleChange} className='border-none outline-none text-2xl font-bold' />
                    </div>

                    <div onClick={() => setChangeImage(!changeImage)} className="flex flex-row p-2 justify-start gap-4 items-center">
                        <span className='font-bold text-md '>ChangeImage</span>
                        {!changeImage ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                    </div>
                    {/* ///chaneg Iimage */}
                    <div className="flex flex-row w-full gap-2 p-2 h-fit">
                        <button onClick={handleRemoveSingleIMG} onMouseEnter={(e) => HandleHoverBtn(e, 'Romove This Image !')} onMouseLeave={(e) => HandleHoverBtn(e)} className="p-2  bg-blue-600 rounded-md hover:bg-blue-800 text-[12px]  ">Remove this</button>
                        <button onClick={handleRemoveAllIMG} onMouseEnter={(e) => HandleHoverBtn(e, 'Romove All Image !')} onMouseLeave={(e) => HandleHoverBtn(e)} className="p-2  bg-blue-600 rounded-md hover:bg-blue-800 text-[12px]">Remove All</button>
                        {!addNewImage ?
                            <button onMouseEnter={(e) => HandleHoverBtn(e, 'Add Image !')} onMouseLeave={(e) => HandleHoverBtn(e)} onClick={() => setAddNewImage(!addNewImage)} className="p-2  bg-blue-600 rounded-md hover:bg-blue-800 text-[12px]">Change Img
                            </button>
                            :
                            <button onMouseEnter={(e) => HandleHoverBtn(e, 'Close Add Image options !')} onMouseLeave={(e) => HandleHoverBtn(e)} onClick={() => setAddNewImage(!addNewImage)} className="p-2  bg-blue-600 rounded-md hover:bg-blue-800 text-[12px]">Close
                            </button>
                        }
                        <button disabled={imgRefresh} onClick={handleRefreshIMG} onMouseEnter={(e) => HandleHoverBtn(e, 'refresh TO get Old Images !')} onMouseLeave={(e) => HandleHoverBtn(e)} className={`p-2 ${imgRefresh? 'cursor-not-allowed':"hover:bg-gray-300 cursor-pointer"}    rounded-md  text-[12px]`}><i className='fa-solid fa-arrows-rotate'></i></button>

                    </div>
                    {addNewImage && <>
                        <div {...getRootProps()} className='flex flex-row w-full h-14 border-2 border-black border-dashed rounded-md'>
                            <input {...getInputProps()} type="file" placeholder='select File' />
                        </div>
                        {isDragActive && <p>dropzone here</p>}
                    </>}
                {isEdited&&<button type='submit' className='bg-green-400 rounded-md px-2 py-1 text-md font-bold' onClick={submitChanges}>submit</button>}
                </div>

            </div>}

            {/* Future will be add alert box when I navigate backward or forward if where we changed */}
            {/* <Alert_Pop_up content='Sure Want To go Back !' btnValues={[{btnColour:'black',btnFun:btnFuc,btnText:"discard" },{btnColour:'green',btnFun:btnFuc,btnText:"Continue" }]}/> */}
        </>
    )
}

export default Editable_Product

