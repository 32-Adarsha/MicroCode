
import {Collapse,Layout, Menu, Breadcrumb, Card , Tag , Tabs} from 'antd';

const { Header, Content, Footer, Sider  } = Layout;
import { Button, Input, Select, Space , Divider } from 'antd';
import Editor from '@monaco-editor/react';
import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import './exam.css';
const {Panel} = Collapse;
const { Search } = Input;
const { TabPane } = Tabs;


const { TextArea } = Input;

const problems = [
    {"Name":"Two Sum Problem" , "tags":["Hard","DFS" ,"Queue"]},
    {"Name":"Namae" , "tags":["Easy","Stack"]},
    {"Name":"Namae" , "tags":["Hard","Stack"]},
    {"Name":"Two Sum Problem" , "tags":["Hard","DFS" ,"Queue"]},
    
    
  
]

const ShowProblem = ({ problems }) => {
    return (
        <div className='bg-black max-h-fit'>
            {problems.map((problem, index) => (
                <div key={index} className='w-full  bg-white my-2 p-2 flex flex-row justify-between items-center rounded-lg'>
                    <div className='w-full p-2 flex flex-col justify-center'>
                        <p className='font-sans text-xl font-bold'>{problem.Name}</p>
                        <div className='flex flex-row'>
                            {problem.tags.map((tag, index) => (
                                <Tag key={index} color={tag === "Hard" ? "red" : tag === "Easy" ? "green" : "magenta"}>{tag}</Tag>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button>Add</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
const ShowProblem2 = ({ problems }) => {
    return (
        <div className=''>
            {problems.map((problem, index) => (
                <div key={index} className='w-full bg-black my-2 p-2 flex flex-row justify-between items-center rounded-lg '>
                    <div className='w-full p-2 flex flex-col justify-around'>
                        <p className='font-sans text-xl font-bold text-white'>{problem.Name}</p>
                        <div className='flex flex-row'>
                            {problem.tags.map((tag, index) => (
                                <Tag key={index} color={tag === "Hard" ? "red" : tag === "Easy" ? "green" : "magenta"}>{tag}</Tag>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button>Remove</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}


const CreateExam = () => {
    const [test, setTest] = useState('');
    const [height, setHeight] = useState(548);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    const [viewDis , setViewDis] = useState(true)
    const [btnColor , setBtnColor] = useState("bg-white-300")
    return (
        <Layout className='h-screen p-1'>
            <Sider width={400} className="h-full py-2 px-3 rounded-lg flex flex-col justify-center">
                <h1 className='text-white font-bold w-full text-center font-sans text-3xl my-2'>SELECT QUESTION</h1>
                <Search placeholder="search question" className='mt-4' enterButton="Search" size="large" onSearch={value => console.log(value)}/>
                <div className='flex-grow flex flex-col w-full h-[660px] overflow-y-auto no-scrollbar'>
                    <ShowProblem problems={problems} />
                </div>
            </Sider>
            <Layout className='overflow-scroll'>
                <div className='w-full h-full p-1'>
                    <Layout  className='bg-white rounded-lg h-full'>
                        <div className='w-full flex flex-col h-full px-6'>
                            <h1 className='text-black font-bold w-full text-center font-sans text-4xl my-2'>CREATE EXAM</h1>
                            <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Title</h1>
                            <Input placeholder="Title" className='h-10 w-full'/>
                            <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Password</h1>
                            <Input placeholder="Password" className='h-10 w-full'/>
                            <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Discription</h1>
                            <TextArea rows={15} className='h-52 w-full' placeholder="maxLength is 150" maxLength={150} />
                            <div className='w-full h-full flex flex-row p-1 mt-2 rounded-lg'>
                                <div className='w-1/2 h-full bg-white  rounded-lg mr-1'>
                                    <Divider orientation='left'>
                                        <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl'>Questions</h1>
                                    </Divider>
                                    <ShowProblem2 problems={problems} />
                                </div>
                                <div className='w-1/2 h-full bg-white-300  px-3 py-1 border-l-2 border-gray-200'>
                                    <Divider orientation='left'>
                                        <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl'>Student</h1>
                                     </Divider>
                                    <Search placeholder="search student" enterButton="Add Studnet" size="large" onSearch={value => console.log(value)}/>
                                </div>
                            </div>
                        </div>
                        
                    </Layout>
                </div>
            </Layout>
        </Layout>
      );
}

export default CreateExam;