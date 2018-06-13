import "./App.css"
import React, {Component} from "react";
import * as PostAPI from "./utils/PostWebAppAPI";
import {url} from "./utils/PostWebAppAPI";

class App extends Component {
  render() {
//       const id = require("uuid/v4");
//       const timestamp = Date.now();
//       const title = "Cabbage Porridge Soup";
//       const body = "There is a taste of happiness in your soup";
//       const author = "A";
//       const category = "udacity";
//
//       const categories = PostAPI.getCategories();
//       console.log("categories", categories);
      const postId = "8xf0y6ziyjabvozdd253nd";

      PostAPI.getPost(postId).then((posts) => {
          console.log("Component post", posts)
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
