import React, {useState} from "react";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
import { addMessage } from "../api/api";

const PostDetail = (props) => {
    const {token, posts} = props;
    const {postID} = useParams();
    const [newMessage, setNewMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const singlePost = posts.find((onePost) => {
       const foundPost = onePost._id == postID;
       return foundPost;
    })

const handleOnSubmit = async (event) => {
    event.preventDefault();

    const {success, error, message} = await addMessage(token, postID, newMessage);

    if (success) {
        setNewMessage('');
        console.log("Successfully added message.")
    } else {
        setErrorMessage(error);
        console.log("Failed to add message")
    }

};


if(singlePost) {
    return (
    <>
        <PostItem posts={singlePost}/>
        <form className="comment-form" onSubmit={handleOnSubmit}>
            <input type="text" placeholder="Message the Owner"
            value={newMessage}
            onChange={(event) => {
                setNewMessage(event.target.value);
            }}/>
            <button type="submit">Send</button>
            {errorMessage ? 
            <p style={{color: 'red', backgroundColor: 'pink'}}>Operation Failed {errorMessage}</p> : null}
        </form>
    </>
    )
} else {
    return  (
        <p>Loading.......</p>
    )
}

};

export default PostDetail;