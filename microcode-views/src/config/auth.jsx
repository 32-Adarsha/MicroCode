
import axios from 'axios';
import { useEffect } from 'react';


const AUTH_URL = "http://localhost:8080/isLoggedIn"


// Function to check if the user is logged in
export const checkLoggedIn =  () => {
  axios.get(AUTH_URL).then((res)=>{
    if(res.data.isLoggedIn === true){
        return true;
    }else{
        return false;
    }

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
      }else{
        window.location.href ="/createproblem"
      }
    };

    checkAuth();
  }, []);
};
