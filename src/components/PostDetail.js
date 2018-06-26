import React, {Component} from "react";
import "../App.css";
import PostBar from "./PostBar";
import {POST} from "../reducers";
import {connect} from "react-redux";
import { getPostFromServerThunk} from "../actions";
import Comments from "./Comments";
import FourOFourPage from "./FourOFourPage";
import {Link} from "react-router-dom";


class PostDetail extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.boundGetPost(this.props.postId); //when page is refreshed posts in redux state is lost, add post to state
    }

    render(){
        //Getting a post object from location
        // const post = this.props.location.state;
        const {post} = this.props;
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
                                    <PostBar post={post}/>
                                </tr>
                                </tbody>
                            </table>

                            <Comments postId={post.id}
                                      categoryName={post.category}/>
                        </div>

                        : <FourOFourPage/> //Post is not found, show Error 404
                    }
                </div>
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
    boundGetPost: (id) => dispatch(getPostFromServerThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);