import React from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";
import './PostItem.css'



const PostItem = ({posts, token, setPosts}) => {

    const handleDeleteClick = async (postID) => {
        await deletePost(token, postID)
        setPosts((prevPost) => {
           return prevPost.filter((post) => {
               return post._id !== postID 
            })
        })
    }
   

    return (
    <div className="ui card">
        <div className="content" id="card-container">
            <div className="left floated aligned header" id="title">
                {posts.title}
            </div>
            <div className="centered aligned description" id="description"><p>{posts.description}</p></div>
            <div className="centered aligned description" id="price"><h3>{posts.price}</h3></div>
            <div className="extra content">
                <div className="center aligned header">
                    <Link to={`/posts/${posts._id}`}>View Listing</Link>
                </div>
            </div>
        </div>
        <div role="list" className="ui divided relaxed list" style={{color: "#444", clear: 'both'}}>
        
        {posts.isAuthor ? 
                <div className="right floated aligned tiny header">Mine</div>
                : null}

            {posts.isAuthor && token ? (
                <button className="negative ui button left floated" onClick={() => handleDeleteClick(posts._id)}>Delete</button>) : null}
            
            
            <div>
                {posts.messages.map((message) => {
                return (
                    <div id='messages' key={message._id} role="listitem" className="item"
                    style={{clear: 'both'}}>
                        <span id='username'>{message.fromUser.username}</span>
                        <p className="content" id="message-content">{message.content}</p>
                    </div>)
                })}
            </div>
        </div>
    </div>
    )
};

export default PostItem; 