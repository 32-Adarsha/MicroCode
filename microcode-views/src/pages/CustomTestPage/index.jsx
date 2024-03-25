
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import CButton from "../../components/Button";
import SplitPane from 'react-split-pane';
import { Select, message,Layout } from "antd";
import '../CustomTestPage/custom.css'
import axios from "axios";
import config  from "../../config/config.jsx";
import NavBar from "../../components/NavBar/index.jsx";



const layoutStyle = {

};

const contentStyle = {

};
const headerStyle = {

};




const CustomTestPage = ({ props }) => {
  const [value, setValue] = useState("");
  const [lang, setLang] = useState("cpp");
  const [testcase, setTestCase] = useState("");
  const [test,setTest] = useState("");
  const [substat, setsubstat] = useState("");
  const [mess,setMess] = useState("")
  const {Header, Content} = Layout;
  const [width, setWidth] = useState(1400)

  const language_id = {
    'cpp':54,
    'python':70,
    'java':62,
    'javascript':63,
    'csharp':51
  }


  const handleEditorChange = (value) => {
    setValue(value);

  };
  const handleEditorDidMount = (v) => {
   
  }

  ////////////////////////
  const submit_url = `http://0.0.0.0:2358/submissions?base64_encoded=true&wait=false`
  const get_url = `http://0.0.0.0:2358/submissions/`
  const submitCode = () => {
    axios.post(submit_url,{
      source_code :btoa(value),
      stdin: btoa(test),
      language_id : language_id[lang]
    }).then(e=>{
      if(e.status==201){
        
         const alt =  async () => {
          axios.get(`${get_url}${e.data.token}?base64_encoded=true`).then(f => {
             const a = f.data.status.id
             console.log(f.data.status.id);
             if(a==3) {
              setMess(atob(f.data.stdout))
              return f.data.message
             };
             if(a==6){
              setMess(f.data.status.description)
              return f.data.message
             }
             if(a==13) {
              setMess(f.data.status.description)
              return f.data.message
            };
            if(a==11) {
              setMess(f.data.status.description)
              return f.data.message
            };
            setMess(f.data.status.description)
             setTimeout(() => {
              alt();
            }, 1000);
            
  
          })
        }
          
        
        setMess(alt())
        

      }
      
    })
    

  }

  


  const items = config().plangs;

  const TestcasePane =  

      <div>
        <Select defaultValue={lang}
          style={{ width: "300px" }}
          options={items} onChange={
            (value) => { setLang(value); console.log(value); }
          }> </Select>
          <div className="test-out-container">
            <div> <p>Testcases</p>
            <textarea name="input" id="input" cols="30" rows="10" onChange={(e)=>{ e.preventDefault();setTest(e.target.value);}} value={test}></textarea>
            </div>
            <div>
              <p>Output</p>
              <textarea disabled name="output" id="output" cols="30" rows="10" value={mess}></textarea>
            </div>
          </div>
          <div>
            <CButton  onClick={()=>{
              submitCode()
            }}>Submit Code</CButton>
          </div>
      </div>
  

  return (
    <Layout>
      <Header width="100%">
      <NavBar/>
      </Header>
            

      <Content>
      <SplitPane split="vertical" defaultSize="50%"  onChange={(e)=>{
        setWidth(1870-e)
      }} >
        <div className="left-pane" style={contentStyle}>
          <div className="left-pane-wrapper-custom">
        
              
                {TestcasePane}

            
          </div>
        </div>
        <div className="right-pane" style={contentStyle}>
          <Editor
            height={'90vh'}
            width={width}
            language={lang}
            theme="vs-dark"
            automaticLayout={true}
            options={
              { wordWrapColumn: 80, }
            }
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
          />
        </div>
      </SplitPane>
    </Content>
    </Layout>
    
  );
};
export default CustomTestPage;