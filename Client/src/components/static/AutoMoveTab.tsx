// import React, { useEffect } from 'react'

const AutoMoveTab = () => {

const data=["babu",'kskjsbksf','sdkjsbkjsksj','kjbdfhdfmjk','kjbdfhdfmjk',"babu",'kskjsbksf','sdkjsbkjsksj','kjbdfhdfmjk','kjbdfhdfmjk']


  return (<div className="overflow-x-scroll hide-side-bar">
    <div  className=" flex flex-row gap-2 flex-nowrap  w-screen ">
    {data &&data.map((item,nu)=><div key={nu} className='min-w-[100%] lg:min-w-72 box-border h-72 lg:w-48 lg:h-64 flex flex-row  rounded-md  relative'>
      
      <img className='object-cover w-full inanimation rounded-lg lg:ps-2' src="https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&w=600" alt="currosile" />
      <div className="flex flex-row justify-between items-center ps-1 pe-4 absolute w-100% lg:w-48  w-invert  bottom-0 bg-gray-100/[.3] bg-blend-screen ">
        <div className="flex flex-col gap-1 ps-1 pe-4  ">
          <span className='text-black text-lg '>price</span>
          <span className='text-lg font-bold text-green-900'>Offer</span>
        </div>
        <i className="fa-solid fa-arrow-right-long text-lg"></i>
      </div>
    
  </div>)}
  </div>
  </div>

  )
}

export default AutoMoveTab
