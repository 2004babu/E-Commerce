import { useNavigate, useLocation } from 'react-router-dom';

const UseSafeNavigate = async(path:string) => {

  const navigate = useNavigate();
  const location = useLocation();

  return (path:string) => {
      const from = location.pathname;
      console.log(from);
      
      // navigate(path, { state: { from } });
  };
   
}

export default UseSafeNavigate





// // Usage:
// const safeNavigate = useSafeNavigate();
// safeNavigate('/login');
