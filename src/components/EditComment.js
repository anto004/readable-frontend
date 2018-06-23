import React, {Component} from "react";

class EditComment extends Component{

    constructor(props){
        super(props);
        this.state.body = props.comment.body
    }
    state = {
        body: ""
    };

    handleSubmit = (e, id) => {
        e.preventDefault();

        const timestamp = Date.now();
        this.props.boundEditComment(id, timestamp, this.state.body);
        this.props.boundEditComponent({"id": id, "isOpen": false}); //close Edit when finished
    };

    handleChange = (e) => {
        this.setState({
            body: e.target.value
        })
    };
    render(){
        const {comment} = this.props;
        return(
            <form>
                <input type="text" value={this.state.body} onChange={(event) => this.handleChange(event)}/>
                <input type="text" defaultValue={comment.author}/>
                <button type="submit" onSubmit={(event) => this.handleSubmit(event, comment.id)}>Submit</button>
            </form>
        );
    }
}

export default EditComment;