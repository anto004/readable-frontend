import "../App.css";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAllCategoryThunk} from "../actions";
import * as PostAPI from "../utils/PostWebAppAPI";

class Category extends Component{
    constructor(props){
        super(props);
        props.boundGetAllCategory();
    }

    fetchPosts = (category) => {
        var query = require("querystringify");
        const queryString = query.stringify({category: category.name}, true);
        //console.log("queryString", queryString);
        query.stringify({category: category.name}, true);
    };

    //TODO: pass query parameter category to url
    render() {
        const {categories} = this.props;
        var query = require("querystringify");
        return (
            <div>
                <div className="container">
                    <h2 className="body-title">Categories</h2>
                    <table className="Table-style">
                        <tbody>
                        {categories.map((category) => (
                            <tr key={category.name} className="Table-row">
                                <td className="Table-data">
                                    <Link to={{
                                        pathname: `/:category=${category.name}`,
                                        search: `?category=${category.name}`
                                    }} onClick={() => this.fetchPosts(category)}>
                                        {category.name}</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    categories: state.category
});

const mapDispatchToProps = (dispatch) => ({
    boundGetAllCategory: () => dispatch(getAllCategoryThunk())
});

export default connect(mapStateToProps, mapDispatchToProps) (Category)