import React from 'react';
import { Input, border } from '@chakra-ui/react';

const TextInput = ({ label, type, name,id, value, onChange, error,className}) => {
  return (
    <div>
      <label>{label}</label>
      <Input type={type} value={value} name={name} id={id} onChange={onChange} className={className}/><span>{error}</span>

    </div>
  );
};


export default TextInput;
