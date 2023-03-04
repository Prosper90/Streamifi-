import React,{useState, useEffect, useContext} from 'react';
import Contexts from '../../components/context/contextclass';
import { ContractAddress, contractABI, chainID } from '../../components/utils/constants';
import { ethers } from 'ethers';

export default function Dashboard({user}) {


  
    //context and states
    const { 
      provider, 
      setProvider, 
      address, 
      setAddress, 
      signer, 
      setSigner, 
      chain, 
      setChain, 
      setNotify, 
      setNotifyType,
      setNotifyMsg
    } = useContext(Contexts);
  const [owned, setOwned] = useState();

  //get contract instance
  const getContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(ContractAddress, contractABI, signer);
  }


  const getowned = async () => {
    const contract = await getContract();
    const owneddatas = await contract.ownedSongs();
    setOwned(owneddatas);
  }



  const listforsale = async (type, ids) => {

    let value = ids.split(',');
    const idOne = parseInt(value[0]);
    const idTwo = parseInt(value[1]);
    console.log(type, ids);


      //sell from the contract
      if(type === "Album") {
          console.log("called album");
          const Contract = await getContract();
          const setforsaleAlbum = await Contract.Albumforsale(idOne, idTwo);
          await setforsaleAlbum.wait();
          
      } else {
          console.log("called singles");
          const Contract = await getContract();
          const setforsaleSingle = await Contract.singleforsale(idOne, idTwo);
          await setforsaleSingle.wait();
      }

        //notifications
        setNotify(true);
        setNotifyType("success");
        setNotifyMsg("Asset listed for sale");
  }

  useEffect(() => {

    getowned();

  }, [])
  

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
                    <span>${user.soldAmount} </span>
                    <div className="text-[9px] font-thin">Total No: {user.soldTotal} </div>
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
                    <span>${user.boughtAmount}</span>
                    <div className="text-[9px] font-thin">Total No: {user.boughtTotal} </div>
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
                    <span>${user.borrowAmount}</span>
                    <div className="text-[9px] font-thin">Total No: {user.borrowedOut }</div>
                 </div>
              </div>

            </div>



        </div>


         {/* Second layer */}
         <div className="flex flex-col justify-start items-center gap-10 md:flex-row md:justify-start">

          {/* Left */}
          <div className="">
            <div className="mb-5">Albums Unlisted</div>
          
            {/* Left here scrolls */}
            <div className="flex flex-col gap-7 overflow-y-auto">
                
              {/* Items */}

              { owned.album.length == 0 ?
               <>
                 Empty
               </>
              :

                owned.album.map((data, index) => (

                <div className="flex justify-center items-start bg-[#211F27] text-xs p-3 rounded-[6px] w-[250px] gap-5" key={index}>
                   
                  <div className="flex justify-start items-start  rounded-[3px] mr-3" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                     <img src="/images/samplemain.png" alt="image" className='w-[70px] p-[3px]' />
                  </div>

                   <div className="flex flex-col justify-center items-start gap-1">
                     <div className="font-extrathin">Albums</div>
                     <div className="text-sm font-medium"> {data.songname} </div>

                     <div className="flex flex-col font-thin w-full">

                        <div className="flex justify-between w-full">
                           <span>Price</span>

                            <span className="flex justify-center items-center">
                              <span>{ Math.Round( (data.cost / 10 ** 18)  * 10 ) / 10 } ETH</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                            </span>

                        </div>

                     </div>

                     <div className="button bg-[#553CDF] p-2 rounded-[3px] cursor-pointer w-full text-center" onClick={listforsale("Album", data.id)}>
                        List for sale
                     </div>

                   </div>

                </div>
                ))
                
              }

             </div>
            
           </div>



          {/* Right */}
          <div className="">
            <div className="mb-5">Single Unlisted</div>
          
            {/* Left here scrolls */}
            <div className="flex flex-col gap-7 overflow-y-auto">
                
                {/* Items */}
               { owned.single.length == 0

                ?

                <>
                 Empty
                </>

                :

                 owned.single.map((data, index) => (

                  <div className="flex justify-center items-start bg-[#211F27] text-xs p-3 rounded-[6px] w-[250px] gap-5">
                    
                    <div className="flex justify-start items-start  rounded-[3px] mr-3" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                      <img src="/images/samplemain.png" alt="image" className='w-[70px] p-[3px]' />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-1">
                      <div className="font-extrathin">Singles</div>
                      <div className="text-sm font-medium">{data.songname}</div>

                      <div className="flex flex-col font-thin w-full">

                          <div className="flex justify-between w-full">
                            <span>Price</span>

                              <span className="flex justify-center items-center">
                                <span> { Math.Round( (data.cost / 10 ** 18)  * 10 ) / 10 } ETH</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                              </span>

                          </div>

                      </div>

                      <div className="button bg-[#553CDF] p-2 rounded-[3px] cursor-pointer w-full text-center" onClick={listforsale("Single", data.id)}>
                         List for sale
                      </div>

                    </div>

                  </div>                  
                 ))
                

               }




             </div>
            
           </div>



         </div>



         {/* Third layer */}
        <div className="p-2 text-sm overflow-x-auto">

        <div className="font-meduim text-lg mb-5">Recent Transactions</div>

          <div class="bg-[#18181C] rounded-[5px] shadow-sm overflow-x-auto">

            { user.Transactions == 0

             ?
             <>
               Empty transactions
             </>

             :


              <table class="divide-y divide-gray-700 w-full text-sm text-left text-gray-500">
                        {/* Table start */}
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
                      {user.Transactions.map((data, index) => {
                        <tr class="hover:bg-gray-900">
                            <td class="py-4 px-6 text-sm font-medium">{data.event}</td>
                            <td class="py-4 px-6 text-sm font-medium"> {data.musicType}</td>
                            <td class="py-4 px-6 text-sm font-medium"> {data.Price} ETH</td>
                            <td class="py-4 px-6 text-sm font-medium">11/12/2023</td>
                            <td class="py-4 px-6 text-sm font-medium">{data.otherparty}</td>                            
                        </tr>
                      })}
                    </tbody>
                        {/* Table end */}
                </table>


            }
                  
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



export async function  getServerSideProps(context) {

  const {params} = context;
  const {address} = params;

  const user = await fetch(`backend/user/${address}`, { method: 'GET' });
  const userInfo = await user.json();




  return {
    props: {
      user : userInfo,
    }
  }
  
}