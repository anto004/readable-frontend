import React,{Component} from "react";
import "../App.css";
import {addPost} from "../actions";
import {Link} from "react-router-dom";
import LeftArrow from "react-icons/lib/fa/arrow-circle-left";
import {connect} from "react-redux";
import Modal from "react-modal";


class Posts extends Component {
    state = {
        editPostModalOpen: false
    };

    openEditPostModal = () => {
        this.setState({
            editPostModalOpen: true,
        })
    };

    closeEditPostModal = () => {
        this.setState({
            editPostModalOpen: false,
        })
    };

    render(){
        const id = 123;
        const {posts} = this.props;
        const {editPostModalOpen} = this.state;
        console.log("post modal", editPostModalOpen)
        return (
            <div>
                <div className="container">
                    <h2 className="body-title">Posts</h2>
                    <table className="Table-style">
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="Table-row">
                                <td className="Table-data">{post.title}</td>
                                <td className="Table-data">
                                    <Link to={`/editPost/${id}`}>Edit</Link>
                                </td>
                                <td className="Table-data">
                                    <Link to="/deletePost">Delete</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={() => this.openEditPostModal()}>EditPost Test</button>
                    <Link to="/createPost">New Post</Link>
                </div>
                <Modal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={editPostModalOpen}
                    onRequestClose={this.closeEditPostModal}
                    contentLabel="Modal">
                    <div>
                        <button onClick={() => this.closeEditPostModal()}>
                            <LeftArrow size={30}/>
                        </button>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <input type="text" className="form-title"
                                   placeholder="title here" onChange={(event) => this.updateForm(event, this.TITLE)}/>
                            <input type="text" className="form-textarea" placeholder="Write your post here"
                                   onChange={(event) => this.updateForm(event, this.BODY)}/>
                            <input type="text" className="form-author" placeholder="Your Name"
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
    boundAddPost: (post) => dispatch(addPost(post))
});



export default connect(mapStateToProps, mapDispatchToProps)(Posts);