import React from 'react';
import 'App.scss';
import ArticleViewer from './components/ArticleViewer';

function App() {
  return (
    <ArticleViewer title={'title'} description={'description'} owner={'owner'} viewCount={30} />
  );
}

export default App;
