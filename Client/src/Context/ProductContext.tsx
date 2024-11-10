import React, { createContext, ReactNode, useContext, useState } from 'react'


interface productType {
    _id: string,
    search: string,
    Price: {
        MRP: string,
        Offer: string
    },
    inStock: string,
    category: string,
    description: string,
    imageUrl: string,
    Product_Name: string,
    P_Status: string,
    Comments: [{userId:string,_id:string,comment:string,userName:string,likes:[{userId:string}]}],
    Ratings: [{userId:string,_id:string,Rate:number}],
    likedBy: [{ userId: string, _id: string }],
    totalRate:number,

}
interface productContextType {
    ProductDetails: productType,
    error?: string,
    setProductDetails: (productDetails: productType) => (void);
    setError?: (error: string) => (void);
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
