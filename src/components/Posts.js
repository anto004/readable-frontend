import React,{Component} from "react";
import "../App.css";
import {addPost} from "../actions";
import {Link} from "react-router-dom";


class Posts extends Component {
    render(){
        const id = 123;
        const fullName = "Antonio Bang";
        return (
            <div>
                <div className="container">
                    <h2 className="body-title">Posts</h2>
                    <table className="Table-style">
                        <tbody>
                        <tr className="Table-row">
                            <td className="Table-data">Post one</td>
                            <td className="Table-data">
                                <Link to={`/editPost/${id}`}>Edit</Link>
                            </td>
                            <td className="Table-data">
                                <Link to="/deletePost">Delete</Link>
                            </td>

                        </tr>
                        <tr className="Table-row">
                            <td className="Table-data">Post two</td>
                            <td className="Table-data">
                                <Link to="/editPost">Edit</Link>
                            </td>
                            <td className="Table-data">
                                <Link to="/deletePost">Delete</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Link to="/createPost">New Post</Link>
                </div>
            </div>
        )
    }
}
export default Posts;