import {ADD_POST} from "../actions";
import * as PostAPI from "../utils/PostWebAppAPI";

const CATEGORY = "category";
const POST = "post";
const COMMENT = "comment";

const initialPostState = {
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

const createNewPost = (id, timestamp, title, body, author, category) => ({
    "id": id,
    "timestamp": timestamp,
    "title": title,
    "body": body,
    "author": author,
    "category": category,
    "voteScore":1,
    "deleted":false,
    "commentCount":0
});

const post = (state = initialPostState, action) => {
    const {id, timestamp, title, body, author, category} = action;
    switch(action.type){
        case ADD_POST:
            console.log("ADD_POST Reducer State: ", state);
            //make api post request and get request
            //save to state
            // PostAPI.addPost(id, timestamp, title, body, author, category)
            //     .then(data => data);
            return {
                ...state,
                [POST]: state[POST].concat(
                    [createNewPost(id, timestamp, title, body, author, category)])
            };

        default:
            return state;
    }
};

export default post;