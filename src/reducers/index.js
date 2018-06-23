import {ADD_POST, EDIT_POST, DELETE_POST} from "../actions";
import {ADD_ALL_POST, ADD_ALL_CATEGORY} from "../actions";
import {VOTE_POST} from "../actions";
import {ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from "../actions";
import {ADD_ALL_COMMENT, VOTE_COMMENT} from "../actions";
import {EDIT_COMPONENT} from "../actions";

export const CATEGORY = "category";
export const POST = "post";
export const COMMENT = "comment";
export const UP_VOTE = "upVote";
export const DOWN_VOTE = "downVote";
export const EDIT_COMPONENT_STATE = "edit";

const initialPostState = {
    category: [],
    post: [],
    comment: [],
    edit: {}
};

const post = (state = initialPostState, action) => {
    const {post, posts, categories} = action;
    const {comment, comments} = action;
    const {option} = action;

    var currentPosts = [];
    var currentComments = [];
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                [POST]: state[POST].concat([post])
            };
        case EDIT_POST:
            currentPosts = state[POST];
            state[POST].map((currentPost, index) => {
                if(currentPost.id === post.id){
                    currentPosts.splice(index, 1, post);
                }
            });
            return {
                ...state,
                [POST]: currentPosts
            };

        case DELETE_POST:
            return{
                ...state,
                [POST]: state[POST].filter((currentPost) => currentPost.id !== post.id)
            };

        case ADD_ALL_POST:
            return{
                ...state,
                [POST]: posts
            };
        case ADD_ALL_CATEGORY:
            return {
                ...state,
                [CATEGORY]: categories
            };
        case VOTE_POST:
            return {
                ...state,
                [POST]: state[POST].map((p) => {
                    if(p.id === post.id){
                        p.voteScore = post.voteScore;
                    }
                    return p;
                })
            };

        //Comments
        case ADD_COMMENT:
            return {
                ...state,
                [COMMENT]: state[COMMENT].concat([comment])
            };

        case EDIT_COMMENT:
            currentComments = state[COMMENT];
            state[COMMENT].map((currentComment, index) => {
                if(currentComment.id === comment.id){
                    currentComments.splice(index, 1, comment);
                }
            });
            return {
                ...state,
                [COMMENT]: currentComments
            };

        case DELETE_COMMENT:
            return{
                ...state,
                [COMMENT]: state[COMMENT].filter((currentComment) => currentComment.id !== comment.id)
            };

        case ADD_ALL_COMMENT:
            return{
                ...state,
                [COMMENT]: comments
            };

        case VOTE_COMMENT:
            return {
                ...state,
                [COMMENT]: state[COMMENT].map((c) => {
                    if(c.id === comment.id){
                        c.voteScore = comment.voteScore;
                    }
                    return c;
                })
            };

        case EDIT_COMPONENT:
            return {
                ...state,
                [EDIT_COMPONENT_STATE]: option
            };

        default:
            return state;
    }
};

export default post;