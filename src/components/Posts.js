import React,{Component} from "react";
import "../App.css";
import {getAllPostThunk, editPostToServerThunk, deletePostFromServerThunk, addAllPostCommentsThunk} from "../actions";
import {Link} from "react-router-dom";
import LeftArrow from "react-icons/lib/fa/arrow-circle-left";
import {connect} from "react-redux";
import Modal from "react-modal";
import PostBar from "./PostBar";
import AddCircle from "react-icons/lib/io/android-add-circle";
import {POST, CATEGORY, COMMENT} from "../reducers";
import Category from "./Category";

Modal.setAppElement("body");
class Posts extends Component {
    TITLE = "title";
    BODY = "body";
    AUTHOR = "author";
    ORDER_DATE = "date";
    ORDER_VOTE= "vote";

    constructor(props){
        super(props);
        props.boundGetAllPost();
    }

    state = {
        editPostModalOpen: false,
        value: this.ORDER_DATE, //default sort by date
        id: "",
        title: "",
        body: "",
        author: ""
    };

    openEditPostModal = (id) => {
        const {posts} = this.props;
        this.setState({
            editPostModalOpen: true,
        });

        //Get the particular post to edit from redux state, only if the modal is open
        for(var i = 0; i < posts.length; i++){
            if(posts[i].id === id){
                this.setState({
                    id: id
                });
                this.setState({
                    title: posts[i].title,
                });
                this.setState({
                    body: posts[i].body,
                });
                this.setState({
                    author: posts[i].author
                });
            }
        }
    };

    closeEditPostModal = () => {
        this.setState({
            editPostModalOpen: false,
        })
    };

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

    handleSubmit(e) {
        e.preventDefault();

        this.props.boundEditPost(this.state.id, this.state.title, this.state.body);

        this.closeEditPostModal();
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }

    render(){
        const sortBy = require("sort-by");
        const {posts, category} = this.props;
        const {editPostModalOpen} = this.state;

        switch(this.state.value){
            case this.ORDER_DATE:
                posts.sort(sortBy("timestamp"));
                break;
            case this.ORDER_VOTE:
                posts.sort(sortBy("voteScore"));
                break;
            default:
        }

        return (
            <div className="container">
                <h2 className="body-title">Posts</h2>
                <Link to={"/"}>Main Page</Link>
                <Category/>

                <Link to={`/createPost/`}><AddCircle size={30}/>Write New Post</Link>
                <div>
                    <select className="order-by-select"
                            value={this.state.value} onChange={(event) => this.handleChange(event)}>
                        <option value={this.ORDER_DATE}>Date</option>
                        <option value={this.ORDER_VOTE}>Vote</option>
                    </select>
                </div>

                <table className="Table-style">
                    <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="Table-row">
                            <td className="Outer-Table-data">
                                <table>
                                    <tbody>

                                    <tr>
                                        <td colSpan="5">
                                            <Link to={{
                                                pathname: `/${post.category}/${post.id}`,
                                                state: post
                                            }}>{post.title}</Link>
                                        </td>
                                    </tr>

                                    <tr>
                                        {/*Component for post UI*/}
                                        <PostBar
                                            post={post}
                                            openEditPostModal={(id) => this.openEditPostModal(id)}/>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/*Edit Post Modal*/}
                <Modal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={editPostModalOpen}
                    onRequestClose={() => this.closeEditPostModal()}
                    contentLabel="Modal">
                    <div>

                        <button onClick={() => this.closeEditPostModal()}>
                            <LeftArrow size={28}/>
                        </button>

                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <input type="text" className="form-title"
                                   placeholder="title here"
                                   value={this.state.title}
                                   onChange={(event) => this.updateForm(event, this.TITLE)}/>
                            <textarea wrap="hard" className="form-textarea"
                                      placeholder="Write your post here"
                                      value={this.state.body}
                                      onChange={(event) => this.updateForm(event, this.BODY)}/>
                            <input type="text" className="form-author"
                                   placeholder="Your Name"
                                   value={this.state.author}
                                   onChange={(event) => this.updateForm(event, this.AUTHOR)}/>
                            <button type="submit"
                                    disabled={!this.state.title || !this.state.body || !this.state.author}>Submit
                            </button>
                        </form>

                    </div>
                </Modal>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //Parsing URL
   //If category is provided at url, parse url and display posts belonging to that category else url is at root show all posts
    var category = "";
    if(ownProps.location !== undefined){
        const urlSearchParams = new URLSearchParams(ownProps.location.search);
        category = urlSearchParams.get("category");

    }
    return {
        category: category,
        posts: category ? state[POST].filter((post) => post.category === category && !post.delete)
            :state[POST]

    }
};

const mapDispatchToProps = (dispatch) => ({
    boundEditPost: (id, title, body) => dispatch(editPostToServerThunk(id, title, body)),
    boundDeletePost: (id) => dispatch(deletePostFromServerThunk(id)),
    boundGetAllPost: () => dispatch(getAllPostThunk())
});



export default connect(mapStateToProps, mapDispatchToProps)(Posts);