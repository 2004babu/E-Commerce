import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


interface authState{
  email:string,
  userName:string,
  password:string,
  c_password:string

}

const SignUp = () => {
  
  const [formData,setFormData]=useState<authState>({email:"",password:"",userName:"",c_password:""})
  const [error,setError]=useState<string>('')

  const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
console.log(
  formData
);

try {

  const apiurl =import.meta.env.VITE_API_URL;

  const response= await axios.post(`${apiurl}/api/auth/signup`,formData,{withCredentials:true})

if (!response?.data?.user) throw  new Error ('Registration error ')


  console.log(response?.data?.user);
  
  
} catch (error) {
  console.log(error);
  setError((error as Error).message)
  
}
  }
  const handleChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
setFormData({...formData,[e.target.name]:e.target.value});

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">UserName:</label>
          <input
            type="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confrm Password:</label>
          <input
            type="password"
            name="c_password"
            value={formData.c_password}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200">
          Sign Up
        </button>
        <Link className='text-blue-400 text-sm underline mt-2' to={'/login'}>login</Link>

      </form>
    </div>
  );
}

export default SignUp
