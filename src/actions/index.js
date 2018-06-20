import * as PostAPI from "../utils/PostWebAppAPI";


export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_ALL_POST = "ADD_ALL_POST";
export const ADD_ALL_CATEGORY = "ADD_ALL_CATEGORY";
/**
 *
 * @param id
 * @param timestamp
 * @param title
 * @param body
 * @param author
 * @param category
 * @returns {{type: string, id: *, timestamp: *, title: *, body: *, author: *, category: *}}
 */
export const addPost = ({id, timestamp, title, body, author, category}) => ({
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
});

/**
 *
 * @param id
 * @param timestamp
 * @param title
 * @param body
 * @param author
 * @param category
 * @returns {{type: string, id: *, timestamp: *, title: *, body: *, author: *, category: *}}
 */
export const editPost = ({id, timestamp, title, body, author, category}) => ({
    type: EDIT_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
});

export const deletePost = ({id}) => ({
    type: DELETE_POST,
    id: id
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
