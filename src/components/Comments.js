import React, {Component} from "react";
import {connect} from "react-redux";
import {addAllPostCommentsThunk, editComponent} from "../actions";
import {COMMENT, EDIT_COMPONENT_STATE} from "../reducers";
import CommentBar from "./CommentBar";
import EditComment from "./EditComment";
import CreateComment from "./CreateComment";


class Comments extends Component{
    constructor(props){
        super(props);
        if(props.comments.length === 0){
            props.boundGetAllComments(props.postId); //when page is refreshed comments in redux state is lost, add comments to state
        }
    }

    render(){
        const {categoryName, editComponent, postId} = this.props;
        return(
            <div>
                <div className="comment-container">
                    <h3 className="body-title">Comments</h3>
                    <table>
                        <tbody>
                        {this.props.comments.map((comment, index) => (
                            <tr key={index + " " + comment.id} className="comment-box">
                                <td>
                                    {(comment.id === editComponent.id && editComponent.isOpen)
                                        ? <EditComment comment={comment}
                                                       boundEditComponent={(option) => this.props.boundEditComponent(option)}/>
                                        : <div>
                                            <div className="comment-body">{comment.body}</div>
                                            {/*Passing property as props. Passing comment object by itself would not update the component when the object property changes eg body changes*/}
                                            <CommentBar commentId={comment.id}
                                                        author={comment.author}
                                                        voteScore={comment.voteScore}
                                                        parentId={comment.parentId}
                                                        categoryName={categoryName}/>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                        <tr className="comment-box">
                            <CreateComment parentId={postId}/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, myProps) => {
    const postId = myProps.postId;
    const categoryName = myProps.categoryName;

    return {
        postId: postId,
        categoryName: categoryName,
        comments: state[COMMENT],
        editComponent: state[EDIT_COMPONENT_STATE]
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundGetAllComments: (id) => dispatch(addAllPostCommentsThunk(id)),
    boundEditComponent: (option) => dispatch(editComponent(option))
});

export default connect(mapStateToProps, mapDispatchToProps) (Comments)