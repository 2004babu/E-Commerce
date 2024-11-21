import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { useAuthContext } from './Context/authContextPrivider';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import IsAuthUser from './components/utils/IsAuthUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OverView from './components/Admin/DashBoard/OverView';
import HomeHeader from './components/HomeHeader';
// import SideBar from './components/static/SideBar';
import AddProduct from './components/Admin/Products/AddProduct';
import AllProducts from './components/Admin/Products/AllProducts';
import ViewProduct from './components/Admin/Products/ViewProduct';
// import ListProducts from './components/Admin/Products/ListProducts';
import FilteredProducts from './components/Products/FilteredProducts';
import LikedProducts from './components/Products/LikedProducts';
import NotFound from './components/static/NotFound';
import Cart from './components/Products/Cart';
import SetCate from './components/Admin/category/SetCate';
import DashComments from './components/Admin/DashBoard/DashComments';
import Editable_Product from './components/Admin/Products/Editable_Product';


function App() {
  const { user, setError, setUser, } = useAuthContext();

  
  useEffect(() => {
    const loadUser = async () => {
      const apiurl =import.meta.env.VITE_API_URL;
      try {
        const res = await axios.get( ` ${apiurl}/api/auth/loaduser`, { withCredentials: true });

        if (!res?.data) throw new Error("login first to handle this");

        if (res?.data?.user) {
          setUser(res.data.user);
          // console.log(res.data.user);

        }
      } catch (error) {
        console.log(error);
        setError((error as Error).message);
      }
    };

    loadUser()
  }, [])
  // const [wholeContainerClick, setWholeContainerClick] = useState<boolean>(false)




  // const homeMainElement = useRef<HTMLDivElement>(null)


  // useEffect(() => {

  //   const headerElement = homeMainElement.current;

  //   const handelClick = () => {
  //     setWholeContainerClick(false)
  //   }

  //   if (headerElement) {
  //     headerElement.addEventListener('click', handelClick)
  //   }

  //   return () => {
  //     if (headerElement) {
  //       headerElement.removeEventListener('click', handelClick)
  //     }

  //   }

  // }, [setWholeContainerClick])

  return (
    <BrowserRouter>
      <ToastContainer />
      <HomeHeader />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={user?._id ? <Home /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />

<Route path='editProducts'>
<Route index element={<IsAuthUser requiredRole='Admin'>< AllProducts Re_path='/editProducts/edit/?id='  /></IsAuthUser>} />
<Route path="edit" element={<IsAuthUser requiredRole='Admin'>< Editable_Product  /></IsAuthUser>} />

</Route>

        <Route path="/productsdetails" element={<IsAuthUser requiredRole='Admin'>< AllProducts  /></IsAuthUser>} />
        <Route path="/addproducts" element={<IsAuthUser requiredRole='Admin'>< AddProduct  /></IsAuthUser>} />
        <Route path="/product" element={<IsAuthUser requiredRole='Admin'>< ViewProduct  /></IsAuthUser>} />
        <Route path="/product/category" element={< FilteredProducts  />} />
        <Route path="/liked" element={<IsAuthUser requiredRole='user'>< LikedProducts  /></IsAuthUser>} />
        <Route path="/cart" element={<IsAuthUser requiredRole='user'>< Cart  /></IsAuthUser>} />
        <Route path="/set_category" element={<IsAuthUser requiredRole='Admin'>< SetCate  /></IsAuthUser>} />

        <Route path="/dashboard"  >
        <Route index  element={<IsAuthUser requiredRole='Admin'>< OverView  /></IsAuthUser>} />
        <Route path="comments" element={< DashComments  />} />
        </Route>

        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
