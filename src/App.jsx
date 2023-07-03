import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Template from "./components/Template";
import InfoForm from "./components/InfoForm";
import Result from "./components/Result";
import MyProfile from "./components/MyProfile";
import Edit from "./components/Edit";
function App() {
  const [template, setTemplate]= useState("")
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem('token'));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout isLogIn={isLogIn} setIsLogIn={setIsLogIn}/>} >
          <Route index element={<Login/>} />
          <Route path="/register" element={<Signup/>}/>
          <Route path="/create" element={<Template setTemplate={setTemplate}/>}/>
          <Route path="/info" element={<InfoForm template={template}/>}/>
          <Route path="/result" element={<Result/>}/>
          <Route path="/myprofile" element={<MyProfile/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
