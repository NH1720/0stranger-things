import React from "react";
import PostItem from "./PostItem";

const Posts = ({posts}) => {
    return (
        <div>
          {posts.map((item) => {
            return <PostItem key={item._id} posts={item} />;
           })}
         </div>
      );
 };

export default Posts;