import { Layout , Menu, Input , Drawer, Button,Switch} from "antd";
const { Header, Content, Footer, Sider , } = Layout;
import { useState ,useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { List} from 'antd';
const { Search } = Input;
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkRehype from 'remark-rehype'
import Markdown from 'react-markdown';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';

  const items = [
{ key: '1', icon: <PieChartOutlined />, label: 'Stats' },
  { key: '2', icon: <DesktopOutlined />, label: 'Exams' },
  { key: '3', icon: <ContainerOutlined />, label: 'Problems'},
  { key: '4', icon: <UserOutlined />, label: 'Users'},
];

const data = [
    {
        id: 1,
        name: 'Lily',
      },
      {
        id: 2,
        name: 'drfgd',
      },
  ];
  const problem = [
    {
        id: 1,
        name: 'Problem1',
      },
      {
        id: 2,
        name: 'Problem2',
      },
  ];
  const exam = [
    {
        id: 1,
        name: 'exam1',
      },
      {
        id: 2,
        name: 'exam2',
      },
  ];

  


const AdminPage = () => {
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading , setLoading] = useState(true)
    const handleSelect = ({ key }) => {
        setSelectedKeys([key]);
        console.log('Selected item:', key);
    };
    
    const showDrawer = (item) => {
      setSelectedItem(item)
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
// ------------------------------------------

const [usersData , setUsersData] = useState(null)
const [problemsData , setProblemsData] = useState(null)





useEffect(() => {
  const userDataUrl = `http://localhost:8080/admin/getAllUser?pageIndex=1&pageSize=10`;
  const problemsUrl = `http://localhost:8080/admin/problems?pageIndex=1&pageSize=10
  `;

  const getData = () => {
    axios.get(userDataUrl)
      .then(res => {
        setUsersData(res.data.items);
        
      })
      .catch(error => {
        console.error('Error fetching site stats:', error);
      });
    // To Fetch Problem
    axios.get(problemsUrl)
      .then(res => {
        setProblemsData(res.data.items);
        console.log(res.data.items)
      })
      .catch(error => {
        console.error('Error fetching site stats:', error);
        
      });
    setLoading(false)
  };

  getData();
}, []);










//--------------------------------------------
    return (
    <Layout className='h-screen p-1'>
            <Sider width={200} className="h-full py-2 px-3 rounded-lg flex flex-col justify-center">
                <h1 className='text-white w-full text-center font-sans text-3xl my-5'>MENU</h1>
                <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline' items={items} onSelect={handleSelect} ></Menu>
            </Sider>
            <Layout className='p-1'>
            {selectedKeys[0] === '1' ? (
                    <Layout className="bg-white rounded-lg shadow-lg p-3">
                        <h1 className="w-full text-black text-4xl font-sans font-bold mt-5 text-center">STATISTICS</h1>
                        <Divider orientation="left">Statistics </Divider>
                    </Layout>
            ) : selectedKeys[0] === '2' ? (
                <Layout className="bg-white rounded-lg shadow-lg p-3">
                    <h1 className="w-full text-black text-4xl font-sans font-bold mt-5 text-center">EXAMS</h1>
                    <Divider orientation="left">Exams</Divider>
                    <Search placeholder="search exam" className='' enterButton="Search" size="large" onSearch={value => console.log(value)}/>
                    <ProblemWithDrawer data={exam}/>
                </Layout>
            ) : selectedKeys[0] ==='3'?(
                <Layout className="bg-white rounded-lg shadow-lg p-3">
                    <h1 className="w-full text-black text-4xl font-sans font-bold mt-5 text-center">PROBLEMS</h1>
                    <Divider orientation="left">Problems</Divider>
                    <Search placeholder="search problem" className='' enterButton="Search" size="large" onSearch={value => console.log(value)}/>
                    {loading ? (
                      <p>Loading...</p> // You can replace this with your loading indicator
                    ) : (
                    <ProblemWithDrawer data={problemsData}/>
                  )}
                </Layout>
            ): (
                <Layout className="bg-white rounded-lg shadow-lg p-3">
                    <h1 className="w-full text-black text-4xl font-sans font-bold mt-5 text-center">USERS</h1>
                    <Divider orientation="left">Users</Divider>
                    <Search placeholder="search user" className='' enterButton="Search" size="large" onSearch={value => console.log(value)}/>
                    {loading ? (
                      <p>Loading...</p> // You can replace this with your loading indicator
                    ) : (
                      <ListWithDrawer data={usersData} />
                    )}
                </Layout>)}
            </Layout>
        </Layout>
      );
}

function ListWithDrawer({ data }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);
  
    const showDrawer = (item) => {
      console.log(item.id)
      getUserData(item.id);
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };

    const getUserData = (id) => {
      axios.get('http://localhost:8080/admin/getUser', {
        headers: {
        'accept': '*/*',
        'id': id,
  }
})
.then(response => {
  setSelectedItem(response.data)
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
    };
  
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                  View Profile
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar = {<Avatar shape="square" size="large" icon={<UserOutlined />} />}
                title={item.name}
                description={`${item.email}`}
              />
            </List.Item>
          )}
        />
        <Drawer width={640} title="User" onClose={onClose} open={open}>
        {selectedItem !== null ? (
        <>
          {/* <p>{selectedItem.id}</p>
          <p className="flex flex-row w-full mr-5 justify-between"><span className="text-3xl font-sans font-bold text-red-500">Username:</span> <span className="text-2xl font-sans font-bold">{selectedItem.username}</span></p>
          <p className="flex flex-row w-full mr-5 justify-between"><span className="text-3xl font-sans font-bold text-red-500">First Name:</span> <span className="text-2xl font-sans font-bold">{selectedItem.first_name}</span></p>
          <p className="flex flex-row w-full mr-5 justify-between"><span className="text-3xl font-sans font-bold text-red-500">Last Name:</span> <span className="text-2xl font-sans font-bold">{selectedItem.last_name}</span></p>
          <p className="flex flex-row w-full mr-5 justify-between"><span className="text-3xl font-sans font-bold text-red-500">Phone Number:</span> <span className="text-2xl font-sans font-bold">{selectedItem.phone_no}</span></p>
          <p className="flex flex-row w-full mr-5 justify-between"><span className="text-3xl font-sans font-bold text-red-500">Email:</span> <span className="text-2xl font-sans font-bold">{selectedItem.email}</span></p> */}

          <Layout className="w-full h-full bg-white rounded-lg shadow-lg">
            <Header className="text-black flex flex-row items-center bg-gray-300 my-1 rounded-lg">
              <Avatar shape="square" size="large" className="bg-black" icon={<UserOutlined />} />
              <span className="font-sans font-bold text-black text-2xl mx-5">
                  {selectedItem.username.charAt(0).toLocaleUpperCase() + selectedItem.username.slice(1)}
              </span>
            </Header>
          <Content className="w-full h-full p-3">
            
            
          </Content>

          </Layout>

        </>
        ) : (
          <p>No one selected</p>
        )}
        </Drawer>
      </>
    );
  }


  function ProblemWithDrawer({ data }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(null);

  
    const showDrawer = (item) => {
      getProblemData(item.id);
      setSelectedItem(item);
      setOpen(true);
    };
    
    const onClose = () => {
      setOpen(false);
    };

    const makePublic = () => {
      const newChecked = !checked;
      setChecked(newChecked);
      changeIsPublic(selectedItem.program_id, newChecked);
    };

    const changeIsPublic = (Token, isPublic) => {
      axios.get('http://localhost:8080/makePublic', {
        headers: {
          'accept': '*/*',
          'Token': Token,
          'isPublic': isPublic
        },
        
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };



    const getProblemData = (id) => {
      axios.get('http://localhost:8080/admin/getProblemById', {
        headers: {
        'accept': '*/*',
        'id': id,}})
      .then(response => {
      setSelectedItem(response.data)
      setChecked(response.data.isPublic)
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
    };
  
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                  View Profile
                </a>,
              ]}
            >
              <List.Item.Meta
                
                title={<a href="#">{item.name}</a>}
                description={`${item.owner}`}
              />
            </List.Item>
          )}
        />
        <Drawer width={640} title="User" onClose={onClose} open={open}>
          {selectedItem !== null ? (
            <>
              <Layout className="w-full h-full bg-transparent" >
                  <Header className="bg-black my-1 text-white rounded-lg font-bold">{selectedItem.title}</Header>
                  <Content className="p-2 rounded-lg bg-gray-200" >
                    <Divider orientation="left" orientationMargin={0}><span className="font-bold font-sans">DESCRIPTON</span></Divider>
                    <Markdown remarkPlugins={[remarkGfm, supersub, remarkRehype]}>{selectedItem.discription}</Markdown>
                    <Divider orientation="left" orientationMargin={0}><span className="font-bold font-sans">CODE</span></Divider>
                    <Markdown  remarkPlugins={[remarkGfm, supersub, remarkRehype]}>
  {`\`\`\`python\n${
    selectedItem && selectedItem.codeModel && selectedItem.codeModel.mainCode
      ? selectedItem.codeModel.mainCode
      : "not"
  }\n\`\`\``}
</Markdown>
                  </Content>
                  <Footer className="bg-gray-100 my-1 text-white rounded-lg font-bold">
                    
                    <Switch checked={checked} onChange={makePublic} checkedChildren="Public" unCheckedChildren="Private"/>
                  </Footer>
            </Layout>
            </>
          ):(
            <>
              <p>problem doestn't exist</p>
            </>
          )}
        </Drawer>
      </>
    );
  }


  function ExamWithDrawer({ data }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);
  
    const showDrawer = (item) => {

      setSelectedItem(item);
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                  View Profile
                </a>,
              ]}
            >
              <List.Item.Meta
                
                title={<a href="#">{item.name}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        <Drawer width={640} title="User" onClose={onClose} open={open}>
          <p>{selectedItem !== null ? selectedItem.id : "Test"}</p>
          <p>{selectedItem !== null ? selectedItem.name : "No User"}</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }


  const UserInfoComponent = ({ label , item }) => {
    return (
      <div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="pl-2 font-bold font-mono">{label}</span>
        </Divider>
        <div className="rounded-lg outline outline-blue-400">
          <p className="text-xl pl-3 text-gray-600 font-sans p-3">{item}</p>
        </div>
      </div>
    );
  };
export default AdminPage;