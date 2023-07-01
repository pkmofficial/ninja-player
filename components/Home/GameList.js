import React, { useEffect, useState } from 'react'
import Data from './../../shared/Data'

{
  // In the JSX code within the GameList component, you can see that for each game item, a <div> element is rendered. This <div> element has an onClick event handler that calls the onGamePress function and passes the item.name as an argument.
  // The purpose of onGamePress is to handle the action or behavior when a game item is clicked. It could be a function defined in the parent component that needs to react to the specific game being pressed. By passing onGamePress as a prop to the GameList component, it allows the parent component to provide its own implementation for handling the click event.
  // In other words, onGamePress serves as a way for the parent component to define the desired behavior when a game item is clicked within the GameList component.
}

function GameList({onGamePress}) {
  const [games,setGames]=useState();
  
  useEffect(()=>{
      setGames(Data.GameList) 
  },[])
  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-4'>
        {/* Map over the games array and render each game item */}
        {games?.map((item)=>(
            <div key={item.id} onClick={()=>onGamePress(item.name)} className='flex flex-col items-center cursor-pointer'>
                <img src={item.image} width={45} height={45} className='hover:animate-bounce transition-all duration-150'/>
                <h2 className='text-[14px] text-center'>{item.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default GameList