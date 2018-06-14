import "./App.css"
import React, {Component} from "react";
import * as PostAPI from "./utils/PostWebAppAPI";
import {url} from "./utils/PostWebAppAPI";

const getAllPostsFromServer = () => {
    PostAPI.getAllPosts().then((postsS) => {
        console.log("All posts");
        postsS.map((post) => console.log(post))
    });
};

const getAllCategoriesFromServer = () => {
    PostAPI.getCategories().then((categoriesS) => {
        console.log("All Categories");
        categoriesS.map((category) => console.log(category))
    })
};

class App extends Component {
    state = {
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
    }

  render() {
      getAllPostsFromServer();

      if(this.state.post){
          console.log("post: ", this.state.post, " comments: ", this.state.comments);
          // "id": id,
          // "parentId": parentId,
          // "timestamp": timestamp,
          // "body": body,
          // "author": author
          const uuid = require("uuid/v4");
          const id = uuid();
          const parentId = this.state.post.id;
          const timestamp = Date.now();
          const body = "I want to graduate in React!!";
          const author = "Antonio";
          for(var i = 0; i < this.state.comments.length; i++) {
              const comment = this.state.comments[i];

              if(comment.parentId === this.state.post.id && comment.author === "Antonio"){
                  PostAPI.voteComment(comment.id, "downVote")
                      .then(data => {
                          console.log("Get Comment: ", data)
                      });
              }
          }
      }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
      </div>
    );
  }
}

export default App;
