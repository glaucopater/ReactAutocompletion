import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import axios from 'axios';  
   

 const getTargetData = (responseData,stringToExplode) => {
            var subdataElements = stringToExplode.split(".");
            var currentLevel = subdataElements[0];
            subdataElements.shift();
            if (subdataElements.length===0)
                {
                    if(currentLevel!="")
                        return responseData[currentLevel];
                    else
                        return responseData;
                }
            else
                {
                    var newStringToExplode = subdataElements.join(".");
                    return getTargetData(responseData[currentLevel],newStringToExplode);
                }
    }

 const Highlight = (props) =>{    
    
    
    var fullString = getTargetData(props.data.matchedItem,props.dataTargetKey);
    var searchedValue = props.data.searchedValue;
    var position = props.data.matchedPosition;
    var myKey = props.myKey;
    var cursor = props.cursor;     
    var id = props.data.matchedItem.id; 

    var offset = 5;
    var leftSide = fullString.substring(position-offset, position);
    if (position>offset)
        leftSide = "..."+leftSide;

    var rightSide = fullString.substring(position+searchedValue.length,position+searchedValue.length+offset);
    rightSide += "..."; 
    
    return (<div className={`matchedItem ${cursor === myKey ? 'active' : ''}`}
			  >{leftSide}<span className="highlight">{searchedValue}</span>{rightSide}</div>);  
}
  
    
class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextClick = this.handleTextClick.bind(this); 
        this.state = {highlightedValue: -1};
    }  
    
    handleTextClick = (e) => {           
         console.log("Item selected!");
     }       
    
    componentDidMount= (nextProps) => { 

        var that = this;

        document.onkeydown = function(e){

            switch (e.keyCode) {
                case 38: // up 
                    if (this.state.highlightedValue > 0) {
                        this.setState({
                            highlightedValue: this.state.highlightedValue -= 1
                        });
                    }
                    break;
                case 40: // down 
                    if (this.state.highlightedValue < this.props.info.length-1) {
                        this.setState({
                            highlightedValue: this.state.highlightedValue += 1
                        });
                    }
                    break;
            }
        }.bind(this);
 
    }
	  
     
      
    render = () =>
      { 
          const info = this.props.info;
	      const cursor = this.props.cursor; 
          const dataTargetKey = this.props.dataTargetKey;
                 
          const listItems = info.map((item,i) =>    
            <li key={i}><Highlight data={item} cursor={this.state.highlightedValue} myKey={i} dataTargetKey={dataTargetKey}/></li>
          );
          return (
            <ul className={`autoCompletionBox ${listItems.length>0 ? 'show' : ''}`} onClick={this.handleTextClick}>{listItems}</ul>
          );

      
      }
    
    
  
   
}

  

class App extends React.Component {
  constructor()   {
    super();
      
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
    
   

  componentDidMount = () => {  
    axios.get(this.props.url)
      .then(response => {
        
        var targeData = getTargetData(response.data,this.props.dataTarget);
        this.setState({
          data: targeData,
          matches: [],
          matchesInfo : [],
          loading: false
        });
        //console.log(getTargetData(response.data,this.props.dataTarget));
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
      for (var i=0;i<10;i++)
      {
        var dataTargetKeyVal = getTargetData(items[i],this.props.dataTargetKey);
      //    console.log(dataTargetKeyVal);
        var matchedPosition = dataTargetKeyVal.lastIndexOf(val);
        if (matchedPosition!=-1)
        {     currentMatchesInfo.push({'id':items[i].id,'matchedItem':items[i],'searchedValue':val,'matchedPosition':matchedPosition});
        }
      }    
        if (currentMatchesInfo.length>0)
        { 
          this.setState({matchesInfo: currentMatchesInfo})           
        }  
      }    
        
      
  }
  
    handleChange = (event) => {         
       this.search(event.target.value);
       if(event.target.value!=='')
       {
        this.setState({searchValue: event.target.value})
       }
        else
            this.setState({searchValue: ''})   
    }
  
 
    handleTextClick = (event) => {  
        event.target.value='' 
     }   
     
    handleKeyDown = (event) => {
        /*Delete key */
        if (event.keyCode==8) {
            if (event.target.value=="" || this.state.searchValue=="")
                {
                    this.setState({matchesInfo: []})         
                }            
        } 
    }
    
    handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key=='Delete') {
            if (event.target.value=="")
                {
                    this.setState({matchesInfo: []})         
                }            
        }
         
    }
     
  render = () => {
    var content;
    var that = this;
    if (that.state.loading) {
      content = 'Loading remote content from...';
    } else {             
      
        content = <ItemList data={that.state.matches} info={that.state.matchesInfo}  cursor={that.state.cursor} dataTargetKey={that.props.dataTargetKey} />;
    }

    return (
      <div>
        <div className="myHidden"><label>Json Url</label>
            <input type='text'  defaultValue={this.props.url}/></div>          
        <div>
          <h2>AutoCompletion Web Component</h2>
          <div> 
           <input className="input" type="text" placeholder="Search..." defaultValue="" onChange={this.handleChange} onClick={this.handleTextClick} onKeyPress={this.handleKeyPress} onKeyDown={ this.handleKeyDown } onKeyDown={ this.handleKeyDown }/> 
            </div>
        {content}
        </div>
      </div>
    );
  }
}


export default App;
