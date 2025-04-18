import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-violet-400 text-gray-700 font-bold p-2'>
         <div className='logo text-blue-700 text-2xl'>
          <span className='cursor-pointer hover:text-yellow-500 transition-all'>MyTodoApp</span>
         </div>
        <ul className='flex gap-19'>
            <li className='cursor-pointer hover:text-red-600 transition-all'>Home</li>
            <li className='cursor-pointer hover:text-red-600 transition-all'>About us</li>
            <li className='cursor-pointer hover:text-red-600 transition-all'>Info</li>
        </ul>
    </div>
  )
}

export default Navbar
