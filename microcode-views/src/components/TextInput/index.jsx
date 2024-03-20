import React from 'react';
import '../TextInput/textinput.css'
import {Input} from 'antd'

const TextInput = (props) => {
  return (
    <div>
      <Input className={"input-main"}  prefix={props.prefix} {...props}/><span>{props.error}</span>

    </div>
  );
};


export default TextInput;
