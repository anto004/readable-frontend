import React, {Component} from "react";
import "../App.css";
import {connect} from "react-redux";
import {addAllPost, addAllPostCommentsThunk, editCommentToServerThunk, editComponent} from "../actions";
import {POST, CATEGORY, COMMENT, EDIT_COMPONENT_STATE} from "../reducers";
import CommentBar from "./CommentBar";
import EditComment from "./EditComment";

class Comments extends Component{

    constructor(props){
        super(props);
        props.boundAddAllPostComments(props.postId)
    }

    render(){
        const {comments, editComponent} = this.props;
        console.log("editComponent", editComponent);
        return(
            <div className="comment-container">
                <h3 className="body-title">Comments</h3>
                <ol>
                {comments.map(comment => (
                    <li key={comment.id} className="comment-box">
                        {(editComponent.id === comment.id && editComponent.isOpen)
                            ? <EditComment comment={comment}
                                           boundEditComment={(id, timestamp, body) =>
                                                                         this.props.boundEditComment(id, timestamp, body)}
                                           boundEditComponent={(option) => this.props.boundEditComponent(option)}/>
                            : <div>
                                <textarea className="comment-body">{comment.body}</textarea>
                                <CommentBar comment={comment}/>
                            </div>
                        }
                    </li>
                ))}
                </ol>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.postId;
    return {
        comments: state[COMMENT].filter((comment) => (comment.parentId === postId) && !comment.parentDeleted),
        editComponent: state[EDIT_COMPONENT_STATE]
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundAddAllPostComments: (postId) => dispatch(addAllPostCommentsThunk(postId)),
    boundEditComment: (id, timestamp, body) => dispatch(editCommentToServerThunk(id, timestamp, body)),
    boundEditComponent: (option) => dispatch(editComponent(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);