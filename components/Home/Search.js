import React, { useState } from 'react'

function Search({onSearchButtonClick}) {
    const [searchText,setSearchText]=useState();
    // const onSearchButtonClick=()=>{
    //     // this func not req
    //     // console.log("Search Text:",searchText)
    //     onZipSearch(searchText)
    // }
    return (
    <div className='mt-7'>
        <label  className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input type="search"  onChange={(text)=>setSearchText(text.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "   placeholder="Search with ZipCode" required />
            <button type="submit" onClick={()=>onSearchButtonClick(searchText)}  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 " >Search</button>
        </div>
    </div>
  )
}

export default Search