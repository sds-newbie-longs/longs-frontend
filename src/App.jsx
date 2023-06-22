import React from 'react';
import 'App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'components/MainPage';
import Login from 'components/Login';
import ArticleViewer from 'components/ArticleViewer';
import Upload from 'components/Upload';

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
              videoSrc={
                'https://act-longs.s3.ap-northeast-2.amazonaws.com/videos/c0c5afcaaad24d91bfb777440ef3bc12/master.m3u8'
              }
            />
          }
        ></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
