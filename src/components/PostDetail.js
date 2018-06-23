import React, {Component} from "react";
import "../App.css";
import Comments from "./Comments";
import PostBar from "./PostBar";


class PostDetail extends Component{
    render(){
        //Getting a post object from location
        const post = this.props.location.state;
        return(
            <div className="container">
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
                <Comments/>
            </div>
        );
    }
}
export default PostDetail;