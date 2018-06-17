import React, {Component} from "react";
import "../App.css";
import serializeForm from "form-serialize";
import {ADD_POST, addPost} from "../actions";

class CreatePost extends Component{

    handleSubmit(e) {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});
        console.log("Form Values", values);
    }

    render(){
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
export default CreatePost;