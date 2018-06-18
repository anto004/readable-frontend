import "../App.css"
import React, {Component} from "react";
import * as PostAPI from "../utils/PostWebAppAPI";
import Category from "../components/Category";
import {Route} from "react-router-dom";
import Posts from "../components/Posts"
import CreatePost from "./CreatePost";
import post from "../reducers";
import {addPost} from "../actions";
import EditPost from "./EditPost";

//TODO: use a modal for creating new post
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

          <Route exact path="/" render={() => (
              <Category/>
          )}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/createPost" component={CreatePost}/>
          <Route path="/editPost/:id" component={EditPost}/>

      </div>
    );
  }
}

export default App;
