import React from 'react';
import 'App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'components/MainPage';
import Login from 'components/Login';
import ArticleViewer from 'components/ArticleViewer';
import Upload from 'components/Upload';

// import Upload from 'components/Upload';
// import Dropzone from 'components/Dropzone';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/articleviwer"
          element={
            <ArticleViewer
              title={'title'}
              description={'description'}
              owner={'owner'}
              viewCount={30}
            />
          }
        ></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
