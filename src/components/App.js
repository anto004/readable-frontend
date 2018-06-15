import "../App.css"
import React, {Component} from "react";
import * as PostAPI from "../utils/PostWebAppAPI";
import Category from "../components/Category";
import {Route} from "react-router-dom";
import Posts from "../components/Posts"
import CreatePost from "./CreatePost";

//TODO: use a modal for creating new post
class App extends Component {
    state = {
        posts: [],
        post: {},
        comments: []
    };
    componentDidMount(){
        const postId = "8xf0y6ziyjabvozdd253nd";
        PostAPI.getPost(postId).then(p => {
            this.setState({
                post: p
            })
        });

        PostAPI.getPostComments(postId)
            .then(comments => {
                this.setState({
                    comments: comments
                })
            });
        PostAPI.getAllPosts().then(posts => {
            this.setState({
                posts: posts
            })
        })
    }

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

      </div>
    );
  }
}

export default App;
