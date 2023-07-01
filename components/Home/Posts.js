import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostModal from "./PostModal";

// accepts a prop named posts
function Posts({ posts }) {
  // declares a state variable post and a setter function setPost using the useState hook.
  const [post,setPost]=useState()

  return (
    <div>

      
      {/* renders the PostModal component and passes the current post to modalScreen as props. */}
      <PostModal post={post} />

      {/* 1 */}
      {/* to add responsiveness : made GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-10">

        {/* 2 */}
        {/* maps over the posts array and renders a PostItem component for each item in the array. */}
        {posts.map((item,index) => (
          // onClick functionality also copied from the snippet which had a button which when clicked opened the modal window
          // the current post data is stored in the state manager onClick event and this is sent as props to the PostModal
          <div key={index} onClick={()=> {window.my_modal_1.showModal(); setPost(item)}}>
            {/* 3. sent props to the PostItems */}
            <PostItem post={item} modal={true} />
          </div>
        ))}
        
      </div>

    </div>
  );
}

export default Posts;
