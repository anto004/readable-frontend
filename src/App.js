import "./App.css"
import React, {Component} from "react";
import * as PostAPI from "./utils/PostWebAppAPI";

class App extends Component {
  render() {
      const categories = PostAPI.getCategoryPosts();
      console.log("categories", categories);

      PostAPI.getCategoryPosts().then((posts) => {
          console.log("Component category posts", posts)
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
