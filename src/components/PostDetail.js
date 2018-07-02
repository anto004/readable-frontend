import React, {Component} from "react";
import "../App.css";
import PostBar from "./PostBar";
import {POST} from "../reducers";
import {connect} from "react-redux";
import {editPostToServerThunk, getPostFromServerThunk} from "../actions";
import Comments from "./Comments";
import FourOFourPage from "./FourOFourPage";
import {Link} from "react-router-dom";
import LeftArrow from "react-icons/lib/fa/arrow-circle-left";
import Modal from "react-modal";

const TITLE = "title";
const BODY = "body";
const AUTHOR = "author";
class PostDetail extends Component{

    state = {
        editPostModalOpen: false,
        id: "",
        title: "",
        body: "",
        author: ""
    };

    componentDidMount(){
        this.props.boundGetPost(this.props.postId); //when page is refreshed posts in redux state is lost, add post to state
    }

    openEditPostModal = () => {
        const {post} = this.props;
        this.setState({
            editPostModalOpen: true,
        });

        this.setState({
            id: post.id
        });
        this.setState({
            title: post.title,
        });
        this.setState({
            body: post.body,
        });
        this.setState({
            author: post.author
        });
    };

    closeEditPostModal = () => {
        this.setState({
            editPostModalOpen: false,
        })
    };

    handleSubmit(e) {
        e.preventDefault();

        this.props.boundEditPost(this.state.id, this.state.title, this.state.body);

        this.closeEditPostModal();
    }

    updateForm = (e, formType) => {
        switch(formType){
            case TITLE:
                this.setState({title: e.target.value});
                break;
            case BODY:
                this.setState({body: e.target.value});
                break;
            case AUTHOR:
                this.setState({author: e.target.value});
                break;
            default:
        }
    };

    render(){
        // Getting a post object from location
        // const post = this.props.location.state;
        const {post} = this.props;
        const {editPostModalOpen} = this.state;
        return(
            <div>
                <Link to={"/"}>Main Page</Link>
                <div className="container">
                    {post !== undefined
                        ? <div>
                            <button onClick={() => this.props.history.goBack()}>Go Back</button>
                            <h2 className="body-title">Post Details</h2>
                            <div className="post-detail-title-box">
                                {post.title}
                            </div>
                            <div className="post-detail-body-box">
                                {post.body}
                            </div>

                            <table className="post-detail-table-style">
                                <tbody>
                                <tr>
                                    {/*Calling Post UI component*/}
                                    <PostBar post={post}
                                             openEditPostModal={(id) => this.openEditPostModal(id)}/>
                                </tr>
                                </tbody>
                            </table>

                            <Comments postId={post.id}
                                      categoryName={post.category}/>
                        </div>

                        : <FourOFourPage/> //Post is not found, show Error 404
                    }
                </div>

                {/*Edit PostDetail Modal*/}
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
                                   onChange={(event) => this.updateForm(event, TITLE)}/>
                            <textarea wrap="hard" className="form-textarea"
                                      placeholder="Write your post here"
                                      value={this.state.body}
                                      onChange={(event) => this.updateForm(event, BODY)}/>
                            <input type="text" className="form-author"
                                   placeholder="Your Name"
                                   value={this.state.author}
                                   onChange={(event) => this.updateForm(event, AUTHOR)}/>
                            <button type="submit"
                                    disabled={!this.state.title || !this.state.body || !this.state.author}>Submit
                            </button>
                        </form>

                    </div>
                </Modal>
            </div>
        );

    }
}
const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.match.params.id;
    return {
        postId: postId,
        post: state[POST].filter(post => post.id === postId)[0]
    }
};

const mapDispatchToProps = (dispatch) => ({
    boundGetPost: (id) => dispatch(getPostFromServerThunk(id)),
    boundEditPost: (id, title, body) => dispatch(editPostToServerThunk(id, title, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);