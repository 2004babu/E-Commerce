import React, { ReactNode, useState } from 'react'

interface typeFilterHeader {
    children: ReactNode,
    className:string
}

const FilterHeader: React.FC<typeFilterHeader> = ({ children,className }) => {

    const [FilterOpen, setFilterOpen] = useState<boolean>(false)

    return (

        <div className='flex flex-col w-full h-full p-1 justify-start items-center rounded-md border-2 border-gray-400  p-2'>
            <div className={className}>
                <div className="flex ">
                    Product Name
                </div>
                <div  className="flex flex-row justify-between items-center gap-3 flex-row-reverse select-none">
                    <i onClick={(e) => { 
                        e.stopPropagation()
                        setFilterOpen(!FilterOpen)}} className='fa-solid fa-bars cursor-pointer'></i>
                        {FilterOpen &&
                            <span>
                                 Newest -Oldest
                            </span>
                            
                            }
                </div>

            </div>
            {children}
        </div>
    )
}

export default FilterHeader
