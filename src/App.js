import "./App.css"
import React, {Component} from "react";
import * as PostAPI from "./utils/PostWebAppAPI";

class App extends Component {
    state = {
        posts: [],
        post: {},
        comments: []
    };
    componentDidMount(){
        const postId = "852e2ab7-b4f1-44d6-b9e9-c58412e769bc";
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
      </div>
    );
  }
}

export default App;
