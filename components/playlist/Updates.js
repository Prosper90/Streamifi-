import React from 'react'

export default function Updates() {
  return (
    <div className='flex justify-center items-center gap-3 mt-2 flex-wrap'>
       
      <div className="bg-[#E13300] flex justify-around items-center gap-3 w-[130px] h-[70px] p-3 rounded-[5px]">
        <span className='font-normal text-xs'>Podcasts</span>
        <span><img src="/images/podcasts.svg" alt=""  /></span>
      </div>


      <div className="bg-[#7358FF] flex justify-around items-center gap-3 w-[130px] h-[70px] p-3 rounded-[5px]">
        <span className='font-normal text-xs'>Live Events</span>
        <span><img src="/images/podcasts.svg" alt=""  /></span>
      </div>


      <div className="bg-[#E8125C] flex justify-around items-center gap-3 w-[130px] h-[70px] p-3 rounded-[5px]">
        <span className='font-normal text-xs'>Afro</span>
        <span><img src="/images/podcasts.svg" alt=""  /></span>
      </div>


      <div className="bg-[#D84000] flex justify-around items-center gap-3 w-[130px] h-[70px] p-3 rounded-[5px]">
        <span className='font-normal text-xs'>Hip Hop</span>
        <span><img src="/images/podcasts.svg" alt=""  /></span>
      </div>



    </div>
  )
}
