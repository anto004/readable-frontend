
export const url = process.env.REACT_APP_READABLE_URL || "http://localhost:3001";
let token = "anto004";
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};


/**
 * GET /categories
     USAGE:
     Get all of the categories available for the app. List is found in categories.js.
     Feel free to extend this list as you desire.
 * @returns {Promise<any>}
 */
export const getAllCategories = () =>
    fetch(`${url}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories);

/**
 * GET /:category/posts
     USAGE:
     Get all of the posts for a particular category
 * @returns {Promise<any>}
 */
//TODO: Testing required
export const getCategoryPosts = () =>
    fetch(`${url}/:category/posts`, {headers})
        .then(res => res.json())
        .then(posts => posts);

/**
 * GET /posts
     USAGE:
     Get all of the posts. Useful for the main page when no category is selected.
 * @returns {Promise<any>}
 */
export const getAllPosts = () =>
    fetch(`${url}/posts`, {headers})
        .then(res => res.json())
        .then(data => data);

/**
 * // POST /posts
 // USAGE:
 //     Add a new post
 * @param id
 * @param timestamp
 * @param title
 * @param body
 * @param author
 * @param category
 * @returns {Promise<any>}
 */
export const addPost = (id, timestamp, title, body, author, category) =>
    fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "id":id,
                "timestamp": timestamp,
                "title": title,
                "body": body,
                "author": author,
                "category": category
            }
           )
    })
        .then(res => res.json())
        .then(data => data);

/**
 * GET /posts/:id
     USAGE:
     Get the details of a single post
 * @param id
 * @returns {Promise<any>}
 */
export const getPost = (id) =>
    // url.searchParams.append("id", id);
    fetch(`${url}/posts/${id}`, {headers})
        .then(res => res.json())
        .then(data => data);

/**
 * POST /posts/:id
 USAGE:
 Used for voting on a post
 PARAMS:
 option - String: Either "upVote" or "downVote"
 * @param id
 * @param vote
 * @returns {Promise<any>}
 */
export const votePost = (id, vote) =>
    fetch(`${url}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "option": vote
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

/**
 * PUT /posts/:id
 USAGE:
 Edit the details of an existing post
 * @param id
 * @param title
 * @param body
 * @returns {Promise<any>}
 */
export const editPost = (id, title, body) =>
    fetch(`${url}/posts/${id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "title": title,
                "body": body
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

/**
 * DELETE /posts/:id
 USAGE:
 Sets the deleted flag for a post to 'true'.
 Sets the parentDeleted flag for all child comments to 'true'.
 * @param id
 * @returns {Promise<any>}
 */
export const deletePost = (id) =>
    fetch(`${url}/posts/${id}`, {
        method: "DELETE",
        headers: {
            ...headers,
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => data);

/**
 * // GET /posts/:id/comments
 // USAGE:
 //     Get all the comments for a single post
 // Note: check for parentDeleted
 * @param postId
 * @returns {Promise<any>}
 */
export const getPostComments = (postId) =>
    fetch(`${url}/posts/${postId}/comments`, {headers})
        .then(res => res.json())
        .then(data => data);

/**
 * POST /comments
 USAGE:
 Add a comment to a post
 PARAMS:
 id: Any unique ID. As with posts, UUID is probably the best here.
 timestamp: timestamp. Get this however you want.
 body: String
 author: String
 parentId: Should match a post id in the database.
 * @param id
 * @param timestamp
 * @param body
 * @param author
 * @param parentId
 * @returns {Promise<any>}
 */
export const addPostComment = (id, timestamp, body, author, parentId) =>
    fetch(`${url}/comments`,{
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "id": id,
                "parentId": parentId,
                "timestamp": timestamp,
                "body": body,
                "author": author
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

/**
 * GET /comments/:id
 USAGE:
 Get the details for a single comment
 * @param id
 * @returns {Promise<any>}
 */
//Note: check for parentDeleted
export const getComment = (id) =>
    fetch(`${url}/comments/${id}`, {headers})
        .then(res => res.json())
        .then(data => data);

/**
 * POST /comments/:id
 USAGE:
 Used for voting on a comment.
 PARAMS:
 option - String: Either "upVote" or "downVote"
 * @param id
 * @param option
 * @returns {Promise<any>}
 */
//Note: check for parentDeleted
export const voteComment = (id, option) =>
    fetch(`${url}/comments/${id}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "option": option
            }
        )
    })
        .then(res => res.json())
        .then(data => data);


/**
 * PUT /comments/:id
 USAGE:
 Edit the details of an existing comment
 PARAMS:
 timestamp: timestamp. Get this however you want.
 body: String
 * @param id
 * @param timestamp
 * @param body
 * @returns {Promise<any>}
 */
//Note: check for parentDeleted
export const editComment = (id, timestamp, body) =>
    fetch(`${url}/comments/${id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "timestamp": timestamp,
                "body": body
            }
        )
    })
        .then(res => res.json())
        .then(data => data);

/**
 * DELETE /comments/:id
 USAGE:
 Sets a comment's deleted flag to 'true'
 * @param id
 * @returns {Promise<any>}
 */
export const deleteComment = (id) =>
    fetch(`${url}/comments/${id}`, {
        method: "DELETE",
        headers: {
            ...headers,
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => data);
