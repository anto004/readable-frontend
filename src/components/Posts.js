import React,{Component} from "react";
import "../App.css";
import {addPost, editPost, deletePost, getAllPostThunk} from "../actions";
import {Link} from "react-router-dom";
import LeftArrow from "react-icons/lib/fa/arrow-circle-left";
import {connect} from "react-redux";
import Modal from "react-modal";

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

        const timestamp = Date.now();
        const category = "Hobbies"; //TODO Get category from Category component

        this.props.boundEditPost({
            "id": this.state.id,
            "timestamp": timestamp,
            "title": this.state.title,
            "body": this.state.body,
            "author": this.state.author,
            "category": category
        });

        this.setState({
            editPostModal: false // close modal after finishing editing
        })
    }

    render(){
        const {posts, boundDeletePost} = this.props;
        const {editPostModalOpen} = this.state;

        return (
            <div className="container">
                <div className="container">
                    <h2 className="body-title">Posts</h2>
                    <table className="Table-style">
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="Table-row">
                                <td className="Table-data">{post.title}</td>
                                <td className="Table-data">
                                    <button onClick={() => this.openEditPostModal(post.id)}>Edit</button>
                                </td>
                                <td className="Table-data">
                                    <button onClick={() =>
                                        boundDeletePost({"id": post.id})}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Link to="/createPost">New Post</Link>
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
                            <input type="text" className="form-textarea"
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

const mapStateToProps = (state, ownProps) => ({
    posts: state.post
});

const mapDispatchToProps = (dispatch) => ({
    boundAddPost: (post) => dispatch(addPost(post)),
    boundEditPost: (post) => dispatch(editPost(post)),
    boundDeletePost: (id) => dispatch(deletePost(id)),
    boundGetAllPost: () => dispatch(getAllPostThunk())
});



export default connect(mapStateToProps, mapDispatchToProps)(Posts);