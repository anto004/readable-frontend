import "../App.css"
import React, {Component} from "react";
import Category from "../components/Category";
import {Route} from "react-router-dom";
import Posts from "../components/Posts"
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import PostDetail from "./PostDetail";
import EditComment from "./EditComment";

//TODO: use a modal for creating new post
//TODO: Fix bug on createPost: Both Posts and CreatePost are displayed
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

          <Route exact path="/" render={() => (
              <div>
                  <Category/>
                  <Posts/>
              </div>
          )}/>
          <Route exact path="/:category" component={Posts}/>
          <Route exact path="/createPost" component={CreatePost}/>
          <Route exact path="/:category/:id" component={PostDetail}/>
          <Route exact path="/:category/:post/:comment" component={EditComment}/>

      </div>
    );
  }
}

export default App;
