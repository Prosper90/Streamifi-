import React from 'react'

export default function Dashboard() {

  return (
    <div className=' text-white font-sm w-full grid md:grid-cols-3 p-8'>


      {/* Left */}
      <div className=" col-span-4 md:col-span-3 grid grid-row-3 md:grid-rows-2 gap-3 ">
         

         {/* First layer */}
        <div className="rounded-[10px] bg-[#18181C] flex flex-col md:flex-row justify-center md:justify-between p-5  md:px-5 gap-3 items-center h-full md:h-[70%] ">


            <div className="flex justify-center items-center gap-3 p-3 bg-transparent">
              
              <div className="m-0 p-2 rounded-[100%] w-[40%] bg-[#000]">
                <div className="">
                  <img src="/images/sold.png" alt="sample" className='' />
                </div>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <div className="font-thin text-xs">Total Sold</div>
                 <div className="font-bold flex flex-col"> 
                    <span>$ 300</span>
                    <div className="text-[9px] font-thin">Total No: 5</div>
                 </div>
              </div>

            </div>
            



            <div className="flex justify-center items-center gap-3 p-3 bg-transparent">
              
              <div className="m-0 p-2 rounded-[100%] w-[35%] bg-[#000]">
                <div className="">
                  <img src="/images/bought.png" alt="sample" className='' />
                </div>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <div className="font-thin text-xs">Total Bought</div>
                <div className="font-bold flex flex-col"> 
                    <span>$ 300</span>
                    <div className="text-[9px] font-thin">Total No: 5</div>
                 </div>
              </div>

            </div>


            <div className="flex justify-center items-center gap-3 p-3 bg-transparent">
              
              <div className="m-0 p-2 rounded-[100%] w-[35%] bg-[#000]">
                <div className="">
                  <img src="/images/borrowed.png" alt="sample" className='' />
                </div>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <div className="font-thin text-xs">Total Borrowed</div>
                <div className="font-bold flex flex-col"> 
                    <span>$ 300</span>
                    <div className="text-[9px] font-thin">Total No: 5</div>
                 </div>
              </div>

            </div>



        </div>


         {/* Second layer */}
         <div className="flex flex-col justify-start items-center gap-10 md:flex-row md:justify-start">

          {/* Left */}
          <div className="">
            <div className="mb-5">UnListed Songs</div>
          
            {/* Left here scrolls */}
            <div className="flex flex-col gap-7 overflow-y-auto">
                
                {/* Items */}
                <div className="flex justify-center items-start bg-[#211F27] text-xs p-3 rounded-[6px] w-[250px] gap-5">
                   
                  <div className="flex justify-start items-start  rounded-[3px] mr-3" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                     <img src="/images/samplemain.png" alt="image" className='w-[70px] p-[3px]' />
                  </div>

                   <div className="flex flex-col justify-center items-start gap-1">
                     <div className="font-extrathin">Albums</div>
                     <div className="text-sm font-medium">Eminem Monster</div>

                     <div className="flex flex-col font-thin w-full">

                        <div className="flex justify-between w-full">
                           <span>Price</span>

                            <span className="flex justify-center items-center">
                              <span>2 ETH</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                            </span>

                        </div>

                     </div>

                     <div className="button bg-[#553CDF] p-2 rounded-[3px] cursor-pointer w-full text-center">
                        List for sale
                     </div>

                   </div>

                </div>



             </div>
            
           </div>



          {/* Right */}
          <div className="">
            <div className="mb-5">Listed Songs</div>
          
            {/* Left here scrolls */}
            <div className="flex flex-col gap-7 overflow-y-auto">
                
                {/* Items */}
                <div className="flex justify-center items-start bg-[#211F27] text-xs p-3 rounded-[6px] w-[250px] gap-5">
                   
                  <div className="flex justify-start items-start  rounded-[3px] mr-3" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                     <img src="/images/samplemain.png" alt="image" className='w-[70px] p-[3px]' />
                  </div>

                   <div className="flex flex-col justify-center items-start gap-1">
                     <div className="font-extrathin">Albums</div>
                     <div className="text-sm font-medium">Eminem Monster</div>

                     <div className="flex flex-col font-thin w-full">

                        <div className="flex justify-between w-full">
                           <span>Price</span>

                            <span className="flex justify-center items-center">
                              <span>2 ETH</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                            </span>

                        </div>

                     </div>

                     <div className="button bg-[#553CDF] p-2 rounded-[3px] cursor-pointer w-full text-center">
                        Stats
                     </div>

                   </div>

                </div>



             </div>
            
           </div>



         </div>



         {/* Third layer */}
        <div className="p-2 text-sm overflow-x-auto">

        <div className="font-meduim text-lg mb-5">Recent Transactions</div>

          <div class="bg-[#18181C] rounded-[5px] shadow-sm overflow-x-auto">

              {/* Table start */}
              <table class="divide-y divide-gray-700 w-full text-sm text-left text-gray-500">
                    <thead class=" dark:bg-gray-700 text-xs text-gray-700 px-5 fonts uppercase">
                        <tr>
                            <th scope="col" class="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Event
                            </th>
                            <th scope="col" class="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Type
                            </th>
                            <th scope="col" class="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Price
                            </th>
                            <th scope="col" class="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Date
                            </th>
                            <th scope="col" class="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Buyer
                            </th>                            
                        </tr>
                    </thead>
                    <tbody class="text-xs">
                        <tr class="hover:bg-gray-900">
                            <td class="py-4 px-6 text-sm font-medium">Buy</td>
                            <td class="py-4 px-6 text-sm font-medium">Album</td>
                            <td class="py-4 px-6 text-sm font-medium">5 ETH</td>
                            <td class="py-4 px-6 text-sm font-medium">11/12/2023</td>
                            <td class="py-4 px-6 text-sm font-medium">0X2334ddlsxcw....</td>                            
                        </tr>
                        <tr class="hover:bg-gray-900">
                            <td class="py-4 px-6 text-sm font-medium ">Buy</td>
                            <td class="py-4 px-6 text-sm font-medium">Album</td>
                            <td class="py-4 px-6 text-sm font-medium">5 ETH</td>
                            <td class="py-4 px-6 text-sm font-medium">11/12/2023</td>
                            <td class="py-4 px-6 text-sm font-medium">0X2334ddlsxcw....</td>                            
                        </tr>
                        <tr class="hover:bg-gray-900">
                            <td class="py-4 px-6 text-sm font-medium ">Buy</td>
                            <td class="py-4 px-6 text-sm font-medium">Album</td>
                            <td class="py-4 px-6 text-sm font-medium">5 ETH</td>
                            <td class="py-4 px-6 text-sm font-medium">11/12/2023</td>
                            <td class="py-4 px-6 text-sm font-medium">0X2334ddlsxcw....</td>                            
                        </tr>
                    </tbody>
                </table>
              {/* Table end */}
                  
          </div>

        </div>


      </div>




      {/* Right 
      <div className=" md:col-span-1 bg-[#18181C] p-3 flex flex-row md:flex md:flex-col gap-12 text-sm rounded-[5px] ">

         <div className="">Analytics</div>

         <div className="flex flex-col gap-2 p-5 rounded-[5px]">

           <div className="">Top Creators</div>

           <div className=" bg-home p-4 flex flex-col gap-3">
             <div className="">0X2334ddlsxcw...</div>
             <div className="">0X2334ddlsxcw...</div>
             <div className="">0X2334ddlsxcw...</div>
             <div className="">0X2334ddlsxcw...</div>
           </div>

         </div>


         <div className="flex flex-col gap-2 p-5 rounded-[5px]">

           <div className="">Top Played</div>

           <div className="bg-home p-4 flex flex-col gap-3">
             <div className="">Dance</div>
             <div className="">Monkey</div>
             <div className="">Phil</div>
             <div className="">Shape of you</div>
           </div>

         </div>



         <div className="flex flex-col gap-2 p-5 rounded-[5px]">

           <div className="">Trending Album</div>

           <div className="bg-home p-4 flex flex-col gap-3 ">
             <div className="">Dance</div>
             <div className="">Monkey</div>
             <div className="">Phil</div>
             <div className="">Shape of you</div>
           </div>

         </div>         



      </div>
       */}


       
    </div>
    
  )
}
