import React from 'react'
import { Card, Flex, theme, Typography } from "antd";
import { Button} from 'antd';


const Profile = () => {
  const { useToken } = theme;
const { Text, Link } = Typography;
const { token } = useToken();
const styles = {
  card_1: {
    width: "450px",
    height: "400px",
    marginLeft: "30px", marginTop: "20px",
    border:"solid",color:""
    
  },

  card_2: {
    width: "800px",
    height: "500px",
    marginLeft: "30px", marginTop: "20px",
    border:"solid",color:""
    
  },
  paragraph: {
    color: token.colorTextSecondary,
  },
};
  return (
    <div>
    <Flex justify="left" direction="row">
    <Card style={styles.card_1}>
      <Flex vertical gap="left" align='center'>
       
        <img
          alt="Card image"
          src="https://bootdey.com/img/Content/avatar/avatar7.png"  className="rounded-circle" width="150"
          justify="center" align="center"
        />
        
        <Flex vertical gap={token.marginXXS}>
          <Text strong align="center"><h2>John Doe</h2> </Text>
          <Text style={styles.paragraph} align="center" strong >
            Full stack Developer
          </Text>
          <Text style={styles.paragraph} align="center">
            
          </Text>
          <Flex gap="small" wrap="wrap" align='center'>
            <Button type="primary">Edit Profile</Button>
            
           
          </Flex>
        </Flex>
      </Flex>
    </Card>
    
    





    
    </Flex>
    </div>



  )
}

export default Profile
