import React, {Component} from "react";
import "../App.css";
import {connect} from "react-redux";
import {addAllPost, addAllPostCommentsThunk, editCommentToServerThunk, editComponent} from "../actions";
import {POST, CATEGORY, COMMENT, EDIT_COMPONENT_STATE} from "../reducers";
import CommentBar from "./CommentBar";
import EditComment from "./EditComment";
import CommentDetail from "./CommentDetail";

class Comments extends Component{
    state = {
        comments: []
    };

    constructor(props){
        super(props);
        props.boundAddAllPostComments(props.postId);
    }

    componentDidMount(){
        console.log("componentDidMount comments", this.props.comments);
    }

    render(){
        const {comments, editComponent} = this.props;
        console.log("comments from state", this.state.comments)

        return(
            <div className="comment-container">
                <h3 className="body-title">Comments</h3>
                <table>
                    {comments.map((comment) => (
                        <tr key={comment.id} className="comment-box">
                            <td>{(comment.id === editComponent.id && editComponent.isOpen)  && <EditComment comment={comment}
                                                                                                        boundEditComponent={(option) => this.props.boundEditComponent(option)}/>
                            }</td>
                            {/*<CommentDetail comment={comment}*/}
                            {/*body={comment.body}/>*/}
                            <td>{comment.body}
                                <textarea className="comment-body">{comment.body}</textarea>
                                <CommentBar comment={comment}/>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.postId;
    console.log("comments at mapStateToProp", state[COMMENT]);

    return {
        comments: state[COMMENT].filter((comment) => (comment.parentId === postId) && !comment.parentDeleted),
        editComponent: state[EDIT_COMPONENT_STATE]
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundAddAllPostComments: (postId) => dispatch(addAllPostCommentsThunk(postId)),
    boundEditComponent: (option) => dispatch(editComponent(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);