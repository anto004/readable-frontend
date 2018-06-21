import React, {Component} from "react";
import "../App.css";
import ThumbsUp from "react-icons/lib/fa/thumbs-o-up";
import ThumbsDown from "react-icons/lib/fa/thumbs-o-down";
import EditIcon from "react-icons/lib/fa/edit";
import CloseIcon from "react-icons/lib/fa/close";
import {connect} from "react-redux";
import {addAllPost} from "../actions";
import {POST, CATEGORY, COMMENT, UP_VOTE, DOWN_VOTE} from "../reducers";


class OrderByPosts extends Component{

    state = {
        value: "date"
    };

    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        });

        const {posts} = this.props;
        const sortBy = require("sort-by");
        // console.log("before", posts);
        posts.sort(sortBy("timestamp"));
        // console.log("after", posts);
        switch(e.target.value){
            case "date":
                posts.sort(sortBy("title"));
                break;
            case "voteScore":
                posts.sort(sortBy("voteScore"));
                break;

        }

        this.props.boundOrderAddAllPost(posts);
    }

    render(){
        return(
            <div>
                <select value={this.state.value} onChange={(event) => this.handleChange(event)}>
                    <option value="date">Date</option>
                    <option value="voteScore">Vote</option>
                </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderByPosts);