import {  useLocation } from 'react-router-dom';

const UseSafeNavigate = async() => {

  // const navigate = useNavigate();
  const location = useLocation();

  return () => {
      const from = location.pathname;
      console.log(from);
      
      // navigate(path, { state: { from } });
  };
   
}

export default UseSafeNavigate





// // Usage:
// const safeNavigate = useSafeNavigate();
// safeNavigate('/login');
