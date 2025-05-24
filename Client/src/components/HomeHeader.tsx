import  { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Context/authContextPrivider'
import SideBar from './static/SideBar'



const HomeHeader = () => {

  const headerRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {

  })
  const { user } = useAuthContext()

  useEffect(() => {
    const headerElement = headerRef.current;

    const handelClick = () => {
      setOpen(false)
    }

    if (headerElement) {
      headerElement.addEventListener('click', handelClick)
    }

    return () => {
      if (headerElement) {
        headerElement.removeEventListener('click', handelClick)
      }

    }

  }, [open])
  return (<div className='relative' >
    {open ? <SideBar open={open} setOpen={setOpen} /> : null}
    <div ref={headerRef} className='fixed top-0 lg:px-6 z-20  h-16 w-screen bg-[#6b4ba4] dark:bg-gary-400 flex flex-row items-center justify-between gap-2 px-3 py-2 '>
      {!open ? <i onClick={() => setOpen(!open)} className="fa-solid fa-bars grow-1 text-lg cursor-pointer"></i> : (<i onClick={() => setOpen(!open)} className="fa-solid fa-xmark grow-1 text-lg cursor-pointer"></i>)}

      <div className="flex flex-row gap-6 justify-between items-center p-1 text-[#cbcdda]">
        <Link to={'/'}> <i className="fa-solid fa-home text-lg"></i></Link>
        <Link to={'/cart'}> <i className="fa-solid fa-cart-shopping text-lg"></i></Link>
        <div className='text-center ' >
          <i className="fa-solid fa-circle-user text-lg "></i>
          {user._id ?
            <Link to={'#'}>
              <span className='font-bold ps-1 text-white text-sm'>Profile</span>
            </Link>
            :
            <Link to={'/login'}>
              <span className='text-sm font-bold ps-1 text-white'>Login</span>
            </Link>
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeHeader
