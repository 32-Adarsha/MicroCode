
import axios from 'axios';
import { useEffect } from 'react';


const AUTH_URL = "http://localhost:8080/isLoggedIn"


// Function to check if the user is logged in
export const checkLoggedIn =  () => {
  axios.get(AUTH_URL).then((res)=>{
    console.log(res);
    if(res.status === 200){
        return true;
    }

  }).catch(err=>{
    console.log(err);
    return false;

  })
};



// Custom hook to check authentication status on component mount
export const useAuthCheck = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn =  checkLoggedIn();
      if (!isLoggedIn) {
        // Redirect to login page or handle authentication failure
        window.location.href = '/';
      }
    };

    checkAuth();
  }, []);
};

export const useAuthCheckSignin = () => {
    useEffect(() => {
      const checkAuth = async () => {
        const isLoggedIn =  checkLoggedIn();
        if (isLoggedIn) {
          // Redirect to login page or handle authentication failure
          window.location.href = '/custom';
        }
      };
  
      checkAuth();
    }, []);
  };
