import React,{Component} from "react";
import "../App.css";

class Posts extends Component {
    render(){
        return (
            <div>
                <div className="container">
                    <h2 className="body-title">Posts</h2>
                    <table className="Table-style">
                        <tbody>
                        <tr className="Table-row">
                            <td className="Table-data">Post one</td>
                        </tr>
                        <tr className="Table-row">
                            <td className="Table-data">Post two</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Posts;