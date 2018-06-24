import React, {Component} from "react";
import "../App.css";
import CommentBar from "./CommentBar";


class CommentDetail extends Component{

    render(){
        const {comment, body} = this.props;
        console.log("CommentDetail comment", comment)
        return(
            <div>
                <textarea className="comment-body">{body}</textarea>
                <CommentBar comment={comment}/>
            </div>
        );
    }
}

export default CommentDetail;