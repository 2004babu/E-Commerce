import  { createContext, ReactNode, useContext, useState } from 'react'


import { productType } from '../components/utils/Types'; 

interface productContextType {
    ProductDetails: productType,
    setProductDetails: (productDetails: productType) => (void);
    
}

const context = createContext<productContextType | null>(null);

const ProductContext = ({ children }: { children: ReactNode }) => {

    const [ProductDetails, setProductDetails] = useState<productType>({
        _id: '',
        search: "",
        Price: {
            MRP: "",
            Offer: ""
        },
        inStock: "",
        category: "",
        description: "",
        imageUrl: "",
        Product_Name: '',
        P_Status: '',
        Comments: [{userId:'',_id:"",comment:"",userName:"",likes:[{userId:''}]}],
        Ratings: [{userId:"",_id:"",Rate:0}],
        likedBy: [{ userId: '', _id: "" }],
        totalRate:0

    })

    return (
        <context.Provider value={{ ProductDetails, setProductDetails }}>
            {children}
        </context.Provider>
    )
}

export default ProductContext

export const useProductContext = () => {
    const isContext = useContext(context)

    if (!isContext) throw new Error('useAuthContext must be used within an AuthContextProvider')

    return isContext;

}
