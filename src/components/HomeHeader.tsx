import { useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from './static/SideBar'

const HomeHeader = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {open && <SideBar open={open} setOpen={setOpen} />}
      <div className='fixed top-0 lg:px-6 z-20 h-16 w-screen bg-[#6b4ba4] dark:bg-gary-400 flex flex-row items-center justify-between gap-2 px-3 py-2'>
        {!open ? 
          <i onClick={() => setOpen(true)} className="fa-solid fa-bars grow-1 text-lg cursor-pointer text-white"></i> : 
          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark grow-1 text-lg cursor-pointer text-white"></i>
        }
        <div className="flex flex-row gap-6 justify-between items-center p-1 text-[#cbcdda]">
          <Link to={'/'}><i className="fa-solid fa-home text-lg"></i></Link>
          <div className='text-center'>
            <i className="fa-solid fa-circle-user text-lg"></i>
            <span className='text-sm font-bold ps-1 text-white'>Guest</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeHeader