import React from 'react'
import Librarynav from '../components/librarycomponents/Librarynav'
import { Link } from 'react-router-dom'
const Bookdetail = () => {
  return (
    <div className='bg-[#EFEFEF] h-auto lg:h-screen '>
        <Librarynav />
      <div className='flex justify-center gap-6'>
        <div className='bg-white grid grid-cols-[1fr_1fr] p-6 gap-4 max-w-[900px] w-full '>

        
               <img src="./librarycollection.png" className='w-full h-[500px] object-cover' alt="./bookdetail" />
               <div>
                <p className='uppercase'>Book</p>
                <h3 className='text-[35px] font-bold'>The Rules We Live By</h3>
                <span className='text-green-400'>Available</span>

                <div className='grid grid-cols-[1fr_2fr]'>
                    <div className='border border-gray-300 p-1.5'><p>Authors</p></div>
                    <div className='border border-gray-300 p-1.5'><p>Anthony Martial</p></div>
              <div className='border border-gray-300 p-1.5'><p>Authors</p></div>
                    <div className='border border-gray-300 p-1.5'><p>Anthony Martial</p></div>
                       <div className='border border-gray-300 p-1.5'><p>Authors</p></div>
                    <div className='border border-gray-300 p-1.5'><p>Anthony Martial</p></div>
                       <div className='border border-gray-300 p-1.5'><p>Authors</p></div>
                    <div className='border border-gray-300 p-1.5'><p>Anthony Martial</p></div>
                       <div className='border border-gray-300 p-1.5'><p>Authors</p></div>
                    <div className='border border-gray-300 p-1.5'><p>Anthony Martial</p></div>
                </div>
                <button className='bg-[#C54800] text-white px-8 py-2 mt-4 rounded-xl'>Borrow Book</button>
                <br />
                <button className='bg-[#C54800] text-white px-7 py-2 mt-2 rounded-xl'>Request Book</button>
               </div>
   
        </div>
       
      </div>
    </div>
  )
}

export default Bookdetail
