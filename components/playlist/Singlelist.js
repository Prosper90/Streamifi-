import React from 'react'

export default function Singlelist({singleList,  playSong}) {
  return (
    <div className="flex gap-4 px-5 w-full md:w-full cursor-pointer h-[200px] flex-nowrap whitespace-nowrap overflow-hidden overflow-x-scroll scrollbar-hide items-center">
      { 
        singleList?.length !== 0 ?
        <>
        {
         singleList?.map((data, index) => (
          <div className="bg-transparent rounded-[5px] cursor-pointer" key={index} onClick={() => playSong(data)} >
          {/* Top */}
          <div className=" relative flex justify-center items-center rounded-[5px] p-2" style={{background: "linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)", backdropFilter: 'blur(20px)'}}>
            <img src={data.imguri} alt="sample" className='w-[70%]' />
      
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 fill-[#553CDF]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                      />
                    </svg>
                </div>
          </div>
      
          {/* Bottom */}
          <div className="flex flex-col gap-3 p-3 text-[10px]">
              {/* Top */}
              <div className="flex justify-between "> 
                <div className="">
                  <div>{data.songname}</div>
                  <div className='font-thin text-xs'> {data.artist} </div>
                </div>
              </div>
      
            </div>
        </div>
        ))
        
       }
        </>

        :

        <div className="">Empty collection</div>
       
      }
    </div>
  )
}
