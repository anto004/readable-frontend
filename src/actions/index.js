export const ADD_POST = "ADD_POST";

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
