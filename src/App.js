import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube from 'youtube-node';


const apiKey = "AIzaSyA86pyToGLP4O6F07tuD7pqWUEI9o9JT5c";//あとで環境変数から渡す書き方に変える


// let youtube = new Youtube();
// youtube.setKey(apiKey);
//
// youtube.search('yunomi', 2, function(error, result) {
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log(JSON.stringify(result, null, 2));
//     }
// });



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoID:null,
            word:""

        };

        this.word = {word:""}

    }



    paramUpdate(param){
        console.log(param);
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <Inputs paramUpdate = {this.paramUpdate.bind(this)} />

      </div>
    );
  }
}





class Inputs extends Component {
    constructor(props) {
        super(props);
    }
    changeTextHandler(ev) {
        this.setState({word:ev.target.value});
        console.log(ev.target.value);
    }
    sendParamHandler() {
        this.props.paramUpdate(this.state.word);
    }
    render() {
        return (
            <div style = {{border:'solid 1px'}}>
                <div>Inputs</div>
                <input type="text" onChange = {this.changeTextHandler.bind(this)}/>
                <button onClick = {this.sendParamHandler.bind(this)}>Send</button>
            </div>
        );
    }

}

export default App;
