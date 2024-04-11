import React from 'react';
import {Flex,Button} from 'antd';

const CButton = ({ children, ...props }) => {
  return     (<Flex gap="small" wrap="wrap">
  <Button  {...props}>{children}</Button>

</Flex>);
};

export default CButton;
