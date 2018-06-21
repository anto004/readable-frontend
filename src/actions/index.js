import * as PostAPI from "../utils/PostWebAppAPI";

export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_ALL_POST = "ADD_ALL_POST";
export const ADD_ALL_CATEGORY = "ADD_ALL_CATEGORY";
export const VOTE_POST = "VOTE_POST";

/**
 *
 * @param post
 * @returns {{type: string, post: *}}
 */
export const addPost = (post) => ({
    type: ADD_POST,
    post
});

/**
 *
 * @param post
 * @returns {{type: string, post: *}}
 */
export const editPost = (post) => ({
    type: EDIT_POST,
    post
});

export const deletePost = (post) => ({
    type: DELETE_POST,
    post
});

//add all post only if it is the first time (or it will override new post with server posts)
export const addAllPost = (posts) => ({
    type: ADD_ALL_POST,
    posts
});

//same as addAllPost
export const addAllCategory = (categories) => ({
    type: ADD_ALL_CATEGORY,
    categories
});

export const votePost = (post) => ({
    type: VOTE_POST,
    post
});

//Thunk's function action creator
export const getAllPostThunk = () => dispatch => {
    PostAPI
        .getAllPosts()
        .then((posts) => dispatch(addAllPost(posts))) //posts -> an array of post
};

export const getAllCategoryThunk = () => dispatch => {
    PostAPI
        .getAllCategories()
        .then((categories) => dispatch(addAllCategory(categories))) //categories -> an array of category
};

export const addPostToServerThunk = (id, timestamp, title, body, author, category) => dispatch => {
    PostAPI
        .addPost(id, timestamp, title, body, author, category)
        .then((post) => dispatch(addPost(post)))
};

export const editPostToServerThunk = (id, title, body) => dispatch => {
    PostAPI
        .editPost(id, title, body)
        .then((post) => dispatch(editPost(post)))
};

export const deletePostFromServerThunk = (id) => dispatch => {
    PostAPI
        .deletePost(id)
        .then((post) => dispatch(deletePost(post)))
};

export const votePostToServerThunk = (id, vote) => dispatch => {
    PostAPI
        .votePost(id, vote)
        .then((post) => dispatch(votePost(post)))
};
