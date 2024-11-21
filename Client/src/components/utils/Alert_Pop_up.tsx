import React from 'react'

interface pop_up_type {
    content: string
    btnValues: btn[]
}
interface btn {
    btnText: string,
    btnColour: string,
    btnFun: (btnText: string) => void
}

const Alert_Pop_up: React.FC<pop_up_type> = ({ content, btnValues }) => {


    return (
        <div className='w-screen h-screen fixed top-0 flex justify-center items-center '>
            <div className="flex flex-col p-3 h-48 w-72 gap-4 bg-gray-700 rounded-md text-white justify-center  items-center">
                <h1 className=''>{content}</h1>

                <div className="flex flex-row p-2 w-full h-fit gap-2 justify-center items-center mt-2">

                    {btnValues.map((item,_) =>

                        <button key={_} onClick={() => item.btnFun(item.btnText)} style={{ backgroundColor: `${item.btnColour}` }} className={`rounded-md text-center text-md font-bold px-2 py-1 `}>{item.btnText}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Alert_Pop_up
