
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import CButton from "../../components/Button";

const EditorPage = ({props }) => {
  const [value, setValue] = useState("");
  const [lang, setLang] = useState("cpp");

  const handleEditorChange = (value) => {
    setValue(value);
    
  };
  const handleEditorDidMount = (v)=>{
    console.log("Here");
  }
  const submitCode = ()=>{
    console.log(value)
  }

  return (
    <div >
        <select name="select" id="lang" onChange={(e)=>{setLang(e.target.value); console.log(e.target.value);}}>
            <option value="cpp">CPP</option>
            <option value="python">PYTHON</option>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="kotlin">Kotlin</option>

        </select>
      <Editor
        height="85vh"
        width={'100vh'}
        language={lang}

        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
      <CButton onClick={submitCode}>
        Submit
      </CButton>
    </div>
  );
};
export default EditorPage;