import "./App.css"
import React, {Component} from "react";
import * as PostAPI from "./utils/PostWebAppAPI";
import {url} from "./utils/PostWebAppAPI";

const getAllPostsFromServer = (posts) => {
    console.log("Post: ");
    posts && posts.map((post) => {
        console.log(post);
    })

};


const getAllCategoriesFromServer = () => {
    PostAPI.getCategories().then((categoriesS) => {
        console.log("All Categories");
        categoriesS.map((category) => console.log(category))
    })
};

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
      const posts = getAllPostsFromServer(this.state.posts);
      console.log("All posts", posts);
          // "id":id,
          // "timestamp": timestamp,
          // "title": title,
          // "body": body,
          // "author": author,
          // "category": category
      const title = "Graduate";

      if(this.state.comments.length !== 0){
          console.log("Comments: ");
          this.state.comments.map((post) => {
              console.log(post);
          })
      }

      if(Object.keys(this.state.post).length !== 0){
          console.log("post: ", this.state.post, " comments: ", this.state.comments);
          PostAPI.deletePost(this.state.post.id)
              .then(data => {
                  console.log("Delete post", data);
              });
          // "id": id,
          // "parentId": parentId,
          // "timestamp": timestamp,
          // "body": body,
          // "author": author
          const uuid = require("uuid/v4");
          const id = uuid();
          const commentId1 = "1234";
          const commentId2 = "2345";
          const timestamp = Date.now();
          const body = "I hope I will still graduate in React. I have to!";
          const author1 = "Antonio";
          const author2 = "Na Bung Sun";
          const category = this.state.post.category;
          const parentId =  "852e2ab7-b4f1-44d6-b9e9-c58412e769bc";

          // PostAPI.addPost(id, timestamp, title, body, author, category)
          //     .then(post => {
          //         console.log("Add new Post", post);
          //     })

          // for(var i = 0; i < this.state.comments.length; i++) {
          //     const comment = this.state.comments[i];
          //
          //     if(comment.parentId === this.state.post.id){
          //         for(var j = 0; j < 2; j++){
          //             if(comment.id === commentId1){
          //                 isPresent.comment1 = true;
          //             }
          //             if(comment.id === commentId2){
          //                 isPresent.comment2 = true;
          //             }
          //         }
          //     }
          // }
          // if(this.state.comments.length === 0){
          //     PostAPI.addPostComment(commentId1, timestamp, body, author1, parentId)
          //         .then(data => {
          //             console.log("Added comment1", data)
          //         });
          //     PostAPI.addPostComment(commentId2, timestamp, body, author2, parentId)
          //         .then(data => {
          //             console.log("Added comment2", data)
          //         });
          // }
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
