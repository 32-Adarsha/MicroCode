import React from 'react';
import {Flex,Button} from 'antd';

const CButton = ({ children, ...props }) => {
  return     (<Flex gap="small" wrap="wrap">
  <Button  {...props} type="primary">Primary Button</Button>

</Flex>);
};

export default CButton;
