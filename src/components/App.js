import "../App.css"
import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import Posts from "../components/Posts"
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetail";
import FourOFourPage from "./FourOFourPage";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

          <Switch>
              <Route exact path="/" render={() => (
                  <div>
                      <Posts/>
                  </div>
              )}/>
              {/*List posts belonging to specific category navigational categories*/}
              <Route strict exact path="/:category" component={Posts}/>
              {/*Open a create new post page with categories to select from*/}
              <Route exact strict path="/createPost/" component={CreatePost}/>
              {/*Show a post detail*/}
              <Route exact path="/:category/:id" component={PostDetail}/>
              <Route component={FourOFourPage}/>
          </Switch>


      </div>
    );
  }
}

export default App;
