import React from 'react';
import 'App.scss';
import ArticleViewer from './components/ArticleViewer';

import Login from 'components/Login';
// import Upload from 'components/Upload';
// import Dropzone from 'components/Dropzone';

function App() {
  return (
    <ArticleViewer title={'title'} description={'description'} owner={'owner'} viewCount={30} />
  );
}

export default App;
