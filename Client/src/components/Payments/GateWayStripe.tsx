import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import StripePayments from './StripePayments'
import { useAuthContext } from '../../Context/authContextPrivider'
import NotFound from '../static/NotFound'

const stripeAPIKEY = import.meta.env.VITE_API_PUBLIC_KEY ?? ""
const Stripe = loadStripe(stripeAPIKEY?.toString())

const GateWayStripe: React.FC = () => {


    const navigate = useNavigate()
    const { user, setError } = useAuthContext()
    useEffect(() => {
        if (!user?._id) {
            navigate('/login', { state: { from: location.href.substring(location.origin.length) } })
            return
        }
    }, [])

    const [clientSecret, setClientSecret] = useState<string>("");
    const [isWrongUrl, setIsWrongUrl] = useState<boolean>(false);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()


    useEffect(() => {


        const localStorageShipping = localStorage.getItem('shippingInfoE_com') ?? []


        console.log(localStorageShipping.length > 0);

        const getClientSecret = async () => {
            const ProductId = await query.get('PId')
            const IsCart = await query.get('cart')

            if (!(localStorageShipping.length > 0)) {
                setError('Shippping info Address Needed!!')
                return navigate(`/place-order/${ProductId ? ProductId : IsCart ? "?cart=true" : ""}`, { state: {} })
            }
            try {

                console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeee', ProductId, IsCart);
                if (!ProductId && !IsCart) {
                    setError('Check Url Product Id Not Foundor Wrong')
                    setIsWrongUrl(true)
                    throw new Error('Check Url Product Id Not Foundor Wrong')
                }
                const apiUrl = import.meta.env.VITE_API_URL; // Backend API URL from .env
                if (ProductId) {
                    const response = await axios.post(
                        `${apiUrl}/api/payment/product`,
                        { PId: ProductId },
                        { withCredentials: true } // Include credentials for secure communication
                    );
                    if (response?.data?.clientSecret) {
                        setClientSecret(response.data.clientSecret);
                    }
                } else if (IsCart) {
                    const response = await axios.post(
                        `${apiUrl}/api/payment/cart`,
                        { cart: IsCart },
                        { withCredentials: true } // Include credentials for secure communication
                    );
                    if (response?.data?.clientSecret) {

                        setClientSecret(response.data.clientSecret);
                    }
                }
            } catch (error) {
                console.error("Error fetching client secret:", error);
                setError((error as Error).message)
                setIsWrongUrl(true)
            }

        };

        getClientSecret();
    }, []);


    if (isWrongUrl) {
        return <NotFound />
    }


    return (<div className="h-screen w-full flex flex justify-center items-center  ">

        {
            clientSecret ? (
                <Elements stripe={Stripe} options={{ clientSecret }}>
                    <Routes>
                        <Route index element={<StripePayments />} />
                        {/* <Route path="complete" element={<CompletePage />} /> */}
                        {/* this  Complete Page  only  for Devlopment  Production Complete page futere Will Be Add*/}
                    </Routes>
                </Elements>
            ) : (
                <p>Loading payment form...</p>

            )
        }
    </div>
    )
}

export default GateWayStripe
