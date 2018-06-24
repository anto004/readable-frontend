import React, {Component} from "react";
import {connect} from "react-redux";
import {editCommentToServerThunk, editPost} from "../actions";
import {COMMENT, POST} from "../reducers";
import {Redirect} from "react-router-dom";

class EditComment extends Component{

    constructor(props){
        super(props);
        this.state.body = props.comment.body;
    }
    state = {
        body: ""
    };

    handleSubmit = (e, id) => {
        e.preventDefault();

        const timestamp = Date.now();
        this.props.boundEditComment(id, timestamp, this.state.body);
        this.props.boundEditComponent({"id": id, "isOpen": false}); //close Edit when finished

        // this.setState({
        //     redirect: true
        // });
        //this.props.history.push(this.props.location.pathname, { some: "state" })
    };

    handleChange = (e) => {
        this.setState({
            body: e.target.value
        })
    };

    render(){
        const {comment} = this.props;
       // const redirectPath = `/${this.props.match.params.category}/${this.props.match.params.post}`;
        console.log("Edit Component comment", comment)
        return(
            <div>
            <form onSubmit={(event) => this.handleSubmit(event, comment.id)}>
                {/*{(this.state.redirect && <Redirect to={redirectPath}/>)}*/}
                <h1>Edit Comment</h1>
                <input type="text" className="comment-body"
                       value={this.state.body}
                       onChange={(event) => this.handleChange(event)}/>
                <input type="text" defaultValue={comment.author}/>
                <button type="submit">Submit</button>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state, myProps) => {
    return {
        comment: myProps.comment
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundEditComment: (id, timestamp, body) => dispatch(editCommentToServerThunk(id, timestamp, body)),
});

export default connect(mapStateToProps, mapDispatchToProps) (EditComment)