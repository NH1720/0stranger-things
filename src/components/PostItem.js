import React from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";



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
        <div className="content">
            <div className="left floated aligned header">
                {posts.title}
            </div>
            <div className="centered aligned description"><p>{posts.description}</p></div>
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
                    <div key={message._id} role="listitem" className="item">
                        <span>{message.fromUser.username}</span>
                        <p className="content">{message.content}</p>
                    </div>)
                })}
            </div>
        </div>
    </div>
    )
};

export default PostItem; 