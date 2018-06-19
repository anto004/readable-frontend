import "../App.css";
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Category extends Component{
    render() {
        return (
            <div>
                <div className="container">
                    <h2 className="body-title">Categories</h2>
                    <table className="Table-style">
                        <tbody>
                            <tr className="Table-row">
                                <td className="Table-data">Category one</td>
                            </tr>
                            <tr className="Table-row">
                                <td className="Table-data">Category two</td>
                            </tr>
                            <tr className="Table-row">
                                <td className="Table-data"><Link to="/posts" onClick={() => {}}>Posts</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}
export default Category;