import React,{useState, useEffect, useContext} from 'react';
import Contexts from '../../components/context/contextclass';
import { ContractAddress, contractABI, chainBSC, chainPolygon } from '../../components/utils/constants';
import { ethers } from 'ethers';
import Sideload from '../../components/preloader/Sideload';
import { useRouter } from 'next/router';

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
      setNotifyMsg,
      manualChain,
      unfilteredAlbums,
      unFilteredsingle,
      smallLoad,
      setSmallLoad,
      sideload,
      setSideLoad,
    } = useContext(Contexts);
  //router
  const router = useRouter();  
  const [owned, setOwned] = useState();
  const [ownedAlbums, setOwnedAlbums] = useState();
  const [ownedSingles, setOwnedSingles] = useState();

  //get contract instance
  const getContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(ContractAddress, contractABI, signer);
  }



  const getowned = async () => {
    const contract = await getContract();
    const owneddatas = await contract.owns(address);
    var arrAlbum =  unfilteredAlbums?.filter((item) => owneddatas.album.includes(item.Albummarketplace[0].id)) ;
    var arrSingle = unFilteredsingle?.filter(({id}) => owneddatas.single.includes(id));

    setOwned(owneddatas);
    setOwnedAlbums(arrAlbum);
    setOwnedSingles(arrSingle);
  }



  const listforsale = async (type, index) => {


      //sell from the contract
      setSideLoad(true);
      if(type === "Album") {

        try {
          console.log("called album");
          const Contract = await getContract();
          const setforsaleAlbum = await Contract.Albumforsale(index);
          await setforsaleAlbum.wait(); 
        } catch (error) {
          setNotify(true);
          setNotifyType("warn");
          setNotifyMsg("user cancelled transaction");
          setSideLoad(false);    
        }
          
      } else {

        try {
          console.log("called singles");
          const Contract = await getContract();
          const setforsaleSingle = await Contract.singleforsale(index);
          await setforsaleSingle.wait();
        } catch (error) {
          setNotify(true);
          setNotifyType("warn");
          setNotifyMsg("user cancelled transaction")
          setSideLoad(false);           
        }

      }
        //notifications
        setNotify(true);
        setNotifyType("success");
        setNotifyMsg("Asset listed for sale");
        setSideLoad(false);
  }



  useEffect(() => {

    if(!address){
      setNotify(true);
      setNotifyType("warn")
      setNotifyMsg("Expired connect your wallet to proceed");
      
      router.push('/');
    }


    getowned();


  }, [])
  
  

  return (
    <div className={`text-white font-sm w-full grid md:grid-cols-3 p-8 ${sideload && " relative opacity-25"}`}>


         {
            sideload && 
            <Sideload  />
          }


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
         <div className="flex flex-col justify-start items-start gap-10 md:flex-row md:justify-start md:items-center">

          {/* Left */}
          <div className="">
            <div className="mb-5">Albums Unlisted</div>
          
            {/* Left here scrolls */}
            <div className="flex flex-col gap-7 overflow-y-scroll overflow-x-hidden h-[158px]">
                
              {/* Items */}

              { ownedAlbums?.length == 0 ?
               <>
                 Empty
               </>
              :

              ownedAlbums?.map((data, index) => {
                if(data.Albummarketplace[0].sale !== true) {

               return (
                <div className="flex justify-center items-start bg-[#211F27] text-xs p-3 rounded-[6px] w-[250px] gap-5" key={index}>
                   
                  <div className="flex justify-start items-start  rounded-[3px] mr-3" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                     <img src={data.Albummarketplace[0].imguri} alt="image" className='w-[70px] p-[3px]' />
                  </div>

                   <div className="flex flex-col justify-center items-start gap-1">
                     <div className="font-extrathin">Albums</div>
                     <div className="text-sm font-medium"> {data.Albummarketplace[0].songname} </div>

                     <div className="flex flex-col font-thin w-full">

                        <div className="flex justify-between w-full gap-5">
                           <span>Price</span>

                            <span className="flex justify-center items-center">
                              <span>{ Math.round( (data.Albummarketplace[0].cost / 10 )  * 10 ) / 10**18 } {manualChain == chainBSC ? "bnb" : manualChain == chainPolygon ? "matic" : "eth"}</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                            </span>

                        </div>

                     </div>

                     <div className="button bg-[#553CDF] p-2 rounded-[3px] cursor-pointer w-full text-center" onClick={() => listforsale("Album", data.Albummarketplace[0].index)}>
                        List for sale
                     </div>

                   </div>

                </div>
              )
              }
             })
                
              }

             </div>
            
           </div>



          {/* Right */}
          <div className="">
            <div className="mb-5">Single Unlisted</div>
          
            {/* Left here scrolls */}
            <div className="flex flex-col gap-7 overflow-y-scroll overflow-x-hidden h-[300px]">
                
                {/* Items */}
               { ownedSingles?.length == 0

                ?

                <>
                 Empty
                </>

                :

                ownedSingles?.map((data, index) => (

                  <div className="flex justify-center items-start bg-[#211F27] text-xs p-3 rounded-[6px] w-[250px] gap-5">
                    
                    <div className="flex justify-start items-start  rounded-[3px] mr-3" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                      <img src={data.imguri} alt="image" className='w-[70px] p-[3px]' />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-1">
                      <div className="font-extrathin">Singles</div>
                      <div className="text-sm font-medium">{data.songname}</div>

                      <div className="flex flex-col font-thin w-full">

                          <div className="flex justify-between w-full gap-5">
                            <span>Price</span>

                              <span className="flex justify-center items-center">
                                <span> { Math.round( (data.cost / 10 ** 18)  * 10 ) / 10 } ETH</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                              </span>

                          </div>

                      </div>

                      <div className="button bg-[#553CDF] p-2 rounded-[3px] cursor-pointer w-full text-center" onClick={ () => listforsale("Single", data.index)}>
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
        <div className="p-2 text-sm overflow-x-auto mt-20">

        <div className="font-meduim text-lg mb-5">Recent Transactions</div>

          <div className="bg-[#18181C]  pb-10 p-4 rounded-[5px] shadow-sm overflow-x-auto">

            { user.Transactions == 0

             ?
             <>
               Empty transactions
             </>

             :

              <table className="divide-y divide-gray-700 w-full text-sm text-left text-gray-500">
                {/* Table start */}
                    <thead className="  px-5 fonts uppercase">
                        <tr>
                            <th scope="col" className="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Event
                            </th>
                            <th scope="col" className="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Type
                            </th>
                            <th scope="col" className="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Price
                            </th>
                            <th scope="col" className="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Date
                            </th>
                            <th scope="col" className="text-xs font-medium tracking-wider text-left py-4 px-5 fonts">
                                Buyer
                            </th>                            
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                      { user.Transactions.map((data, index) => (
                          <tr className="hover:bg-gray-900 border-b border-gray-700" key={index} >
                            <td className="py-4 px-6 text-sm font-medium">{data.event}</td>
                            <td className="py-4 px-6 text-sm font-medium">{data.musicType}</td>
                            <td className="py-4 px-6 text-sm font-medium">{data.price} ETH</td>
                            <td className="py-4 px-6 text-sm font-medium">11/12/2023</td>
                            <td className="py-4 px-6 text-sm font-medium">{data.otherparty}</td>                            
                          </tr>
                      ))

                      }

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
  const {Dashboard} = params;

  const user = await fetch(`https://streamifibackend.fly.dev/user/${Dashboard}`, { method: 'GET' });
  const userInfo = await user.json();




  return {
    props: {
      user : userInfo.users,
    }
  }
  
}