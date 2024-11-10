import React, { ButtonHTMLAttributes } from 'react'

interface typeContent {
    btnLenght?: number,
    color?: string,
    c_number: number,
   setC_number:React.Dispatch<React.SetStateAction<number>>
    t_number: number,

}

const PrevNext: React.FC<typeContent> = ({ btnLenght = 2,
    color = 'yellow',
    c_number = 0,
    t_number = 1,
    setC_number }) => {

    console.log(btnLenght, color, c_number, t_number);

    const handlePrev = () => {
        if (c_number === 0) {
            return
        }
        setC_number(c_number - 1)
        
    }
    const handleNext = () => {
        if (c_number >= t_number) {
            return
        }
        setC_number(c_number + 1)
        
    }
    const handlelast = () => {
        if (c_number === t_number) {
            return
        }
        setC_number(t_number)
    }
    const specifyClick = (e:React.MouseEvent<HTMLButtonElement>,n:number) => {
        // if (n >= t_number) {
        //     return
        // }
        // if (n === 0) {
        //     return
        // }
        // if (n === t_number) {
        //     return
        // }
        // if (c_number === n) {
        //     return
        // }
        // setC_number(n)

        console.dir(e.currentTarget.classList.replace('bg-gray-500','bg-yellow-400'));
        
    }

    return (
        <div className='w-full h-full flex flex-row gap-1 '>
            <button onClick={handlePrev} className="bg-yellow-300 py-3 px-2 border-none outline-none rounded-lg">Prev</button>

            {
                Array.from({ length: btnLenght }).map((_, i) => (<button onClick={(e)=>specifyClick(e,i+c_number)} key={i} className={`${"bg-gray-500"}  py-3 px-2 border-none outline-none rounded-lg`}>
                    {c_number!==t_number ? i+c_number :c_number-i+btnLenght}
                </button>
                ))
            }
            <button onClick={handleNext} className="bg-yellow-300 py-3 px-2 border-none outline-none rounded-lg" >Next</button>

            {t_number >= 10 && <button onClick={handlelast} className="bg-yellow-300 py-3 px-2 border-none outline-none rounded-lg">last</button>}


        </div>
    )
}

export default PrevNext
