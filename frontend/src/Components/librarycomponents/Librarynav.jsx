import React from 'react'
import { Link } from 'react-router-dom'
const Librarynav = () => {
  return (
    <div>
        <div className='bg-[#72333B]'>
        <div className='flex justify-between text-white py-6 items-center container'> 
            <div><Link className='text-[28px] font-[Dela Gothic One] '>Studingham Library</Link></div>
            <div className='flex gap-6'><Link className='text-[22px]'>Collection</Link><Link className='text-[22px]'>Personal History</Link> <Link className='text-[22px]'>Mentorship</Link>   <div className='bg-gray-600 w-10 h-10 rounded-full'></div></div>
           
          
           
        </div>
      
    </div>
    <div className='flex justify-center my-8'>
          <div className="relative w-[376px]">
        <div className="absolute left-3 top-1/2  -translate-y-1/2">
          <svg
            width={20}
            height={20}
            viewBox="0 0 29 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2083 0C5.02469 0 0 5.44167 0 12.1385C0 18.8353 5.02469 24.277 11.2083 24.277C13.655 24.277 15.9162 23.4235 17.7603 21.9787L26.4343 31.3503L28.2887 29.3421L19.7176 20.0374C21.4019 17.9121 22.4166 15.1536 22.4166 12.1385C22.4166 5.44167 17.392 0 11.2083 0ZM11.2083 1.42806C16.6786 1.42806 21.098 6.21427 21.098 12.1385C21.098 18.0627 16.6786 22.8489 11.2083 22.8489C5.73809 22.8489 1.31863 18.0627 1.31863 12.1385C1.31863 6.21427 5.73809 1.42806 11.2083 1.42806Z"
              fill="black"
            />
          </svg>
        </div>
        <input
          type="text"
          className="border-0 bg-[#F7F7F8] rounded-2xl pl-10 pr-4 py-2.5 w-full placeholder:font-bold  placeholder-gray-500 focus:outline-none"
          placeholder="Search by keyword/title/author/ISBN"
        />
      </div>
    </div>
    </div>
  )
}

export default Librarynav
