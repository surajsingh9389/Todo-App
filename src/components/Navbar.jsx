import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-[#1B2845] py-2 px-5 text-white'>
         <div className='logo text-xl  font-bold flex items-center'>
          <span className='cursor-pointer transition-all flex'>MyTodoApp </span>
          <span><img src="./pen.gif" width={30} alt="" /></span>
         </div>

         <ul className='flex items-center gap-5'>
          <a href="/"><li className='w-25 px-1 bg-[#335C81] py-1 rounded-full flex justify-between items-center pr-2'><img src="./Github.png" className='rounded-full' width={32} alt="" />Github</li></a>
          <a href="/"><li className='w-25 px-1 bg-[#335C81] py-1 rounded-full flex justify-between items-center pr-2 '><img src="./Linkdin.png" className='rounded-full' width={32} alt="" />Linkdin</li></a>
         </ul>
    </div>
  )
}

export default Navbar
