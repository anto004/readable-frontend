import React, {Component} from "react";
import {addCommentToServerThunk} from "../actions";
import {connect} from "react-redux";

const BODY = "body";
const AUTHOR = "author";
class CreateComment extends Component{
    state = {
        body: "",
        author: ""
    };

    handleChange = (e, formInput) => {
        switch(formInput){
            case BODY:
                this.setState({
                    body: e.target.value
                });
                break;
            case AUTHOR:
                this.setState({
                    author: e.target.value
                });
                break;
        }
    };

    handleSubmit = () => {
        const uuid = require("uuid/v4");
        const id = uuid();
        const timestamp = Date.now();
        const parentId = this.props.parentId;
        this.props.boundAddComment(id, timestamp, this.state.body, this.state.author, parentId);

    };
    render(){
        return (
            <td>
                <h4>New Comment</h4>
                <form onSubmit={() => this.handleSubmit()}>
                    <input type="text"
                           className="comment-body"
                           placeholder="Write comment"
                           onChange={(event) => this.handleChange(event, BODY)}/>
                    <input type="text"
                           className="comment-author"
                           placeholder="Your name"
                           onChange={(event) => this.handleChange(event, AUTHOR)}/>
                    <button type="submit" disabled={!this.state.body || !this.state.author}>Submit</button>
                </form>
            </td>
        )
    }
}

const mapStateToProps = (state, myProps) => {
    return {
        parentId: myProps.parentId //Send parentId as props to CreateComponent
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundAddComment: (id, timestamp, body, author, parentId) => dispatch(
        addCommentToServerThunk(id, timestamp, body, author, parentId))
});

export default connect(mapStateToProps, mapDispatchToProps) (CreateComment)