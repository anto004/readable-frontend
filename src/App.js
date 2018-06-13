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
        post: {}
    };
    componentDidMount(){
        const postId = "8xf0y6ziyjabvozdd253nd";
        PostAPI.getPost(postId).then(p => {
            this.setState({
                post: p
            })
        });
    }

  render() {
      getAllPostsFromServer();

      const title = "Udacity is the best place to learn React and also Android";
      const body = "Everyone says so and I used it myself too";
      this.state.post.id && PostAPI.getPostComments(this.state.post.id)
          .then(post => {
              console.log("Post comments", post)
          });


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
