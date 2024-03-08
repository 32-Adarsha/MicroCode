
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import CButton from "../../components/Button";
import SplitPane from 'react-split-pane';
import { Select, message } from "antd";
import '../EditorPage/editorpage.css'
import axios from "axios";



const layoutStyle = {
  height: '100vh',
};

const contentStyle = {
  width: '80vw',
  flex: 1,
};
const headerStyle = {
  height: '60px',
  backgroundColor: '#f5f5f5',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};




const EditorPage = ({ props }) => {
  const [value, setValue] = useState("");
  const [lang, setLang] = useState("cpp");
  const [testcase, setTestCase] = useState("");
  const [test,setTest] = useState("");
  const [substat, setsubstat] = useState("");
  const [mess,setMess] = useState("")

  const language_id = {
    'cpp':54
  }


  const handleEditorChange = (value) => {
    setValue(value);

  };
  const handleEditorDidMount = (v) => {
    console.log("Here");
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
              return f.data.message};
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

  


  const items = [
    {
      label: (
        <p>C++</p>
      ),
      value: 'cpp',
    },
    {
      label: (
        <p>Python</p>
      ),
      value: 'python',
    },
    {
      label: (
        <p>JavaScript</p>
      ),
      value: 'javascript',
    },
    {
      label: (
        <p>Java</p>
      ),
      value: 'java',
    },
    {
      label: (
        <p>C Sharp</p>
      ),
      value: 'csharp',
    },


  ];

  const TestcasePane =  

      <div>
        <Select defaultValue={lang}
          style={{ width: "300px" }}
          options={items} onChange={
            (value) => { setLang(value) }
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
    <div style={layoutStyle} className="edit-body">
      <SplitPane split="vertical" defaultSize="50%" minSize={400} maxSize={900} >
        <div className="left-pane" style={contentStyle}>
          <div className="left-pane-wrapper">
            <SplitPane split="horizontal" defaultSize="50%" minSize={200} >
              <div className="upper-half">Problem Descripton</div>
              <div className="lower-half">
                {TestcasePane}

              </div>
            </SplitPane>
          </div>
        </div>
        <div className="right-pane" style={contentStyle}>
          <Editor
            height={'100vh'}
            width={'100%'}
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
    </div>
  );
};
export default EditorPage;