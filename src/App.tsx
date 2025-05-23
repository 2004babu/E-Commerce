import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import ViewProduct from './components/Products/ViewProduct';
import HomeHeader from './components/HomeHeader';
import FilteredProducts from './components/Products/FilteredProducts';
import NotFound from './components/static/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <HomeHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ViewProduct />} />
        <Route path="/product/category" element={<FilteredProducts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;