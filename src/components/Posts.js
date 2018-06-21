import React,{Component} from "react";
import "../App.css";
import {getAllPostThunk, editPostToServerThunk, deletePostFromServerThunk} from "../actions";
import {Link} from "react-router-dom";
import LeftArrow from "react-icons/lib/fa/arrow-circle-left";
import ThumbsUp from "react-icons/lib/fa/thumbs-o-up";
import ThumbsDown from "react-icons/lib/fa/thumbs-o-down";
import EditIcon from "react-icons/lib/fa/edit";
import CloseIcon from "react-icons/lib/fa/close";
import {connect} from "react-redux";
import Modal from "react-modal";
import PostBar from "./PostBar";

Modal.setAppElement("body");
class Posts extends Component {
    TITLE = "title";
    BODY = "body";
    AUTHOR = "author";

    constructor(props){
        super(props);
        props.boundGetAllPost();
    }

    state = {
        editPostModalOpen: false,
        id: "", //To keep track of the post to edit
        title: "",
        body: "",
        author: ""
    };

    openEditPostModal = (id) => {
        const {posts} = this.props;

        this.setState({
            editPostModalOpen: true,
        });

        //Get the particular post to edit, only if the modal is open
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

        const category = "Hobbies"; //TODO Get category from Category component

        this.props.boundEditPost(this.state.id, this.state.title, this.state.body);

        this.setState({
            editPostModal: false // close modal after finishing editing
        })
    }

    render(){
        const {posts, boundDeletePost} = this.props;
        console.log("posts", posts)
        const {editPostModalOpen} = this.state;

        return (
            <div className="container">
                <div className="container">
                    <h2 className="body-title">Posts</h2>
                    <table className="Table-style">
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="Table-row">
                                <td className="Outer-Table-data">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td colSpan="5">
                                                {/*TODO: Pass post object to Post Detail in url*/}
                                                <Link to={`/postDetail/${post.id}`}>{post.title}</Link>
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
                    <button><Link to="/createPost">New Post</Link></button>
                </div>

                {/*Edit Post Modal*/}
                <Modal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={editPostModalOpen}
                    onRequestClose={this.closeEditPostModal}
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
                            {/*TODO: on submit close modal*/}
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

const mapStateToProps = (state, ownProps) => ({
    posts: state.post
});

const mapDispatchToProps = (dispatch) => ({
    boundEditPost: (id, title, body) => dispatch(editPostToServerThunk(id, title, body)),
    boundDeletePost: (id) => dispatch(deletePostFromServerThunk(id)),
    boundGetAllPost: () => dispatch(getAllPostThunk())
});



export default connect(mapStateToProps, mapDispatchToProps)(Posts);