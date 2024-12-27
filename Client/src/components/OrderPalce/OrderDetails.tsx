import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { productType } from '../utils/Types';
import OrderListProduct from './OrderListProduct';
import NotFound from '../static/NotFound';
import { useAuthContext } from '../../Context/authContextPrivider';

interface OrderDetailsProps {
    nextStep: () => void;

}

const OrderDetails: React.FC<OrderDetailsProps> = ({ nextStep }) => {
    // const navigate=useNavigate()
    const apiurl = import.meta.env.VITE_API_URL
    const { productId } = useParams()
    const [isCart, setIsCart] = useState<boolean>(false)
    const [IsWrongUrl, setIsWrongUrl] = useState<boolean>(false)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const {setError}=useAuthContext()

    const [Product, setProduct] = useState<productType[]>([])

    

    useEffect(() => {
        const handleResize = () => {
          setShowDetails(document.body.clientWidth >= 700);
        };
      
        window.addEventListener('resize', handleResize);
      
        // Initial check
        handleResize();
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      console.log(showDetails, document.body.clientWidth);
      
     

    useEffect(() => {
        if (!productId) {
            return

        }
        const fetchProduct = async () => {
            try {

                const response = await axios.get(`${apiurl}/api/product/p/${productId}`, { withCredentials: true })


                console.log(response.data.message);

                if (response.data.product) {
                    setProduct((prev) => [...prev, response.data.product]);
                }else{
                    throw  Error(response.data.message)
                }
            } catch (error) {
                console.log(error);
                setError((error as Error).message)
            }
        }
        fetchProduct()
    }, [])


    useEffect(() => {
        const useQuery = async () => {
            const query = new URLSearchParams(location.search)
            await query.get('cart')==='true' ? setIsCart(true) :setIsCart(false) 
            console.log(!productId,!(await query.get('cart')==='true'))
            if (!productId&&!(await query.get('cart')==='true')) {
                console.log('enter');
                
                        setIsWrongUrl(true)
                        
                    }
        }
        useQuery()

        if (isCart) {
            const fetchCart = async () => {
                try {

                    const response = await axios.get(`${apiurl}/api/product/cart`, { withCredentials: true })


                    if (response.data.product) {
                        setProduct((prev) => [...prev, ...response.data.product]);
                        // setCartPage(page + 1)
                        // setHaseMore(true)
                    } if (response.data.product.length < 10) {
                        // setHaseMore(false)
                    }

                } catch (error) {
                    console.log(error);
                    //   setError((error as Error).message)
                } finally {
                    // setClear(!clear)
                }
            }
            fetchCart()
            //   setIsCart(false)
        }
    }, [isCart])
console.log(!productId,!isCart);

    if (IsWrongUrl) {
// console.log('enter');

        setError('Check Url Product Id Not Foundor Wrong')
        return  <NotFound/>
    }
    return (
        // <div  className='flex flex-col  w-full h-full  ' >
        <ul className='flex flex-col w-full h-full justify-center items-center gap-2 overflow-hidden '>
            {Product.length >= 1 && Product.map((item, _) => (
                <OrderListProduct item={item} index={_}/>
            ))}

{/* <div className="mt-4 text-right font-semibold text-lg">Total: ${total.toFixed(2)}</div> */ }
<div className="mt-6 flex justify-between">
        
        <button
        //   onClick={()=>navigate(`/pay?PId=${productId}`)}
          onClick={nextStep}

          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Shipping address
        </button>
      </div>
        </ul>


    );
};

export default OrderDetails;


//   </div>