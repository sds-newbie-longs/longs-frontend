import React from 'react';
import 'App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'components/MainPage';
import Login from 'components/Login';
import Upload from 'components/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
