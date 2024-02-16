import { useEffect, useState } from "react"
import TextBox from "../../components/TextBox"
import axios from "axios"



const SignUp = () =>{
    const [id, setId] = useState("");

    function l(e){
        setId(e.target.value)
    }
    useEffect(()=>{
        axios.post(`http://localhost:8080/exist`,{
            "what": "username",
            "value" : "d1adf"
        },{"Content-Type": "application/json"}).then((d)=>console.log(d)).catch(e=>console.log(e))
    },[id])

    return(
        <div className={"form-container signup-container"}>
            <div className="Form">
                <h1>Sign Up</h1>
                <form>
                    <TextBox type={"text"} name={"signupfullname"} label={true} id={"signupfullname"} placeholder={"Full Name"} />
                    <TextBox type={"email"} name={"signupemail"} label={true} id={"signupemail"} placeholder={"Email Address"} />
                    <TextBox type={"text"} name={"signupid"} label={true} id={"signupid"} placeholder={"Username"} onchange={l}/>


                </form>
            </div>

        </div>
    )
}
export default SignUp