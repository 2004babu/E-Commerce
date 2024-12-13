import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { useParams } from 'react-router-dom'
import CompletePage from './CompletePage'
const stripeAPIKEY = import.meta.env.VITE_API_PUBLIC_KEY ?? ""
const Stripe = loadStripe(stripeAPIKEY?.toString())
const LoadCompletePage = () => {
    const {payment_intent_client_secret}=useParams()
  return (<div className='mt-[165px] h-full w-full flex items-center justify-center'>
    <Elements  stripe={Stripe} options={{clientSecret:payment_intent_client_secret}}>
      <CompletePage/>
    </Elements>
  </div>
  )
}

export default LoadCompletePage
