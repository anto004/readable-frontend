import React, {Component} from "react";
import "../App.css";
import serializeForm from "form-serialize";
import {addPostToServerThunk} from "../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class CreatePost extends Component{
    TITLE = "title";
    BODY = "body";
    AUTHOR = "author";

    state = {
        title: "",
        body: "",
        author: "",
        redirect: false
    };

    handleSubmit(e) {
        e.preventDefault();

        // const formValues = serializeForm(e.target, {hash: true});
        const uuid = require("uuid/v4");
        const id = uuid();
        const timestamp = Date.now();
        const category = "Hobbies"; //TODO Get category from Category component

        this.props.boundAddPost(id, timestamp, this.state.title, this.state.body, this.state.author, category);

        this.setState({
            redirect: true
        })
    }

    updateForm = (e, formType) => {
        switch(formType){
            case this.TITLE:
                this.setState({title: e.target.value});
                break;
            case this.BODY:
                this.setState({body: e.target.value});
                break;
            case this.AUTHOR:
                this.setState({author: e.target.value});
                break;
            default:
        }
    };

    render(){
        console.log("Create post match",this.props.match);
        return (
            <div>
                {this.state.redirect && <Redirect to="/posts"/>}
                <div className="form-container">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input type="text" className="form-title"
                               placeholder="title here" onChange={(event) => this.updateForm(event, this.TITLE)}/>
                        <textarea className="form-textarea" placeholder="Write your post here"
                                onChange={(event) => this.updateForm(event, this.BODY)}
                                wrap="hard"/>
                        <input type="text" className="form-author" placeholder="Your Name"
                                onChange={(event) => this.updateForm(event, this.AUTHOR)}/>
                        <button type="submit"
                                disabled={!this.state.title || !this.state.body || !this.state.author}>Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
        posts: state.post
});

const mapDispatchToProps = (dispatch) => ({
    boundAddPost: (id, timestamp, title, body, author, category) =>
        dispatch(addPostToServerThunk(id, timestamp, title, body, author, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);