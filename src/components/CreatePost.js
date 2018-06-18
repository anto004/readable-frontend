import React, {Component} from "react";
import "../App.css";
import serializeForm from "form-serialize";
import {addPost} from "../actions";
import {connect} from "react-redux";

class CreatePost extends Component{
    state = {
        category: [],
        posts: [],
        comments: []
    };
    componentDidMount(){
        // const {store} = this.props
        // store.subscribe(() => {
        //     this.setState({
        //         category: store.getState().category
        //     });
        //
        //     this.setState({
        //         posts: store.getState().posts
        //     });
        //
        //     this.setState({
        //         comments: store.getState().comments
        //     });
        //     console.log("subscribe called", store.getState());
        // })
    }

    handleSubmit(e) {
        e.preventDefault();
        const formValues = serializeForm(e.target, {hash: true});
        console.log("Form Values", formValues);

        const uuid = require("uuid/v4");
        const id = uuid();
        const timestamp = Date.now();
        const title = formValues.title;
        const body = formValues.body;
        const author = formValues.author;
        const category = "Hobbies";
        this.props.store.dispatch(addPost({
            "id":id,
            "timestamp": timestamp,
            "title": title,
            "body": body,
            "author": author,
            "category": category
        }))
    }

    render(){
        console.log("create post props", this.props);
        return (
            <div>
                <div className="form-container">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input type="text" className="form-title" name="title" placeholder="title here"/>
                        <input type="text" className="form-textarea" placeholder="Write your post here" name="body"/>
                        <input type="text" className="form-author" placeholder="Your Name" name="author"/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.post
    };
};

export default connect(mapStateToProps,)(CreatePost);