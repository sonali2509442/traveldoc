import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className='w-full min-h-screen'>
        <div className='pt-18  text-center'>
            <h1 className='font-bold text-4xl'>Make memories by travelling</h1>
            <h5 className='pt-2 px-70'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit labore sit officia nobis, exercitationem ab rem eligendi cupiditate aliquid deleniti.</h5>
       
       
        </div>

        <div className='pt-10 min-h-screen flex rounded-4xl'>
            
            <img src="\searchplace.png" alt="miage" 
            className='h-120 w-1/2 rounded-lg pl-28' />
            

            <div className='text-center pt-38'>
      <h1 className='font-bold text-3xl'>Search by places</h1>
      <h5 className='px-15'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, architecto.</h5>
       <button className='bg-amber-300 w-23 mt-3 h-9 rounded-2xl'>
        <Link to="/search">Search</Link>   
          </button> 
            </div>
        </div>
    </div>
  )
}

export default Banner