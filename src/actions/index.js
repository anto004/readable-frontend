import * as PostAPI from "../utils/PostWebAppAPI";

export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_ALL_POST = "ADD_ALL_POST";
export const ADD_ALL_CATEGORY = "ADD_ALL_CATEGORY";
export const VOTE_POST = "VOTE_POST";
//Comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_ALL_COMMENT = "ADD_ALL_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export const EDIT_COMPONENT = "EDIT_COMPONENT";

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
//or when ordering post
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

//Comments action creator
export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

export const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
});

export const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
});

export const addAllComment = (comments) => ({
    type: ADD_ALL_COMMENT,
    comments
});

export const voteComment = (comment) => ({
    type: VOTE_COMMENT,
    comment
});

export const editComponent = (option) => ({
    type: EDIT_COMPONENT,
    option
});

//Thunk's function action creator
export const getAllPostThunk = () => dispatch => {
    PostAPI
        .getAllPosts()
        .then((posts) => dispatch(addAllPost(posts))) //posts -> an array of post
};

export const getPostFromServerThunk = (id) => dispatch => {
    PostAPI
        .getPost(id)
        .then((post) => dispatch(addPost(post))) //posts -> an array of post
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

//Comments Thunk's action creator
export const addAllPostCommentsThunk = (postId) => dispatch => {
    PostAPI
        .getPostComments(postId)
        .then((comments) => dispatch(addAllComment(comments))) //posts -> an array of post
};

export const addCommentToServerThunk = (id, timestamp, body, author, parentId) => dispatch => {
    PostAPI
        .addPostComment(id, timestamp, body, author, parentId)
        .then((comment) => dispatch(addComment(comment)))
};

//Note check for parentDeleted
export const editCommentToServerThunk = (id, timestamp, body) => dispatch => {
    PostAPI
        .editComment(id, timestamp, body)
        .then((comment) => {
            console.log("editCommentToServerThunk", comment)
            return dispatch(editComment(comment))
        })
};

export const deleteCommentFromServerThunk = (id) => dispatch => {
    PostAPI
        .deleteComment(id)
        .then((comment) => dispatch(deleteComment(comment)))
};

export const voteCommentToServerThunk = (id, vote) => dispatch => {
    PostAPI
        .voteComment(id, vote)
        .then((comment) => dispatch(voteComment(comment)))
};
