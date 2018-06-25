import React, {Component} from "react";
import "../App.css";
import serializeForm from "form-serialize";
import {addPostToServerThunk, getAllCategoryThunk} from "../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {CATEGORY, POST} from "../reducers";

class CreatePost extends Component{
    TITLE = "title";
    BODY = "body";
    AUTHOR = "author";

    constructor(props){
        super(props);
        props.boundGetAllCategory();
    }

    state = {
        title: "",
        body: "",
        author: "",
        value: "",
        redirect: false
    };

    handleSubmit(e) {
        e.preventDefault();

        // const formValues = serializeForm(e.target, {hash: true});
        const uuid = require("uuid/v4");
        const id = uuid();
        const timestamp = Date.now();
        const category = "Hobbies"; //TODO Get category from Category component

        this.props.boundAddPost(id, timestamp, this.state.title, this.state.body, this.state.author, category);

        this.setState({
            redirect: true
        })
    }

    updateForm = (e, formType) => {
        switch(formType){
            case this.TITLE:
                this.setState({title: e.target.value});
                break;
            case this.BODY:
                this.setState({body: e.target.value});
                break;
            case this.AUTHOR:
                this.setState({author: e.target.value});
                break;
            default:
        }
    };

    selectCategory = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    render(){
        const {categories} = this.props;
        return (
            <div>
                {this.state.redirect && <Redirect to="/posts"/>}
                <div className="form-container">
                    <h2>New Post</h2>
                    <h4>Choose Category</h4>

                    <select className="select-category"
                            value={this.state.value} onChange={(event) => this.selectCategory(event)}>
                        {categories.map(category => (
                            <option value={category.name}>{category.name}</option>
                        ))}
                    </select>

                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input type="text" className="form-title"
                               placeholder="title here" onChange={(event) => this.updateForm(event, this.TITLE)}/>
                        <textarea className="form-textarea" placeholder="Write your post here"
                                onChange={(event) => this.updateForm(event, this.BODY)}
                                wrap="hard"/>
                        <input type="text" className="form-author" placeholder="Your Name"
                                onChange={(event) => this.updateForm(event, this.AUTHOR)}/>
                        <button type="submit"
                                disabled={!this.state.title || !this.state.body || !this.state.author}>Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        categories: state[CATEGORY],
        posts: state[POST]
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundAddPost: (id, timestamp, title, body, author, category) =>
        dispatch(addPostToServerThunk(id, timestamp, title, body, author, category)),
    boundGetAllCategory: () => dispatch(getAllCategoryThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);