import "../App.css";
import React, {Component} from "react";
import {editPost} from "../actions";
import {connect} from "react-redux";

class EditPost extends Component{

    // render() {
    //     console.log("EditPost props : ",this.props.match);
    //     console.log("id:", this.props.match.params.id);
    //     console.log("name:", this.props.location);
    //     return (
    //         <div>
    //             <div className="container">
    //                 <h2 className="body-title">Edit Post</h2>
    //             </div>
    //         </div>
    //     )
    // }
}

const mapStateToProps = (state, myProps) => ({
    posts: state.post
});

const mapDispatchToProps = (dispatch) => ({
    boundEditPost: (post) => dispatch(editPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps) (EditPost)