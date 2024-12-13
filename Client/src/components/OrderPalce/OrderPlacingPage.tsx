import React, { useState } from 'react';
import AddressForm from './AddressForm';
import OrderDetails from './OrderDetails';
import { motion } from 'framer-motion';

const OrderPlacingPage: React.FC = () => {
  const [step, setStep] = useState(1); // Step tracker for the process

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="h-full bg-gray-50 py-8 px-4 mt-[65px]">
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          {step === 1 ? 'Order Details' : step === 2 ? 'Shipping Address' : 'Confirm Your Order'}
        </h1>

        {step === 1 && <OrderDetails nextStep={nextStep}  />}
        {step === 2 && <AddressForm nextStep={nextStep}  prevStep={prevStep}/>}
        {step === 3 && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <p className="text-lg mb-4">Your order has been placed successfully!</p>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              Place Another Order
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderPlacingPage;
