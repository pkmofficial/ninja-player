import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Hero from '../components/Home/Hero'
import Search from '../components/Home/Search'

import GameList from '../components/Home/GameList'
import { ToastContainer } from 'react-toastify';

// app module created in the firebase-config file is imported
import app from '../shared/FirebaseConfig'
// importing specific functions and objects from the Firebase Firestore SDK
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react'

import Posts from '../components/Home/Posts'

export default function Home() {

  // 0
  // retrieving the Firestore database object and assigning it to the db variable
  // allows us to interact with the Firestore database using the db variable in your code.
  const db=getFirestore(app);

  // 4
  // using state manager to save all the posts value
  const [posts,setPosts]=useState([])

  // 2
  // this function will run once when the application loads and execute getpost() to load all the posts
  useEffect(()=>{
    getPost();
  },[])

  // 1
  // getPost function : to get al the docs from out post collection in firebase
  // obtained from documentation to get the data from firebase db
  const getPost=async()=>{
    // The getDocs function fetches all the documents within the specified collection and returns a querySnapshot object representing the result.
    // This line retrieves a querySnapshot object by using the getDocs function from Firestore and passing in the collection function with two arguments: db (Firestore database reference) and the string "posts" (the name of the collection in the database).
    const querySnapshot = await getDocs(collection(db, "posts"));
    // loop over each document in the querySnapshot result.
    querySnapshot.forEach((doc) => {
      // updates the posts state (using a function provided by a state management library, such as React's useState hook) by adding the data of each document to the existing posts array.
      // doc.data() retrieves the data stored in the current document being iterated over in the loop
      // The ...posts part is using the spread operator (...) to create a new array that includes all the elements from the existing posts array. It effectively makes a copy of the posts array.
      // creates a new array that contains all the elements from the existing posts array and appends the data from the current document as a new element at the end of the array.
      // This new array is then assigned back to the posts state, effectively updating it with the newly added document data.
      setPosts(posts=>[...posts,doc.data()]);
    });
  }

  const onGamePress=async(gameName)=>{
    setPosts([]);
    if(gameName=='All') {
      getPost();
      return ;
    }
    const q=query(collection(db,"posts"), where("game","==",gameName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      let data=doc.data();
      data.id=doc.id
      setPosts(posts=>[...posts,doc.data()]);
    });
  }
  const onSearchButtonClick = async(zipCode)=>{
    setPosts([]);
    const q=query(collection(db,"posts"), where("zip","==",zipCode));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      let data=doc.data();
      data.id=doc.id
      setPosts(posts=>[...posts,doc.data()]);
    });
  }
  
  return (
    <div className='flex flex-col items-center 
    justify-center mt-9'>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme="light"/>
      <div className='w-[70%] md:w-[50%] lg:w-[55%]'>
          <Hero/>
          <Search onSearchButtonClick={onSearchButtonClick}/>
          <GameList onGamePress={onGamePress} />
      </div>
      
      {/* 5. checks if the posts variable has a value. If it does, it renders the Posts COMPONENT with the posts prop containing the value of posts. Otherwise, it renders nothing (null). This allows for conditional rendering of the Posts component based on the presence or absence of data in the posts variable. */}
      {/* Props are a way to pass data from a parent component to a child component in React. In this case, the posts prop is being assigned the value of the posts variable/array. */}
      {posts? <Posts posts={posts}/>:null}
       
    </div>
  )
}
