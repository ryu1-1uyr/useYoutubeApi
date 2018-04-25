import React, { Component } from 'react';
import './App.css';
import key from './key';
import jsonp from 'fetch-jsonp';




class App extends Component {
    constructor(props){
        super(props);
        this.state = {

            videoID:null,
            word:""

        };

        this.fetchList = [{id:"",title:"",img:""}, {id:"",title:"",img:""}, {id:"",title:"",img:""}];

        this.url = "https://www.googleapis.com/youtube/v3/search?type=video&" + "part=snippet&maxResults=3&q=" ;
        this.url_b = "&key=" + key.key.key;
            //url + word + key
        this.word = {word:""}

    }

    searchForYoutube(words){


        jsonp(this.url + words + this.url_b)
            .then(res => res.json())
            .then(json => {
                for (let i =0; i<3;i++ ){
                    this.fetchList[i]["title"] = json["items"][i]["snippet"]["title"];
                    this.fetchList[i]["id"] = json["items"][i]["id"]["videoId"];
                    this.fetchList[i]["img"] = json["items"][i]["snippet"]["thumbnails"]["default"]["url"];
                }
                //testcode あとで消せ↓
                for (let i =0; i<3;i++ ){
                    console.log(this.fetchList[i]["title"]);
                    console.log(this.fetchList[i]["id"]);
                    console.log(this.fetchList[i]["img"])
                }
                this.setState({videoID:this.fetchList[0]["id"]})//強制的にsetStateして　初期処理にはとてもいいかも知れないw
            })
    };


    paramUpdate(param){
        this.searchForYoutube(param)
    }

  render() {

        const setstate =(id) => {
            this.setState({videoID:id})
        };

        const Vue = () => {
          return(
              <div>
                  <div>
                      <p>{this.fetchList[0].title}</p>
                      <img src={this.fetchList[0].img} alt="" onClick={()=>{setstate(this.fetchList[0].id)}}/>
                  </div>

                  <div>
                      <p>{this.fetchList[1].title}</p>
                      <img src={this.fetchList[1].img} alt="" onClick={()=>{setstate(this.fetchList[1].id)}}/>
                  </div>

                  <div>
                      <p>{this.fetchList[2].title}</p>
                      <img src={this.fetchList[2].img} alt="" onClick={()=>{setstate(this.fetchList[2].id)}}/>
                  </div>
              </div>
          )
        };

    return (
      <div className="App">

          <p>top3</p>

          <Vue />

          <Inputs paramUpdate = {this.paramUpdate.bind(this)} />

          <iframe id="ytplayer" width="480" height="270"
                  src={"http://www.youtube.com/embed/" + this.state.videoID}
                  frameborder="0"/>

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
    }
    sendParamHandler() {
        this.props.paramUpdate(this.state.word);
    }
    render() {
        return (
            <div style = {{border:'solid 1px'}}>
                <div>Inputs</div>
                <input type="text" onChange = {this.changeTextHandler.bind(this)} required/>
                <button onClick = {this.sendParamHandler.bind(this)}>Send</button>
            </div>
        );
    }

}

export default App;
