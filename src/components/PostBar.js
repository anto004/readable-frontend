import React, {Component} from "react";
import "../App.css";
import ThumbsUp from "react-icons/lib/fa/thumbs-o-up";
import ThumbsDown from "react-icons/lib/fa/thumbs-o-down";
import EditIcon from "react-icons/lib/fa/edit";
import CloseIcon from "react-icons/lib/fa/close";
import {connect} from "react-redux";
import {deletePostFromServerThunk, votePostToServerThunk} from "../actions";
import {POST, CATEGORY, COMMENT, UP_VOTE, DOWN_VOTE} from "../reducers";


class PostBar extends Component{

    render(){
        const {post, openEditPostModal} = this.props;
        const {boundVotePost, boundDeletePost} = this.props;
        return(
            <td>
                <table>
                    <tbody>
                    <tr>
                        <td className="Table-data">
                            Author:{post.author}
                        </td>
                        <td className="Table-data">
                            #Comments:{post.commentCount}
                        </td>
                        <td className="Table-data">
                            Current Score:{post.voteScore}
                        </td>
                        <td className="Table-data">
                            <button onClick={() =>
                                boundVotePost(post.id, UP_VOTE)}><ThumbsUp/></button>
                        </td>
                        <td className="Table-data">
                            <button onClick={() =>
                                boundVotePost(post.id, DOWN_VOTE)}><ThumbsDown/></button>
                        </td>
                        <td className="Table-data">
                            <button onClick={() => openEditPostModal(post.id)}><EditIcon/></button>
                        </td>
                        <td className="Table-data">
                            <button onClick={() => boundDeletePost(post.id)}>
                                <CloseIcon/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: ownProps.post,
        openEditPostModal: (id) => ownProps.openEditPostModal(id)
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundDeletePost: (id) => dispatch(deletePostFromServerThunk(id)),
    boundVotePost: (id, vote) => dispatch(votePostToServerThunk(id, vote))
});
export default connect(mapStateToProps, mapDispatchToProps)(PostBar);