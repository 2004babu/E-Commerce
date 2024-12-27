// import axios from "axios";
import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { Slide, toast } from "react-toastify";


interface userData {
  _id: string;
  userName: string;
  email: string;
  Role: string;
  likes: [
    {
      product_id: string,
    },
  ],
  Cart: [
    {
      product_id: string,
    },
  ],
}


interface authContextType {
  user: userData;
  error: string;
  successMSG: string;
  strip:any, setStripe:(stripe:any)=>void;

  setError: (error: string) => void;
  setSuccessMSG: (successMSG: string) => void;
  setUser: (user: userData) => void;
  asyncAfterAuthFuc: { status: boolean, fun: () => (void) }, SetAsyncAfterAuthFuc: (asyncAfterAuthFuc: { status: boolean, fun: () => (void) }) => void

}




const MakeAuthContext = createContext<authContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userData>({
    _id: "",
    userName: "",
    email: "",
    Role: "",
    likes: [{ product_id: '' }],
    Cart: [{ product_id: "" }]
  });
  const [error, setError] = useState<string>("");
  const [strip, setStripe] = useState<any>();
  const [successMSG, setSuccessMSG] = useState<string>("");
  const [asyncAfterAuthFuc, SetAsyncAfterAuthFuc] = useState<{ status: boolean, fun: () => (void) }>({
    status: false, fun: () => {
    },
  });


  useEffect(() => {

    if (asyncAfterAuthFuc.status && user?._id) {
      console.log(user);
      
      asyncAfterAuthFuc.fun();
    }

  }, [user])


  // console.log(asyncAfterAuthFuc);


  useEffect(() => {

    let arr = [successMSG, error]

    arr.forEach(itm => {
      if (itm.length) {
        toast(`${itm}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    })
    if (error) {
      const removeError = setInterval(() => {
        setError('')
      }, 5000)
      return clearInterval(removeError);
    }
    if (successMSG) {
      const removeError = setInterval(() => {
        setSuccessMSG('')
      }, 5000)
      return clearInterval(removeError);
    }
  }, [error, successMSG, setError])

  return (
    <MakeAuthContext.Provider value={{ strip, setStripe,asyncAfterAuthFuc, SetAsyncAfterAuthFuc, user, error, setUser, setError, successMSG, setSuccessMSG }}>
      {children}
    </MakeAuthContext.Provider>
  );
};


export default AuthContextProvider;


export const useAuthContext = () => {
  const context = useContext(MakeAuthContext);

  if (!context) throw new Error('useAuthContext must be used within an AuthContextProvider')

  return context
};
