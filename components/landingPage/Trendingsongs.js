import React from 'react'

export default function Trendingsongs() {

  return (
    <div className="">
    {/* Map through starts */}
    <div className="relative flex justify-between p-2 space-x-2 rounded-3xl dark:bg-neutral-800 hover:shadow-xl transition-shadow border-2 border-[#553CDF] w-full" >

        <a className="flex-grow flex space-x-4">
            <div className="relative w-16 sm:w-24">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg" >
                <img src="https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" className="object-cover w-full h-full" alt="nc-imgs" />
            </div>
            </div>
            <div className="flex flex-col justify-center flex-grow">
                    <h2 className="block font-medium sm:text-lg">NFT music #114</h2>
            <div className=" flex items-center pt-3 mt-1.5">
            <div className="hidden sm:flex -space-x-1.5 ">Icon</div>
            <div className="sm:ml-3.5">
                <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold ">
                    <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 bg-[#211F27]">Price</span>
                    <span className=" text-green-500 !leading-none">1.00 ETH</span>
                </div>
            </div>
                <span className="block ml-3.5 text-neutral-500 dark:text-neutral-400 text-xs">1 of 100</span>
            </div>
        </div>
        </a>
    <div className="nc-ButtonPlayMusicRunningContainer select-none flex items-center" data-nc-id="ButtonPlayMusicRunningContainer">
        <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full dark:bg-neutral-900/50 text-primary-6000 dark:text-primary-200 shadow-lg cursor-pointer">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.25 12L5.75 5.75V18.25L18.25 12Z"></path>
        </svg>
        </span>
    </div>

    </div>

    {/* Map through end */}

    </div>
  )
}
