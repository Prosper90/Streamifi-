import React from 'react'

export default function Trendingsongs({users}) {

  return (
    <div className="h-[300px] w-[100%] pt-[44px] px-5 overflow-y-scroll overflow-x-hidden flex flex-col gap-3 justify-center items-center">
    {/* Map through starts */}
    {
      users.map((data, index) => {

        if(index < 5) {

            return (
              <div className="relative flex justify-between p-2 space-x-2 rounded-3xl dark:bg-neutral-800 hover:shadow-xl transition-shadow border-2 border-[#553CDF] w-full" key={index} >
                <a className="flex-grow flex space-x-4">
                    <div className="relative w-16 sm:w-24">
                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg" >
                            <img src="https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" className="object-cover w-full h-full" alt="nc-imgs" />
                        </div>
                        </div>
                        <div className="flex flex-col justify-center flex-grow">
                                <h2 className="block font-medium text-sm">{data.address}</h2>
                        <div className=" flex items-center pt-3 mt-1.5">
                        <div className="hidden sm:flex -space-x-1.5 ">Total Sold</div>
                        <div className="sm:ml-3.5">
                            <div className="flex items-baseline border-2 border-[#553CDF] rounded-lg relative py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold ">
                                <span className=" text-green-500 !leading-none">{data.soldTotal}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </a>
                </div>
            )
        }
     })
    }


    {/* Map through end */}

    </div>
  )
}
