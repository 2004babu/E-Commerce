import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { useAuthContext } from './Context/authContextPrivider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IsAuthUser from './components/utils/IsAuthUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OverView from './components/Admin/DashBoard/OverView';
import HomeHeader from './components/HomeHeader';
import AddProduct from './components/Admin/Products/AddProduct';
import AllProducts from './components/Admin/Products/AllProducts';
import ViewProduct from './components/Admin/Products/ViewProduct';
import FilteredProducts from './components/Products/FilteredProducts';
import LikedProducts from './components/Products/LikedProducts';
import NotFound from './components/static/NotFound';
import Cart from './components/Products/Cart';
import SetCate from './components/Admin/category/SetCate';
import DashComments from './components/Admin/DashBoard/DashComments';
import Editable_Product from './components/Admin/Products/Editable_Product';
import GateWayStripe from './components/Payments/GateWayStripe';
import OrderPlacingPage from './components/OrderPalce/OrderPlacingPage';
import LoadCompletePage from './components/Payments/LoadCompletePage';



function App() {
  const { user, setError, setUser } = useAuthContext();

const [loadUser,setLoadUSer]=useState<boolean>(false)
  useEffect(() => {
    const loadUser = async () => {
      const apiurl = import.meta.env.VITE_API_URL;
      try {
        setLoadUSer(false)
        const res = await axios.get(` ${apiurl}/api/auth/loaduser`, { withCredentials: true });

        if (!res?.data) throw new Error("login first to handle this");

        if (res?.data?.user) {
          setUser(res.data.user);

        }
      } catch (error) {
        console.log(error);
        setError((error as Error).message);
      }finally{
        setLoadUSer(true)
      }
    };

    loadUser()
  }, [])



  return (
    <>
      <ToastContainer />
      <HomeHeader />
      {loadUser?<Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={user?._id ? <Home /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path='editProducts'>
          <Route index element={<IsAuthUser requiredRole='Admin'>< AllProducts Re_path='/editProducts/edit/?id=' /></IsAuthUser>} />
          <Route path="edit" element={<IsAuthUser requiredRole='Admin'>< Editable_Product /></IsAuthUser>} />

        </Route>

        <Route path="/productsdetails" element={<IsAuthUser requiredRole='Admin'>< AllProducts /></IsAuthUser>} />
        <Route path="/addproducts" element={<IsAuthUser requiredRole='Admin'>< AddProduct /></IsAuthUser>} />
        <Route path="/product" element={< ViewProduct />} />
        <Route path="/product/category" element={< FilteredProducts />} />
        <Route path="/liked" element={<IsAuthUser requiredRole='user'>< LikedProducts /></IsAuthUser>} />
        <Route path="/cart" element={<IsAuthUser requiredRole='user'>< Cart /></IsAuthUser>} />
        <Route path="/set_category" element={<IsAuthUser requiredRole='Admin'>< SetCate /></IsAuthUser>} />

        <Route path="/dashboard"  >
          <Route index element={<IsAuthUser requiredRole='Admin'>< OverView /></IsAuthUser>} />
          <Route path="comments" element={<IsAuthUser requiredRole='Admin'>< DashComments /></IsAuthUser>} />
        </Route>
{/* this place-order for Cart Products  */}
        <Route path="/place-order" element={<IsAuthUser requiredRole='user'><OrderPlacingPage /></IsAuthUser>} />

{/* this place-order for Single Product  */}
        <Route path="/place-order/:productId" element={<IsAuthUser requiredRole='user'><OrderPlacingPage /></IsAuthUser>}  />


        <Route path='/pay/*' element={<IsAuthUser requiredRole='user'><GateWayStripe /></IsAuthUser>} />
        <Route path='/payment/complete' element={<IsAuthUser requiredRole='user'>
          <LoadCompletePage/>
        </IsAuthUser>} />


        <Route path='*' element={<NotFound />} />
      </Routes>:<></>}

    </>

  );
}

export default App;
