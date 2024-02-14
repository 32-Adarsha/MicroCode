const TextInput = (props) =>{


    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input type="text"  id={props.id} placeholder={props.label}/>
        </div>
    )
}

export default TextInput


