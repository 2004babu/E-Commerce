import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    PaymentElement,
    CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";



const StripePayments: React.FC = () => {

    const elements = useElements();
    const stripe = useStripe();


    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState<string>("");
    const [paymentSuccess, setPAymentsuccess] = useState<boolean>(false);

    const [dpmCheckerLink, setDpmCheckerLink] = useState<string>("");


    const [loading, setLoading] = useState<boolean>(false);
    const amount = 100; // Amount in your preferred currency's smallest unit (e.g., cents for USD)
    const currency = "usd"; // Preferred currency

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()

    const handlePayment = async (event:React.FormEvent<HTMLFormElement>  ) => {
        event.preventDefault()
        console.log(dpmCheckerLink, clientSecret)
        if (!stripe || !elements) {
            console.error("Stripe or Elements not loaded");
            return;
        }

        setLoading(true);

    
        try {
            const {error  } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                  // Make sure to change this to your payment completion page
                //   return_url: `http://localhost:5173/pay/complete?PId=${query.get('PId')}`,
                return_url:'http://localhost:5173/payment/complete?',
                  receipt_email:'bb5696359@gmail.com'
                },
              });
            if (error) {
                console.error("Payment failed:", error);
            } else  {
                console.log("Payment successful:");
                setPAymentsuccess(true)
                alert("Payment Successful!");
                // navigate('/');
            }
        } catch (error) {
            console.log("Payment error:", error);
            
        } finally {
            setLoading(false);
        }
    };

    // Fetch client secret from the backend

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL; // Backend API URL from .env
                const response = await axios.post(
                    `${apiUrl}/api/payment/product`,
                    { amount, currency, PId: query.get('PId') },
                    { withCredentials: true } // Include credentials for secure communication
                );
                setClientSecret(response.data.clientSecret);
                setDpmCheckerLink(response.data.dpmCheckerLink)
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        getClientSecret();
    }, []);

    



return (

    <form
        onSubmit={handlePayment}
        className=" p-2 w-80 flex flex-col justify-center items-center gap-2 border-2 bg-gray-400"
        >
        <PaymentElement options={{ layout: "tabs" }} />
        <button
            disabled={!stripe || !elements || loading}
            className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600"
            >
            {loading ? "Processing..." : `Pay Now $${(amount / 100).toFixed(2)}`}
        </button>
    </form>
            
);
};


export default StripePayments;
