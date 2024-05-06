import { Layout, Menu, Input, Drawer, Button, Switch, Calendar, Slider } from "antd";
const { Header, Content, Footer, Sider, } = Layout;
import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { List } from 'antd';
const { Search } = Input;
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkRehype from 'remark-rehype'
import Markdown from 'react-markdown';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { CodeBlock } from "react-code-blocks";
const { Item } = List;






const ExamViewPage = () => {
  const [iCretedExam, setICreatedExam] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentStudentRecord, setCurrentStudentRecord] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const userDataUrl = 'http://localhost:8080/getCreated'

    const getData = () => {
      axios.get(userDataUrl)
        .then(res => {
          setICreatedExam(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.error('Error fetching site stats:', error);
        });

      setLoading(false)
    };

    getData();
  }, []);


  const handleMenuItemClick = (item) => {
    axios.get('http://localhost:8080/getUserExamReport', {
      headers: {
        'accept': '*/*',
        'examId': item.id,
      }
    })
      .then(response => {
        setSelectedItem(response.data)
        setSelectedExam(item.id)
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handelViewStudent = (sid) => {
    axios.get('http://localhost:8080/getUserExamDetail', {
      headers: {
        'accept': '*/*',
        'examId': selectedExam,
        'studenId': sid,
      }
    })
      .then(response => {
        setCurrentStudentRecord(response.data);
        setOpenDrawer(true);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };




  return (

    <Layout className="m-1 w-full h-full">
      <div className="flex flex-row justify-center items-center m-1 bg-gray-900 h-14 rounded-lg">
        <h1 className="w-full text-center text-white text-3xl font-sans font-bold flex flex-row items-center justify-center">Exams</h1>
      </div>
      <Layout className="w-full h-full">
        <Sider className="w-full h-full">
          {iCretedExam != null && (
            <Menu>
              {iCretedExam.map(item => (
                <Menu.Item key={item.id} onClick={() => handleMenuItemClick(item)}>
                  {item.name}
                </Menu.Item>
              ))}
            </Menu>
          )}
        </Sider>
        <Layout className="p-5">
          <>
            {Array.isArray(selectedItem) && selectedItem.length > 0 ? (
              <List
                dataSource={selectedItem}
                renderItem={item => (
                  <>
                    <Item>
                      <List.Item.Meta
                        avatar={<Avatar>{item.user[0]}</Avatar>}
                        title={item.user}
                        description={item.email}
                      />
                      <Button onClick={() => { handelViewStudent(item.id) }}>
                        View Attempt
                      </Button>
                    </Item>
                    <div className="flex flex-row justify-between px-11 w-full items-center">
                      <div className="font-bold font-sans">Attempt Count: <span className="font-light">{item.atmCount}</span></div>
                      <div className="font-bold font-sans">Taken: <span className="font-light">{item.taken ? 'Yes' : 'No'}</span></div>
                      <div className="font-bold font-sans">Total Score:<span className="font-light">{item.totalScore}</span> </div>
                    </div>
                  </>
                )}
              />
            ) : (
              <div>No selected items</div>
            )}
          </>
          <Drawer title="User Codes" onClose={() => { setOpenDrawer(false) }} open={openDrawer}>
            {currentStudentRecord != null &&
              currentStudentRecord.probles != null &&
              Array.isArray(currentStudentRecord.probles) ? (
              <>
                {currentStudentRecord.probles.map((problem, index) => (
                  <div key={index} className="flex flex-col justify-between items-center">
                    <Divider><p>{problem.title}</p></Divider>


                    <CodeBlock
                      text={problem.code}
                      language={'cpp'}
                      showLineNumbers={true}
                      wrapLines
                    />

                  </div>
                ))}
              </>
            ) : (
              <>
                {/* You can add a message or any other component to display when currentStudentRecord or currentStudentRecord.probles is undefined */}
                <p>No problems available</p>
              </>
            )}
          </Drawer>

        </Layout>

      </Layout>
    </Layout>

  )
}

export default ExamViewPage;