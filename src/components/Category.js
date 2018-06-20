import "../App.css";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAllCategoryThunk} from "../actions";

class Category extends Component{
    constructor(props){
        super(props);
        props.boundGetAllCategory();
    }
    render() {
        const {categories} = this.props;
        return (
            <div>
                <div className="container">
                    <h2 className="body-title">Categories</h2>
                    <table className="Table-style">
                        <tbody>
                        {categories.map((category) => (
                            <tr key={category.name} className="Table-row">
                                <td className="Table-data">
                                    <Link to="/posts" onClick={() => {}}>{category.name}</Link>
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