import React, {Component} from "react";
import "../App.css";
import CommentBar from "./CommentBar";


class CommentDetail extends Component{

    render(){
        const {comment} = this.props;
        return(
            <div>
                <textarea className="comment-body">{comment.body}</textarea>
                <CommentBar comment={comment}/>
            </div>
        );
    }
}

export default CommentDetail;