import React from 'react'

export default function Forms({ selected, 
                                mintalbum, 
                                inputdataone, 
                                handleChangeone,
                                 mintsingle, 
                                 inputdatatwo, 
                                 handleChangetwo,
                                 singleImg,
                                 singleSongs,
                                 AlbumImg,
                                 AlbumSongs
                              }) {


  
  return (
        
        <div className=" flex flex-col items-center md:flex-row md:justify-center gap-[70px] p-2 mt-[50px] text-sm ">
            {/* Mint inputs */}
          { selected === "Album" 
           ?
          <div className=" w-[80%] md:w-[35%]">
            {/* For Albums */}
            <h3 className='font-medium mb-[29px]'>Mint  Album</h3>

            <form action="flex flex-col bg-white" onSubmit={(e) => mintalbum(e)}>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Music Names' name='musicNames' className='bg-transparent outline-0 border-0' />
                 <img src="/images/headset.png" alt="" />
               </div>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Artist' name='artists' className='bg-transparent outline-0 border-0' />
                 <img src="/images/artist.png" alt="" />
               </div>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Uris' name='musiuris' value={AlbumSongs} className='bg-transparent outline-0 border-0' disabled/>
                 <img src="/images/uri.png" alt="" />
               </div>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Image cover' value={AlbumImg} name='imageuri' className='bg-transparent outline-0 border-0' disabled/>
                 <img src="/images/image.png" alt="" />
               </div>

               <div className=" relative flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                  {inputdataone && <small className='absolute bottom-6'  >{inputdataone} BNB</small> } 
                 <input type="text" placeholder='Price' className='bg-transparent outline-0 border-0' onChange={(e) => handleChangeone(e)} />
                 <img src="/images/dollar.png" alt="" />
               </div>

               <button className='bg-[#553CDF] text-white rounded-[5px] p-3 w-[150px]' type='submit'>Mint</button>

            </form>

          </div>

           :
          
          <div className=" w-[80%] md:w-[35%] h-full">
              {/* For Singles */}
            <h3 className='font-medium mb-[29px]'>Mint  Singles</h3>

            <form action="flex flex-col gap-3 bg-white" onSubmit={(e) => mintsingle(e)}>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Music Names</div> */}
                <input type="text" name='musicName' placeholder='Music Names' className='bg-transparent outline-0 border-0' />
                <img src="/images/headset.png" alt="" />
              </div>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Artist</div> */}
                <input type="text" placeholder='Artist' name='artist' className='bg-transparent outline-0 border-0' />
                <img src="/images/artist.png" alt="" />
              </div>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Uris</div> */}
                <input type="text" placeholder='Uris' value={singleSongs}  name='musiuri' className='bg-transparent outline-0 border-0' disabled />
                <img src="/images/uri.png" alt="" />
              </div>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Image cover</div> */}
                <input type="text" placeholder='Image cover' value={singleImg} name='imageuri' className='bg-transparent outline-0 border-0' disabled/>
                <img src="/images/image.png" alt="" />
              </div>

              <div className="relative flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">  
                {inputdatatwo && <small className='absolute bottom-6' >{inputdatatwo} BNB</small>} 
                <input type="text" placeholder='Price' className='bg-transparent outline-0 border-0' onChange={(e) => handleChangetwo(e)} />
                <img src="/images/dollar.png" alt="" />
              </div>

              <button className='bg-[#553CDF] text-white rounded-[5px] p-3 w-[150px]' type='submit' >Mint</button>

            </form>

          </div>
          }


          {/* Seperate Line 
          <div className=" hidden md:block md:h-[400px] md:bg-white md:mt-5 md:ml-7 md:mr-7 md:text-[1px]">.</div>
          */}





        </div>
  )
}
