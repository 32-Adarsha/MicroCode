import React from 'react';
import { Button } from '@chakra-ui/react';

const CButton = ({ children, ...props }) => {
  return <Button border={1} {...props}>{children}</Button>;
};

export default CButton;
