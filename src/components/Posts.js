import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import './Posts.css';

const Posts = ({posts, setPosts, token}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        const searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower) {
            const filteredView = posts.filter((postObj) => {
                if(postObj.title.toLowerCase().includes(searchTermLower)) {
                    return true; 
                }
        
                return false;
            });
            setFilteredPosts(filteredView);
        } else {
            setFilteredPosts(posts);
        }
    }, [searchTerm, posts]);

    return (
    <>
        <div id='search-newpost'>
            <div className="ui icon input">
                <input type="text" placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}/>
                <i aria-hidden="true" className="search icon"></i>
            </div>
            <Link to="/posts/create" className="ui button">Create Post</Link>
        </div>
        {/* <div className="ui icon input">
            <input type="text" placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}/>
            <i aria-hidden="true" className="search icon"></i>
        </div>
        <Link to="/posts/create" className="ui button">Create Post</Link> */}
        <div className="posts-container">
          {filteredPosts.map((item) => {
            return <PostItem key={item._id} posts={item} setPosts={setPosts} token={token}/>;
           })}
         </div>
     </>
      );
 };

export default Posts;