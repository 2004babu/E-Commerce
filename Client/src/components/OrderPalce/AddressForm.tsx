import React from "react";
import  { useEffect, useState } from "react";
import {    useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../Context/authContextPrivider";


interface AddressFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

interface AddressType {
  name: string;
  address: string;
  phoneNo: string;
  state: string;
  district: string;
  pincode: string;
  secondaryPhoneNo?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({  prevStep }) => {
  const navigate=useNavigate()
  
      const [isWrongUrl, setIsWrongUrl] = useState<boolean>(false);
      const [cart, setCart] = useState(false);
      const { productId } = useParams()
     
    
      const location = useLocation();

  useEffect(() => {
  
    
    const query = new URLSearchParams(location.search);
    const cartQuery = query.get('cart');
    setCart(cartQuery === 'true');

    // Check for URL validity
    if (!productId && cartQuery !== 'true') {
      setIsWrongUrl(true);
    }

  
    // Load shipping info from localStorage if exists
    const storedShippingInfo = localStorage.getItem("shippingInfoE_com");
    if (storedShippingInfo) {
      setAddress(JSON.parse(storedShippingInfo));
    }
  }, []);
  console.log(cart)
  
  const [address, setAddress] = useState<AddressType>({
    name: "",
    address: "",
    phoneNo: "",
    state: "",
    district: "",
    pincode: "",
    secondaryPhoneNo: "",
  });

  const [eligibleToNext, setEligibleToNext] = useState<boolean>(true);
const {setError}=useAuthContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    // Validate fields to enable/disable the next button
    const isValid =
      address.name.length > 4 &&
      address.address.length > 10 &&
      address.phoneNo.length >= 10 &&
      address.state.length > 4 &&
      address.district.length > 4 &&
      /^[0-9]{6}$/.test(address.pincode); 
      // Pincode validation
      console.log(address.name.length > 4 ,
        address.address.length > 10 ,
        address.phoneNo.length >= 10 ,
        address.state.length > 4 ,
        address.district.length > 4 ,
        /^[0-9]{6}$/.test(address.pincode) )
    setEligibleToNext(!isValid);
  }, [address]);

  const saveAndNext = async () => {
    if (eligibleToNext) return;
    if (isWrongUrl ) {
      setError('Check Url Product Id Not Foundor Wrong')
      return
    }
    localStorage.setItem("shippingInfoE_com", JSON.stringify(address));
       return cart? navigate(`/pay?cart=true`): navigate(`/pay?PId=${productId}`)

  };


  return (
    <form className="space-y-4 paymentformseac">
      <div>
        <label className="block text-gray-600">Full Name</label>
        <input
          name="name"
          minLength={4}
          value={address.name}
          onChange={handleChange}
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-600">Address</label>
        <textarea
          name="address"
          value={address.address}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your address"
          required
        />
      </div>
      <div>
        <label className="block text-gray-600">State</label>
        <input
          name="state"
          value={address.state}
          onChange={handleChange}
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your state"
          required
        />
      </div>
      <div>
        <label className="block text-gray-600">District</label>
        <input
        required
          name="district"
          value={address.district}
          onChange={handleChange}
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your district"
        />
      </div>
      <div>
        <label className="block text-gray-600">Pincode</label>
        <input
        required
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          type="number"
          maxLength={6}
          minLength={6}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your pincode"
        />
      </div>
      <div>
        <label className="block text-gray-600">Phone Number</label>
        <input
        required
          name="phoneNo"
          value={address.phoneNo}
          onChange={handleChange}
          type="tel"
          maxLength={10}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="block text-gray-600">Secondary Phone Number (Optional)</label>
        <input
        required
          name="secondaryPhoneNo"
          value={address.secondaryPhoneNo}
          onChange={handleChange}
          type="tel"
          maxLength={10}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your secondary phone number"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="button"
          onClick={saveAndNext}
          disabled={eligibleToNext}
          className={`px-4 py-2 rounded-md ${
            eligibleToNext
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
