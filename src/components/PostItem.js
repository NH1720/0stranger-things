import React from "react";
import Posts from "./Posts";
import { Link } from "react-router-dom";

const PostItem = ({posts}) => {
    return (
    <div className="ui card">
        <div className="content">
            <div className="centered aligned header">{posts.title}</div>
            <div className="centered aligned description"><p>{posts.description}</p></div>
            <div className="extra content">
                <div className="center aligned header">
                    <Link to="">View Listing</Link>
                </div>
            </div>
        </div>
        
    </div>
    )
};

export default PostItem; 