
import axios from 'axios';
import SignIn from '../pages/SignIn';
import { useEffect, useState } from 'react';


const AUTH_URL = "http://localhost:8080/isLoggedIn"




const Auth = ( props)=>{
  const [l, setL] = useState(true);



  useEffect(() => {
    const isLoggedIn =() => {

      axios.get(AUTH_URL).then((response) =>{
       if(response.status ===200){
         setL(true)
       }else{
         setL(false)
       }
      }).catch((err)=>{
       setL(false)
      })
     
 };
 isLoggedIn();
  }, [])
  


  return(
    <>
      {l?props.page:<SignIn/>}
    </>
  )

}

export default Auth;