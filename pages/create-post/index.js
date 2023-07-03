// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import React, { useEffect } from 'react'
// import Form from '../../components/CreatePost/Form';

// function CreatePost() {
//   // extracting the data property from the object returned by useSession() and assigning its value to the session variable
//   const {data:session}=useSession();
//   // router added to go back to home page if session not active
//   const router=useRouter();
//   useEffect(()=>{
//     if(!session)
//     {
//       alert("Attention, Human! \nYou need to prove your identity to enter the magical realm of post creation. \nSign in now to reveal the secrets within.")
//       router.push('/') // home page
      
//     }
//   },[]);
  
//   return (
//     <div className='flex justify-center'>
//     <div className='p-6 mt-8 lg:w-[35%] md:w-[50%]'>
//         <h2 className='text-[30px] 
//         font-extrabold text-blue-500'>CREATE POST</h2>
//         <p>Create Post and Discover/Invite new Friends and Player </p>
//         <Form/>
//     </div>
//     </div>
//   )
// }

// export default CreatePost

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../../components/CreatePost/Form';

function CreatePost() {
  const { data: session } = useSession();
  const router = useRouter();
  const showToastMessage = () => {
    toast.warn('Please sign in to create a post.', {
      position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "light",
    });
  }
  useEffect(() => {
    if (!session) {
      // toast.warn('Please sign in to create a post.', {
      //   position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "light",
      // });
      showToastMessage()
      // toast("");
      router.push('/'); // home page
    }
  }, [session, router]);

  return (
    <div className='flex justify-center'>
      <div className='p-6 mt-8 lg:w-[35%] md:w-[50%]'>
        <h2 className='text-[30px] font-extrabold text-blue-500'>CREATE POST</h2>
        <p>Create Post and Discover/Invite new Friends and Players</p>
        {session ? (
          <Form />
        ) : null}
      </div>
    </div>
  );
}

export default CreatePost;
