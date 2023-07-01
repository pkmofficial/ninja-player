import React, { useEffect, useState } from "react";
// gamelist data imported 
import Data from "../../shared/Data";
// for session info
import { useSession } from "next-auth/react";
// to interact with firebase app
import app from "./../../shared/FirebaseConfig";
// 4 to send data to fireStore database
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import Toast from "../Toast";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
  {/* 2 store data of form and user in the input object */}
  // storing the entered data form in state management vars
  const [inputs, setInputs] = useState({});

  {/* 2.1 storing form data in the input object */}
  // handleChange function is used as an event handler for multiple form inputs. 
  // Each time an input value changes, the handleChange function is called, and it updates the inputs object by adding or updating a specific property indicated by the name attribute of the input element.
  /* example :
  {
    title: "entered value",
    description: "entered value",
  }
  */
  const handleChange = (e) => {
    // Retrieves the name and current value attribute from the input element  
    const name = e.target.name; 
    const value = e.target.value;
    // uses the setInputs function (provided by the useState hook) to update the state of the 'inputs' object
    // the spread operator (...) is used to create a new object that combines the existing values of the values object with a new key-value pair.
    setInputs((values) => ({ ...values, [name]: value }));
  };

  {/* 2.2 storing user data in the input object */}
  // storing more data of user/creator of post in "input" object
  const { data: session } = useSession();
  // useEffect(() => { ... }, [session]); sets up an effect that runs when the session variable changes. The effect is triggered when there is a change in the user's session, such as when the user logs in or logs out.
  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name })); // userName
      setInputs((values) => ({ ...values, userImage: session.user?.image })); // userImage
      setInputs((values) => ({ ...values, email: session.user?.email })); // userEmail
    }
  }, [session]);
  //  Note: that the values for title, desc, date, location, zip, and game would come from the user input in the form, while the values for userName, userImage, and email would be populated from the user's session data.
  /* "inputs object will look like this"
  const [inputs, setInputs] = useState({
    // Initial form data properties
    title: 'Example Title',
    desc: 'Example description',
    date: '2023-07-01',
    location: 'Example Location',
    zip: '12345',
    game: 'Example Game',

    // Additional user/creator information
    userName: 'John Doe',
    userImage: 'https://example.com/user-image.jpg',
    email: 'johndoe@example.com',
  });
  */

 
//  const [showToast, setShowToast] = useState(false);
 
 // 4 : initialize fireStore and added reference to our firebase application
 const db = getFirestore(app);

 // 5 : initialize fireStorage and added reference to our firebase application
 const storage = getStorage(app);
 // storing the entered image in state management var(file) in 5.1
 const [file, setFile] = useState();


  const [submit, setSubmit] = useState(false);

  {/* 3 onSubmit  */}
  // 4.1 made async as per the documenation
  // reason : This syntax defines an asynchronous function. The async keyword indicates that the function contains asynchronous operations, and it allows the use of await inside the function body to pause execution until a promise is resolved or rejected. This is typically used when you need to perform asynchronous tasks, such as making API calls or interacting with databases, within the handleSubmit function.
  const handleSubmit = async (e) => {
    // 3.1 : prevents the default form submission behavior, which would cause a page refresh. This allows you to handle the form submission manually without navigating away from the current page.
    e.preventDefault(); 
    // console.log(inputs)
    toast.warn('Post Created Successfully.', {
      position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: false, progress: undefined, theme: "dark",
    });
    // setShowToast(true); // triggers the display of a toast notification to indicate that the form has been submitted successfully
    
    // 5.2
    // storage reference provided
    const storageRef = ref(storage, 'event-buzz/'+file?.name);
    // uploaded image to fireStorage
    uploadBytes(storageRef, file).then(resp=>{
      // got its url
      getDownloadURL(storageRef).then(async(url)=>{
        // added url to the document in post collection as a feild(added data to input-obj)
        setInputs((values)=>({...values, image:url}));          
        // now we're finally ready to submit
        setSubmit(true); 
      }) 
    }) ;
    
  };

  
  useEffect(()=>{
    if(submit==true)
    {
      savePost();
    }
  },[submit])

  // 4.2 if submitted save data in fireStore
  const savePost=async()=>{
    // add document in firebase collection "posts" in our "db" dataabse 
    // timestamp is the id of document which is unique always
    // and the entered data is the input-object(feilds)
    await setDoc( doc(db,"posts",Date.now().toString()) , inputs );
  }

  return (
    <div className="mt-4">
      {/* {showToast ? 
        (
          <div className="absolute top-10 right-10">
            <Toast msg={"Post Created Successfully"} closeToast={() => setShowToast(false)} />
          </div>
        ) 
      : 
        null
      } */}

      {/* 1 create form and its content */}
      {/* added onSubmit functionality to save the entered data in db */}
      <form onSubmit={handleSubmit}>
        {/* name and required must be present */}
        <input type="text" name="title" placeholder="Title" required onChange={handleChange} className="w-full mb-4 border-[1px] p-2 rounded-md"/>
        <textarea name="desc" className="w-full mb-4 outline-blue-400 border-[1px]  p-2 rounded-md" required onChange={handleChange} placeholder="Write Description here"/>
        <input type="date" name="date" required onChange={handleChange}  className="w-full mb-4 border-[1px] p-2 rounded-md" />
        <input type="text" placeholder="Location" name="location" required onChange={handleChange} className="w-full mb-4 border-[1px] p-2 rounded-md" />
        <input type="text" placeholder="Zip" name="zip" required onChange={handleChange} className="w-full mb-4 border-[1px] p-2 rounded-md" />
        <select name="game" onChange={handleChange} required  className="w-full mb-4 border-[1px] p-2 rounded-md" >
          <option disabled defaultValue> Select Game </option>
          {/* iterates the gamelist json format data and shoes their name */}
          {Data.GameList.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        {/* 5.1 upload image functionality  */}
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} accept="image/gif, image/jpeg, image/png" className="mb-5 border-[1px] w-full" />
        <button type="submit" className="bg-blue-500 w-full p-1 rounded-md text-white" > Submit </button>
      </form>
    </div>
  );
}

export default Form;
