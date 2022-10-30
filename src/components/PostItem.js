import React from "react";
import Posts from "./Posts";
import { Link } from "react-router-dom";

const PostItem = ({posts}) => {
    return (
    <div className="ui card">
        <div className="content">
            <div className="left floated aligned header">
                {posts.title}
            </div>
            <div className="right floated aligned header">
                {posts.isAuthor ? 
                <span>Mine</span>
                : null}
            </div>
            <div className="centered aligned description"><p>{posts.description}</p></div>
            <div className="extra content">
                <div className="center aligned header">
                    <Link to="">View Listing</Link>
                </div>
            </div>
        </div>
        <div role="list" className="ui divided relaxed list" style={{color: "#444"}}>
            {posts.messages.map((message) => {
                return (
                    <div role="listitem" className="item">
                        <span>{message.fromUser}</span>
                        <p className="content">{message.content}</p>
                    </div>)
            })}
        </div>
    </div>
    )
};

export default PostItem; 