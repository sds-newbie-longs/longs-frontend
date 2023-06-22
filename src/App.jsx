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
          path="/article"
          element={
            <ArticleViewer
              title={'title'}
              description={'description'}
              owner={'owner'}
              viewCount={30}
              videoSrc={
                'https://act-longs.s3.ap-northeast-2.amazonaws.com/videos/ae51dni2iy61k4y27abe1k2gxql72b3g/master.m3u8'
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
