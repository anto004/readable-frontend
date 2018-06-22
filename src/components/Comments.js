import React, {Component} from "react";
import {connect} from "react-redux";
import {addAllPost} from "../actions";

class Comments extends Component{
    render(){
        return(
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.post
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundOrderAddAllPost: (post) => dispatch(addAllPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);