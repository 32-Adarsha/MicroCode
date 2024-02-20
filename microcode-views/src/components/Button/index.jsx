export default Button = (props) =>{
return (
    <button className={props.className} onClick={props.onclick}>{props.text}</button>
)
}