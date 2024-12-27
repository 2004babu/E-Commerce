import React, { ReactNode } from 'react'
import { useAuthContext } from '../../Context/authContextPrivider'
import Home from '../pages/Home'
import Login from '../auth/Login'

interface authTypeCheck{
    children: ReactNode,
    requiredRole?:string 
}

const IsAuthUser:React.FC<authTypeCheck> = ({ children ,requiredRole='user'}) => {

    const { user } = useAuthContext()
// console.log(children);


    if (user?._id) {

        if (requiredRole==='Admin'&&user?.Role!==requiredRole) {
            return <Home/>
        }
            
        return children
    }
    
    return <Login/>
    //make admin Acces in user?.admin there and how set in varios access and how to diffrenciate admin ,normal user 

}

export default IsAuthUser
