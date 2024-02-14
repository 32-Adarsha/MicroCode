import PasswordInput from "../../components/Forms/PasswordInput"
import TextInput from "../../components/Forms/TextInput"


const LoginPage = () =>{
    return(
        <div>
            <TextInput id={"login-textbox"} label="Username" ></TextInput>
            <PasswordInput id={"login-password"} label="Password"></PasswordInput>
        </div>
    )
}

export default LoginPage