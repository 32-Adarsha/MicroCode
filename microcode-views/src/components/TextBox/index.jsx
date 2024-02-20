const TextBox = (props) =>{

    return(
        <div>
            {props.label?
                <label htmlFor={props.id}>{props.placeholder}:</label>:<></>}
            

<input type={props.type} name={props.name} id={props.id} onChange={props.onchange}/>
        </div>
        
    )
}
export default TextBox