
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Button, Input, Select, Space } from 'antd';
import Editor from '@monaco-editor/react';
import React, { useState } from 'react';
import SplitPane from 'react-split-pane';


const { Search } = Input;

const items = [
    {
      key: '1',
      label: 'Qestion 1',
    },
    {
      key: '2',
      label: 'Qestion 2',
    },
    {
      key: '3',
      label: 'Qestion 3',
    },
  ];
  const items2 = [
    {
      key: '1',
      label: 'Output',
    },
    {
      key: '2',
      label: 'Error',
    },
  ];

const TakeExam = () => {
    const [test, setTest] = useState('');
    const [height, setHeight] = useState(548);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    const [viewDis , setViewDis] = useState(true)
    const [btnColor , setBtnColor] = useState("bg-white-300")
    return (
        <Layout className='h-screen p-1'>
            <Sider width={200} className="h-full rounded-lg">
                
                <div className='bg-black  w-full h-full flex flex-col justify-between rounded-lg p-1 py-2'>
                    <div>
                        <h1 className='text-white w-full text-center font-sans text-3xl my-2'>Questions</h1>
                        <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline' items={items} ></Menu>
                    </div>
                        
                        <Button className='bg-white-300 mx-1 h-12 align-bottom'> Submit </Button>
                    
                </div>
            </Sider>
            <Layout>
                <div className='w-full h-full p-1'>
                    <Layout  className='bg-white rounded-lg h-full'>
                    <SplitPane split="horizontal" style={{ position: "static" }} size={height} onChange={(e) => {setHeight(e)}}>
                        <div className='w-full h-full'>
                            <div className='flex flex-row text-white  w-full h-10 py-1 rounded-lg justify-center'>
                                    <Button className={`mx-1 ${btnColor}`} onClick={() => setViewDis(false)} >
                                        Discription
                                    </Button>
                                    <Button className={`mx-1 ${btnColor}`} onClick={() => setViewDis(true)} >
                                        Code
                                    </Button>
                                    <Button className='bg-white-300 mx-1'>
                                        Run
                                    </Button>
                                    <Select
                                        defaultValue="python"
                                        style={{ width: 120 }}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'python', label: 'Python' },
                                            { value: 'c++', label: 'C++' },
                                            { value: 'javascript', label: 'Javascript' },
                                            { value: 'java', label: 'Java',},
                                        ]}
                                    />

                            </div>
                            {viewDis ? (
                                <Editor className="w-full p-2 pt-6" theme="vs-light" onChange={(v) => { setTest(v); }} />) : 
                                (
                                    <div className='w-fullp-2 pt-6 ml-7'>
                                        <h1>Test</h1> 
                                    </div>
                                    
                            )}
                        </div>
                        <div className='w-full h-full bg-black rounded-lg mt-1 p-2'>
                            <Layout className='bg-gray-50 rounded-lg'>
                                <div className='flex flex-row text-white  w-full h-10 py-1 rounded-lg items-center'>
                                    <Button className='bg-white-300 mx-1'>
                                        Terminal
                                    </Button>
                                
                                    <Button className='bg-white-300'>
                                        Output
                                    </Button>
                                </div>
                            </Layout>
                        </div>
                        </SplitPane>
                    </Layout>
                </div>
            </Layout>
        </Layout>
      );
}


export default TakeExam;