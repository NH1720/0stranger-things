import React from "react";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import './Posts.css';

const Posts = ({posts, setPosts, token}) => {
    return (
    <>
        <Link to="/posts/create" className="ui button">Create Post</Link>
        <div className="posts-container">
          {posts.map((item) => {
            return <PostItem key={item._id} posts={item} setPosts={setPosts} token={token}/>;
           })}
         </div>
     </>
      );
 };

export default Posts;