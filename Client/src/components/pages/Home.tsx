import React, { useEffect, useRef, useState } from 'react'
import HomeHeader from '../HomeHeader'
import SideBar from '../static/SideBar'
import HomeGategory from '../static/HomeGategory'
import Search from '../static/Search'
import AutoMoveTab from '../static/AutoMoveTab'

const Home = () => {    
    const [search,setSearch]=useState<string>('')

  return (
    <>
      
    <div   className='flex flex-col w-screen h-fit gap-3 mt-[62px]'>
        <Search search={search} setSearch={setSearch}/>
      <HomeGategory/>
      <AutoMoveTab/>
      </div>
    </>
  )
}

export default Home
