import { Layout , Menu, Input , Drawer} from "antd";
const { Header, Content, Footer, Sider , } = Layout;
import { useState } from 'react';
import { Divider } from 'antd';
import { List, Avatar} from 'antd';
const { Search } = Input;


import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
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
                    <ProblemWithDrawer data={problem}/>
                </Layout>
            ): (
                <Layout className="bg-white rounded-lg shadow-lg p-3">
                    <h1 className="w-full text-black text-4xl font-sans font-bold mt-5 text-center">USERS</h1>
                    <Divider orientation="left">Users</Divider>
                    <Search placeholder="search user" className='' enterButton="Search" size="large" onSearch={value => console.log(value)}/>
                    <ListWithDrawer data={data}/>
                </Layout>)}
            </Layout>
        </Layout>
      );
}

function ListWithDrawer({ data }) {
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


  function ProblemWithDrawer({ data }) {
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
export default AdminPage;