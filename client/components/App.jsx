import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import axios from 'axios';  
   

function Highlight(props)
{    
  var fullString = props.data.matchedItem.title;
  var searchedValue = props.data.searchedValue;
  var position = props.data.matchedPosition;
   
  var offset = 10;
  var leftSide = fullString.substring(position-offset, position);
    if (position!=0)
        leftSide = "..."+leftSide;
    
  var rightSide = fullString.substring(position+searchedValue.length,position+searchedValue.length+offset);
  rightSide += "...";
    
  return (<div className="matchedItem" >{leftSide}<span className="highlight">{searchedValue}</span>{rightSide}</div>);  
}
  
    
class ItemList extends React.Component {
    
  constructor(props) {
    super(props); 
    this.handleTextClick = this.handleTextClick.bind(this);
      
  }
    
     handleTextClick(event) {           
         console.log("Item selected!");
     }   
     
      
    render()
      { 
          const info = this.props.info;
                 
          const listItems = info.map((item,i) =>    
            <li key={item.id}><Highlight data={item}/></li>
          );
          return (
            <ul className={`autoCompletionBox ${listItems.length>0 ? 'show' : ''}`} onClick={this.handleTextClick}>{listItems}</ul>
          );

      
      }
    
    
  
   
}

  

class App extends React.Component {
  constructor() {
    super();
    console.log("init");
    
    this.state = {
      time: null,
      loading: true,
      searchValue: '',
      cursor: 0
    };
    
    this.handleChange = this.handleChange.bind(this)         
    this.handleTextClick = this.handleTextClick.bind(this)   
    this.handleKeyPress = this.handleKeyPress.bind(this)     
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {  
    axios.get(this.props.url)
      .then(response => {
        this.setState({
          data: response.data,
          matches: [],
          matchesInfo : [],
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
   search()
  {
    var that = this;   
    var items = that.state.data;
    var currentMatches = [];
    var currentMatchesInfo = [];
    var val = that.state.searchValue;
    if (val.trim()!="")
    {
        for (var i=0;i<items.length;i++)
      {
        var matchedPosition = items[i].title.lastIndexOf(val);
        if (matchedPosition!=-1)
        {            
         currentMatchesInfo.push({'id':items[i].id,'matchedItem':items[i],'searchedValue':val,'matchedPosition':matchedPosition});
        }
      }    
        if (currentMatchesInfo.length>0)
        { 
          this.setState({matchesInfo: currentMatchesInfo})           
        }  
      }    
        
      
  }
  
   handleChange(event){         
       this.search(event.target.value);
       if(event.target.value!=='')
       {
        this.setState({searchValue: event.target.value})
       }
        else
            this.setState({searchValue: ''})   
    }
  
 
    handleTextClick(event) {  
        event.target.value='' 
     }   
     
    handleKeyDown(event)
    {
        /*Delete key */
        if (event.keyCode==8) {
            if (event.target.value=="" || this.state.searchValue=="")
                {
                    this.setState({matchesInfo: []})         
                }            
        } 
    }
    
    handleKeyPress(event) {
        if (event.key === 'Enter' || event.key=='Delete') {
            if (event.target.value=="")
                {
                    this.setState({matchesInfo: []})         
                }            
        }
         
    }
    
    

  render() {
    var content;
    var that = this;
    if (that.state.loading) {
      content = 'Loading remote content from...';
    } else {             
      
        content = <ItemList data={that.state.matches} info={that.state.matchesInfo}/>;
    }

    return (
      <div>
        <div className="myHidden"><label>Json Url</label>
            <input type='text'  defaultValue={this.props.url}/></div>          
        <div>
          <h2>AutoCompletion Web Component</h2>
          <div> 
           <input className="input" type="text" placeholder="Search..." defaultValue="" onChange={this.handleChange} onClick={this.handleTextClick} onKeyPress={this.handleKeyPress} onKeyDown={ this.handleKeyDown } /> 
            </div>
        {content}
        </div>
      </div>
    );
  }
}


export default App;
