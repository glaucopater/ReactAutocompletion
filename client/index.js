import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


require("../css/style.less");
 
ReactDOM.render(
  <App url={"https://jsonplaceholder.typicode.com/posts"} dataTarget={""} dataTargetKey={"title"}/>,  document.getElementById('content')    
  //<App url={"https://www.reddit.com/r/all/top.json"} dataTarget={"data.children"} dataTargetKey={"data.title"}/>,  document.getElementById('content')
  //<App url={"https://swapi.co/api/people/?format=json"} dataTarget={"results"} dataTargetKey={"name"}/>,  document.getElementById('content')
  //<App url={"/houses/"} dataTarget={""} dataTargetKey={"name"}/>,  document.getElementById('content')
  //<App url={"/coinlist/"} dataTarget={"Data"} dataTargetKey={"CoinName"}/>,  document.getElementById('content')
    
);