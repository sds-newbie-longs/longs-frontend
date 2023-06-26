import React, { useState } from 'react';
import 'App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'components/MainPage';
import Login from 'components/Login';
import Upload from 'components/Upload';

function App() {
  const [uploadCode, setUploadCode] = useState(0);
  const handleUploadCode = code => {
    setUploadCode(code);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage uploadCode={uploadCode} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/upload" element={<Upload handleUploadCode={handleUploadCode} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
