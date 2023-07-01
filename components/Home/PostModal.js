import React from 'react'
import PostItem from './PostItem'
import { HiOutlineXCircle } from 'react-icons/hi'

function PostModal({post}) {
  return (
    <div>
      <dialog id="my_modal_1" className="modal p-0 rounded-lg">
        <form method="dialog" className="modal-box">
            {/* clone modal btn from daisyUI*/}
            <button className='absolute right-2 top-2'> <HiOutlineXCircle className='text-[22px] text-white'/> </button>
            {/* everthing inside form deleted and postItem component added directly using props recieved*/}
            {/* modal prop not passed : false used */}
            <PostItem post={post} />
        </form>
      </dialog>
    </div>
  )
}

export default PostModal