import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
  <App url={"https://jsonplaceholder.typicode.com/posts"}/>,  document.getElementById('content')
);