
const AutoMoveTab = () => {

const data=["10%",'20%','30%','40%','50%',"60%",'70%','80%','90%','100%']


  return (<div className="overflow-x-scroll hide-side-bar">
    <div   className=" flex flex-row gap-2 flex-nowrap  w-screen  "> 
    {data &&data.map((item,nu)=><div key={nu} className='  min-w-[100%] lg:min-w-72 box-border h-72 lg:w-48 lg:h-64 flex flex-row  rounded-md  relative'>
      <span className="absolute z-1 top-[50%] font-bold text-[30px] text-gray-800 left-44"> Feature will be add!</span>
      
      <img className='object-cover w-screen inanimation rounded-lg lg:ps-2 opacity-65' src="./image.png" alt="currosile" />
      <div className="flex flex-row justify-between items-center ps-1 pe-4 absolute w-100% lg:w-48  w-invert  bottom-0 bg-gray-100/[.3] bg-blend-screen ">
        <div className="flex flex-col gap-1 ps-1 pe-4  ">
          <span className='text-black text-lg '>price</span>
          <span className='text-lg font-bold text-green-900'>Offer {item}</span>
        </div>
        <i className="fa-solid fa-arrow-right-long text-lg"></i>
      </div>
    
  </div>)}
  </div>
  </div>

  )
}

export default AutoMoveTab
