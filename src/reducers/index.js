import {ADD_POST, EDIT_POST, DELETE_POST} from "../actions";
import {ADD_ALL_POST, ADD_ALL_CATEGORY} from "../actions";
import {VOTE_POST} from "../actions";

export const CATEGORY = "category";
export const POST = "post";
export const COMMENT = "comment";
export const UP_VOTE = "upVote";
export const DOWN_VOTE = "downVote";

const initialPostState = {
    category: [],
    post: [],
    comment: []
};

const post = (state = initialPostState, action) => {
    const {id, timestamp, title, body, author, category} = action;
    const {post, posts, categories} = action;
    var currentPosts = [];

    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                [POST]: state[POST].concat([post])
            };
        case EDIT_POST:
            console.log("EDIT_POST", post);
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
            console.log("DELETE_POST", post);
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

        default:
            return state;
    }
};

export default post;