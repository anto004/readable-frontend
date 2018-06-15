import React, {Component} from "react";
import "../App.css";

class CreatePost extends Component{
    handleSubmit(e) {
        e.preventDefault();
        console.log("Form Values", );

    }
    render(){
        return (
            <div>
                <div className="form-container">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input type="text" className="form-textarea" placeholder="Write your post here" name="postBody"/>
                        <input type="text" className="form-author" placeholder="Your Name" name="author"/>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default CreatePost;