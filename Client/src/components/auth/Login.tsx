import axios from 'axios'
import React, {  useState } from 'react'
import { useAuthContext } from '../../Context/authContextPrivider'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface authInterface {
  email: string,
  password: string
}
// interface userData {
//   _id: string,
//   userName: string,
//   email: string,
//   Role: string
// }


// interface authContextType{
//   user:userData,
//   error:string,
//   setError:(error:string)=>void
// }

const Login: React.FC = () => {

  // redirect('/')
  const { setUser, error, setError, setSuccessMSG} = useAuthContext();
  const navigate = useNavigate()

  const location = useLocation()

  console.log(location);


  const [formData, setFormData] = useState<authInterface>({ email: "", password: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const apiurl = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${apiurl}/api/auth/login`, formData, { withCredentials: true })

      if (!response?.data?.user) throw new Error('Registration error ')


       setUser(response?.data?.user)
      setSuccessMSG('login Success..!')
      

      


      if (location.state.from) {
        return navigate(location.state.from)
      }
      // redirect('/')

      console.log('not open ');

    } catch (error) {
      console.log(error);
      setError((error as Error).message)


    }

  }
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }

 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button type="submit" className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200">
          Login
        </button>
        <Link className='text-blue-400 text-sm underline mt-2' to={'/signup'}>Register</Link>
      </form>
    </div>
  );
}

export default Login
