import {ADD_POST, EDIT_POST, DELETE_POST} from "../actions";
import {ADD_ALL_POST, ADD_ALL_CATEGORY} from "../actions";

const CATEGORY = "category";
const POST = "post";
const COMMENT = "comment";

const initialPostState = {
    //Testing Values
    category: ["Udacity", "Hobbies"],
    post: [
        {
            "id":"8xf0y6ziyjabvozdd253nd",
            "timestamp":1467166872634,
            "title":"Udacity is the best place to learn React",
            "body":"Everyone says so after all.",
            "author":"thingtwo",
            "category":"react",
            "voteScore":6,
            "deleted":false,
            "commentCount":0
        }
    ],
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
        default:
            return state;
    }
};

export default post;