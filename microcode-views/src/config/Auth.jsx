
import axios from 'axios';
import SignIn from '../pages/SignIn';
import { useEffect, useState } from 'react';
import Loading from '../pages/Loading';


const AUTH_URL = "http://localhost:8080/isLoggedIn"




const Auth = ( props)=>{
  const [l, setL] = useState(0);



  useEffect(() => {
    const isLoggedIn =() => {

      axios.get(AUTH_URL).then((response) =>{
       if(response.status ===200){
         setL(1)
       }else{
         setL(2)
       }
      }).catch((err)=>{
       setL(2)
      })
     
 };
 isLoggedIn();
  }, [])
  


  return(
    <>
      {l==0?<Loading/>:l==1?props.page:<SignIn/>}
    </>
  )

}

export default Auth;