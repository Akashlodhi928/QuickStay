import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";

function Star({starValue = 5, onRate}) {
    let [rating, setRating] = useState(0)
    let [hover , setHover] = useState(0)
  return (

    <div className='flex gap-1'>
        {
            [...Array(starValue)].map((_,index)=>
            {
                const starValue = index + 1;
                const isFilled = starValue <=
                (hover || rating);

                return (
                    <span key={starValue} 
                    onClick={()=>{
                        setRating(starValue)
                        onRate && onRate(starValue) }} onMouseEnter={()=>setHover(starValue)}>
                        <FaStar className={`text-2xl cursor-pointer ${isFilled ? "text-yellow-400":"text-gray-500"} `} />
                    </span>
                )
            })
        }
        
    </div>
  )
}

export default Star