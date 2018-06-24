import React, {Component} from "react";
import "../App.css";
import ThumbsUp from "react-icons/lib/fa/thumbs-o-up";
import ThumbsDown from "react-icons/lib/fa/thumbs-o-down";
import EditIcon from "react-icons/lib/fa/edit";
import CloseIcon from "react-icons/lib/fa/close";
import {connect} from "react-redux";
import {
    deleteCommentFromServerThunk,
    editCommentToServerThunk,
    editComponent,
    voteCommentToServerThunk
} from "../actions";
import {POST, CATEGORY, COMMENT, UP_VOTE, DOWN_VOTE} from "../reducers";
import EditComment from "./EditComment";
import {Link} from "react-router-dom";


class CommentBar extends Component{

    openEdit = (id) => {
        this.props.boundEditComponent({"id": id, "isOpen": true});
    };

    render(){
        const {comment} = this.props;
        const {boundVoteComment, boundDeleteComment} = this.props;
        return(
            <div>
                  <table>
                        <tbody>
                        <tr>
                            <td className="Table-data">
                                Author:{comment.author}
                            </td>
                            <td className="Table-data">
                                Current Score:{comment.voteScore}
                            </td>
                            <td className="Table-data">
                                <button onClick={() =>
                                    boundVoteComment(comment.id, UP_VOTE)}><ThumbsUp/></button>
                            </td>
                            <td className="Table-data">
                                <button onClick={() =>
                                    boundVoteComment(comment.id, DOWN_VOTE)}><ThumbsDown/></button>
                            </td>
                            <td className="Table-data">
                               <button onClick={() => this.openEdit(comment.id)}><EditIcon/></button>
                            </td>
                            <td className="Table-data">
                                <button onClick={() => boundDeleteComment(comment.id)}>
                                    <CloseIcon/>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        comment: ownProps.comment
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundDeleteComment: (id) => dispatch(deleteCommentFromServerThunk(id)),
    boundVoteComment: (id, vote) => dispatch(voteCommentToServerThunk(id, vote)),
    boundEditComponent: (option) => dispatch(editComponent(option))
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentBar);