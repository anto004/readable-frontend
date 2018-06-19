import React, {Component} from "react";
import "../App.css";
import serializeForm from "form-serialize";
import {addPost} from "../actions";
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
        const category = "Hobbies";

        this.props.boundAddPost({
            "id":id,
            "timestamp": timestamp,
            "title": this.state.title,
            "body": this.state.body,
            "author": this.state.author,
            "category": category
        });

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
        return (
            <div>
                {this.state.redirect && <Redirect to="/posts"/>}
                <div className="form-container">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input type="text" className="form-title"
                               placeholder="title here" onChange={(event) => this.updateForm(event, this.TITLE)}/>
                        <input type="text" className="form-textarea" placeholder="Write your post here"
                                onChange={(event) => this.updateForm(event, this.BODY)}/>
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
    boundAddPost: (post) => dispatch(addPost(post))
});



export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);