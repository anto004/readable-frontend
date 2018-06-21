import React, {Component} from "react";
import "../App.css";
import ThumbsUp from "react-icons/lib/fa/thumbs-o-up";
import ThumbsDown from "react-icons/lib/fa/thumbs-o-down";
import EditIcon from "react-icons/lib/fa/edit";
import CloseIcon from "react-icons/lib/fa/close";


class PostDetail extends Component{
    post = {
        "id":"8xf0y6ziyjabvozdd253nd",
        "timestamp":1467166872634,
        "title":"Udacity is the best place to learn React and also the best place to learn android.",
        "body":"Everyone says so after all. Everyone says so after all. Everyone says so after all. Everyone says so after all.",
        "author":"thingtwo",
        "category":"react",
        "voteScore":6,
        "deleted":false,
        "commentCount":0
    };

    render(){
        return(
            <div className="container">
                <h2 className="body-title">Post Details</h2>
                <div className="post-detail-title-box">
                    {this.post.title}
                </div>
                <div className="post-detail-body-box">
                    {this.post.body}
                </div>
                <div className="post-detail-author-box">
                    {this.post.author}
                </div>
                <table className="post-detail-table-style">
                    <tbody>
                    <tr>
                        <td className="Table-data">
                            #Comments:{this.post.commentCount}
                        </td>
                        <td className="Table-data">
                            Current Score:{this.post.voteScore}
                        </td>
                        <td className="Table-data">
                            <ThumbsUp/>
                        </td>
                        <td className="Table-data">
                            <ThumbsDown/>
                        </td>
                        <td className="Table-data">
                            <button onClick={() => this.openEditPostModal(this.post.id)}><EditIcon/></button>
                        </td>
                        <td className="Table-data">
                                <CloseIcon/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default PostDetail;