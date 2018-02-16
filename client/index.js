import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


require("../css/style.less");

ReactDOM.render(
  <App url={"https://jsonplaceholder.typicode.com/posts"}/>,  document.getElementById('content')
);