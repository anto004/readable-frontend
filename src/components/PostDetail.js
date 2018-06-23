import React, {Component} from "react";
import "../App.css";
import Comments from "./Comments";
import PostBar from "./PostBar";
import {COMMENT, EDIT_COMPONENT_STATE, POST} from "../reducers";
import {connect} from "react-redux";
import {addAllPostCommentsThunk, editCommentToServerThunk} from "../actions";


class PostDetail extends Component{
    render(){
        //Getting a post object from location
        // const post = this.props.location.state;
        const {post} = this.props;

        return(
            <div className="container">
                <h2 className="body-title">Post Details</h2>
                <div className="post-detail-title-box">
                    {post.title}
                </div>
                <div className="post-detail-body-box">
                    {post.body}
                </div>

                <table className="post-detail-table-style">
                    <tbody>
                    <tr>
                        {/*Calling Post UI component*/}
                        <PostBar post={post}/>
                    </tr>
                    </tbody>
                </table>
                <Comments postId={post.id}/>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.match.params.id;
    return {
        post: state[POST].filter(post => post.id === postId)[0]
    }
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);