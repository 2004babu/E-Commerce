import { Link } from 'react-router-dom'

const SideBar = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  return (
    <div className="fixed top-0 z-10 w-screen bg-black-200/[0.2] h-screen flex flex-row justify-start">
      <div className="flex flex-col gap-4 pt-4 mt-2 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-md h-screen w-56 justify-start items-center ms-2">
        <div className="h-fit w-fit text-center font-bold p-2 rounded-md border-b-4 grow-1 border-b-gray-100">
          <span className='text-orange-400'><i className='fa-solid fa-store me-3'></i>Shop Me</span>
        </div>
        <ul className='w-100 h-100 flex flex-col p-2 gap-6 text-lg justify-center items-start'>
          <Link onClick={() => setOpen(false)} to={'/'}><li className='flex flex-row gap-5 items-center justify-start'><i className='fa-solid fa-home'></i>Home</li></Link>
          <Link onClick={() => setOpen(false)} to={'/product/category?q=Electronics'}><li className='flex flex-row gap-5 items-center justify-start'><i className='fa-solid fa-mobile'></i>Electronics</li></Link>
          <Link onClick={() => setOpen(false)} to={'/product/category?q=Computers'}><li className='flex flex-row gap-5 items-center justify-start'><i className='fa-solid fa-laptop'></i>Computers</li></Link>
          <Link onClick={() => setOpen(false)} to={'/product/category?q=Wearables'}><li className='flex flex-row gap-5 items-center justify-start'><i className='fa-solid fa-clock'></i>Wearables</li></Link>
        </ul>
      </div>
      <div onClick={() => setOpen(false)} className='p-10 grow'><i className='fa-solid fa-xmark text-3xl'></i></div>
    </div>
  )
}

export default SideBar