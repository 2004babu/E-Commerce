import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Context/authContextPrivider'
import SideBar from './static/SideBar'



const HomeHeader=() => {

const headerRef=useRef<HTMLDivElement>(null)

const [open, setOpen] = useState<boolean>(false)
useEffect(()=>{

})

useEffect(()=>{
    const headerElement =headerRef.current;

    const handelClick=()=>{
        setOpen(false)
    }

    if (headerElement) {
        headerElement.addEventListener('click',handelClick)
    }
    
    return ()=>{
        if (headerElement) {
            headerElement.removeEventListener('click',handelClick)
        }
       
    }

},[setOpen])
  return (<>
    {open ? <SideBar open={open} setOpen={setOpen}/> :null} 
    <div ref={headerRef} className='fixed top-0 lg:px-6 z-20  h-16 w-screen bg-[#6b4ba4] dark:bg-gary-400 flex flex-row items-center justify-between gap-2 p-2 '>
      {!open ?<i  onClick={()=>setOpen(!open)} className="fa-solid fa-bars grow-1 text-lg cursor-pointer"></i>:(<i  onClick={()=>setOpen(!open)} className="fa-solid fa-xmark grow-1 text-lg cursor-pointer"></i>)}

      <div className="flex flex-row gap-6 justify-between items-center p-1 text-[#cbcdda]">
     <Link to={'/'}> <i className="fa-solid fa-home text-lg"></i></Link>
     <Link to={'/cart'}> <i className="fa-solid fa-cart-shopping text-lg"></i></Link>
      <Link to={'/login'}>    
       <div>
        <i className="fa-solid fa-circle-user text-lg "></i>
             <span  className='font-bold ps-1 text-white'>Login</span> 
        </div>
      </Link>
      </div>
    </div>
  </>
  )
}

export default HomeHeader
