import React, { DetailsHTMLAttributes, FormEventHandler, useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PrevNext from '../../static/PrevNext';
import axios from 'axios';
import { useAuthContext } from '../../../Context/authContextPrivider';
// import pica from 'pica'


interface productType {
  Product_Name: string,
  MRP: string,
  Offer: string
  inStock: string,
  category: string,
  description: string
}

const AddProduct = () => {
  const formRef =useRef<HTMLFormElement>(null)

  const {setError,user}=useAuthContext()

  const [ProductDetails, setProductDetails] = useState<productType>({
    Product_Name: "",
    MRP: "",
    Offer: "",
    inStock: "",
    category: "",
    description:"",

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


  const [allBlobFile, setAllBlopFile] = useState<(string | ArrayBuffer | null | undefined)[]>()
  const [allImages, setAllImages] = useState<(string)[]>()


  const onDrop = useCallback((file: any[]) => {

if (file&&file.length>10&& Array.isArray(file)) {
  setError('your Upload over the limit it wil automatically delete over the limit !! limit is 10')
  file=file.slice(0,10)
}
console.log(file);

  setAllImages(file)
    
    const readfilePromise = file.map(item => {
      return new Promise<string | ArrayBuffer | null | undefined>((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = (event) => {
          const result = event.target?.result
          resolve(result)
        }
        fileReader.onerror = (error) => reject(error)
        fileReader.readAsDataURL(item)
      })

    })

    Promise.all(readfilePromise).then(results => {
      setAllBlopFile(results);
      console.log("All files as Data URLs:", allBlobFile);
    })
      .catch(error => console.error("Error reading files:", error));


  }, [])

  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });
  // console.log(allBlobFile);


  const [c_number, setC_number] = useState<number>(1)
  const [PictureN, setPictureN] = useState<number>(0)

  // console.log(typeof allBlobFile[0]);

const handlePictureNLess=()=>{
  if (PictureN>0) {
    setPictureN(PictureN-1)
  }else{
    setPictureN((allBlobFile?.length||0)-1)
  }
}
const handlePictureNPlus=()=>{
  
  if (PictureN<(allBlobFile?.length||0)-1) {
    setPictureN(PictureN+1)
  }else{
    setPictureN(0)
  }
}

//setProduct Details

const changeHandler=async(e:React.ChangeEvent<HTMLInputElement>)=>{

  setProductDetails({...ProductDetails,[e.target.name]:e.target.value});
}
const selectHandler=async(e:React.ChangeEvent<HTMLSelectElement>)=>{
  setProductDetails({...ProductDetails,[e.target.name]:e.target.value});
}


///removePic 
const removePic=async()=>{
  if (allBlobFile &&allBlobFile?.length>1) {
 const newAllBlop=   allBlobFile?.filter((item,index)=>{
   return index!==PictureN
    })
    setAllBlopFile(newAllBlop);
  }
}


//remove All pic

const removeAllPic=()=>{
  if (allBlobFile &&allBlobFile?.length>0) {
       setAllBlopFile([]);
     }
}


console.log(allImages);



///submit handler 
const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
console.log('enter');


const isAllString=Object.values(ProductDetails).filter(item=>typeof item==='string')

if (!isAllString) {
  return setError('fill string values')
}

const formData =new FormData()
formData.append('Product_Name',ProductDetails.Product_Name)
formData.append('MRP',ProductDetails.MRP)
formData.append('Offer',ProductDetails.Offer)
formData.append('inStock',ProductDetails.inStock)
formData.append('description',ProductDetails.description)
formData.append('category',ProductDetails.category)

const isValidImage = Array.isArray(allImages)



console.log(isValidImage);


if (isValidImage&& allImages.length>1) {
  
  allImages.forEach(item=>
    formData.append('Product_Image[]',item)
  )

}else if(isValidImage && allImages.length===1){
  formData.append('Product_Image[]',allImages[0])
}else{
  console.log('add images');
  console.log(allImages);
  
  
  return setError('add Images ')

}


console.log('sssssssssssssssssss');
const apiurl =import.meta.env.VITE_API_URL;

try {
  const response=await axios.post(`${apiurl}/api/product/addProduct`,formData,{withCredentials:true})

  console.log(response);
} catch (error) {
  console.log(error);
  setError((error as Error).message)
  
}
}
console.log(ProductDetails);

// console.log();


  return (
    <div className='w-100 h-100 mt-[65px] p-3  '>
      <h1>Products</h1>
      <div className='flex flex-row max-[700px]:flex-col p-2 gap-3  '>
        <div className=" flex flex-col  p-2 justify-start items-center min-h-fit grow flex-nowrap  border-2 border-gray-300 ">
          <div  className="flex flex-col justify-start p-2 grow items-start  rounded-2 relative overflow-hidden w-full ">
            <h1>Products Images </h1>
            <div className='flex flex-row justify-between items-center p-0 w-full '>
              {allBlobFile && allBlobFile.length > 1 ? <>
                <i onClick={handlePictureNLess} className="fa-solid fa-chevron-left text-lg hover:bg-gray-200 px-2 py-1"></i>
                <img src={allBlobFile && typeof allBlobFile[PictureN] === 'string' ? allBlobFile[PictureN] : "./image.png"} className='h-[250px] w-[200px] min-[1000px]:w-[600px]   rounded-md object-contain  ' alt="" />
                <i onClick={handlePictureNPlus} className="fa-solid fa-chevron-right text-lg z-20 hover:bg-gray-200 px-2 py-1  top-50 -right-0"></i>
              </>

                : <> 
                 {/* <i className="fa-solid fa-chevron-left text-lg hover:bg-gray-200 px-2 py-1"></i> */}
                  <img src={allBlobFile && typeof allBlobFile[0] === 'string' ? allBlobFile[0] : "./image.png"} className='max-h-[400px] max-w-[500px] min-[1000px]:w-[700px] max-[465px]:w-full  rounded-lg object-contain ' alt="" />
                  {/* <i className="fa-solid fa-chevron-right text-lg hover:bg-gray-200 px-2 py-1"></i> */}
                  </>}
            </div>
            <div {...getRootProps()}  className=' w-full rounded-lg bg-gray-300  h-16  flex items-center  mt-2 justify-center'>
              <input {...getInputProps()}   />
              <p > select more Files </p>
            {isDragActive ? (

              <div className="absolute w-full rounded-lg  h-full top-0 bg-gray-300 flex items-center justify-center opacity-75 text-gray-700 font-bold">
                Drop here
              </div>
            ) : null}

            </div>
            <div className="w-full items-center flex justify-center">

            <div className="flex flex-row gap-2 justify-between p-2">
              <button form={"formRef"} type='submit' className='bg-blue-300 rounded-md outline-none border-none px-3 py-2 '> Submit All </button>
              <button className='bg-blue-300 rounded-md outline-none border-none px-3 py-2 ' onClick={removeAllPic}>Remove All </button>
              <button className='bg-blue-300 rounded-md outline-none border-none px-3 py-2'  onClick={removePic}>Remove this </button>
            </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 justify-start items-start  min-h-100 grow flex-nowrap bg-sky-500">
          <form id={'formRef'} onSubmit={submitHandler} className='flex flex-col gap-2 p-2 rounded-lg grow w-full ' >
            <div className='flex flex-col gap-1    h-fit  '>

              <label htmlFor="Product_Name">Product_Name</label>
              <input onChange={changeHandler} type="text" className='rounded-md px-3 py-2 mt-2' name="Product_Name" id="Product_Name" />
            </div>
            <div className='flex flex-col  h-fit  '>
              <label htmlFor="MRP">MRPrice</label>
              <input  onChange={changeHandler} type="number" className='rounded-md px-3 py-2 mt-2' name="MRP" id="MRP" />
            </div>
            <div className='flex flex-col  h-fit   '>
              <label htmlFor="Offer">Offer</label>
              <input onChange={changeHandler} type="number" className='rounded-md px-3 py-2 mt-2' name="Offer" id="Offer" />
            </div>
            <div className='flex flex-col  h-fit  '>

              <label htmlFor="inStock">
                inStock
              </label>
              <input onChange={changeHandler} type="number" className='rounded-md px-3 py-2 mt-2' name="inStock" id="inStock" />
            </div>
            <div className='flex flex-col  h-fit  '>

              <label htmlFor="category">category</label>
              <select onChange={selectHandler}  name="category" className='rounded-md px-3 py-2 mt-2' id="category"  >
                {catogeryEnnum.map((item, index) => (
                  <option key={index} value={item}>{item}</option>))
                }
              </select>
            </div>
            <div className='flex flex-col  h-fit  '>

              <label htmlFor="description">description</label>
              <input onChange={changeHandler} type="text" className='rounded-md px-3 py-2 mt-2' name="description" id="description" />
            </div>

          </form>
        </div>
      </div>
      {/* <PrevNext t_number={10} c_number={c_number} setC_number={setC_number} btnLenght={3} color='blue' /> */}

    </div>
  )
}

export default AddProduct
