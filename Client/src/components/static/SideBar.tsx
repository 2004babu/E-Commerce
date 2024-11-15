import React from 'react'
import { Link, redirect, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../Context/authContextPrivider'
import axios from 'axios'

const SideBar: React.FC<{ open: boolean, isAdmin?: boolean, setOpen: (open: boolean) => void; }> = ({ open, isAdmin, setOpen }) => {
  const { user, error, setUser, setError, successMSG, setSuccessMSG } = useAuthContext()

  let login = false
  const locate = useLocation()
  const handleLogout = async () => {
    try {
      const apiurl =import.meta.env.VITE_API_URL;

      const res = await axios.get(`${apiurl}/api/auth/logout`, { withCredentials: true })

      if (!res?.data?.message) throw new Error('logout Failed')

      setSuccessMSG(res?.data?.message)
      setUser({
        _id: "",
        userName: "",
        email: "",
        Role: "",
        likes:[{product_id:''}],
        Cart:[{product_id:""}]
    })
      setError('')
      setSuccessMSG("Succesfully Logout ")
      setOpen(false)

    } catch (error) {
      console.log(error);
      setError((error as Error).message)


    }
  }
  console.log(locate);
  
  return (
    <div className="fixed top-0 z-10 w-screen bg-black-200/[0.2] h-screen  flex flex-row justify-start ">


      <div className={`  flex  flex-col gap-4  pt-4 mt-2 bg-black:/[0.3] bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-md h-screen w-56 justify-start items-center ms-2  ${(open && isAdmin ? 'max-[465px]:hidden' : '')}`}>
        <div className="h-fit w-fit  text-center font-bold p-2 rounded-md  border-b-4 grow-1 border-b-gray-100">
          {login ? "Shop Me" : <span className='text-orange-400'><i className='fa-solid fa-user me-3'></i> login & SignUp</span>}
        </div>
        <ul className='w-100 h-100 flex flex-col p-2 gap-6  text-lg justify-center items-start '>
          {user && user.Role === 'Admin' ? <Link to={'/dashboard'}><li onClick={() => setOpen(false)} className='flex flex-row gap-5 items-center justify-start'> <i className='fa-solid fa-heart'></i>Dashboard</li></Link> : null}

          { locate.pathname==='/dashboard'&&<Link onClick={() => setOpen(false)} to={'/'}><li className='flex flex-row gap-5 items-center justify-start'> <i className='fa-solid fa-heart'></i>Home</li></Link>}   
          
          <Link onClick={() => setOpen(false)} to={'#'}><li className='flex flex-row gap-5 items-center justify-start '> <i className='fa-solid fa-user '></i>Profile</li></Link>

          <Link onClick={() => setOpen(false)} to={'/liked'}><li className='flex flex-row gap-5 items-center justify-start'> <i className='fa-solid fa-heart'></i>liked</li></Link>

          <Link onClick={() => setOpen(false)} to={'/cart'}><li className='flex flex-row gap-5 items-center justify-start'><i className='fa-solid fa-cart-shopping'></i>Cart</li></Link>

          <Link onClick={() => setOpen(false)} to={'#'}><li className='flex flex-row gap-5 items-center justify-start'><i className='fa-solid fa-clock-rotate-left'></i> Recent</li></Link>

          <Link onClick={handleLogout} to={'#'}><li className='flex flex-row gap-5 items-center justify-start'> <i className='fa-solid fa-arrow-right'></i>logout</li></Link>
        </ul>
      </div>
      <div onClick={() => setOpen(false)} className=' p-10 grow '> <i className='fa-solid fa-xmark  text-3xl'></i></div>
    </div>
  )
}

export default SideBar
