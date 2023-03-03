import React, {useState, useEffect, useContext} from 'react';
import Player from '../player/Player';
import Contexts from '../context/contextclass';
import { ethers } from 'ethers';
import Link from 'next/link';
import { shortenAddress } from '../utils/trauncate';
import { useRouter } from 'next/router'



export default function Album() {
  
  const [bought, setBought] = useState(true);
      //context and states
      const { 
        provider, 
        setProvider, 
        address, 
        setAddress, 
        notify, 
        setNotify, 
        notifyType,
        setNotifyType,
        notifyMsg,
        setNotifyMsg,
        typeSelected,
        selectedAlbum,
        setSelectedAlbum,
        tokenbalance
      } = useContext(Contexts);
      const [reselect, setReselect] = useState();
      const [owns, setOwns] = useState(false);
      const [seller, setSeller] = useState();
      const [bnblife, setBnblive] = useState();

      const router = useRouter()
      const { id } = router.query;

      //get contract instance
      const getContract = async () => {
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer =  temporalProvider.getSigner();
        return new ethers.Contract(ContractAddress, contractABI, signer);
      }



      const checkOwner = async () => {
          const contract = await getContract();

          let value = id.split(',');
          const idOne = parseInt(value[0]);
          const idTwo = parseInt(value[1]);

          const owner = await contract.owners(idOne, idTwo);
          setSeller(owner);

          if(owner === address) {
            setOwns(true);
          }

      }

    
      const purchase = async (data) => {
        const contract = await getContract();

        let value = id.split(',');
        const idOne = parseInt(value[0]);
        const idTwo = parseInt(value[1]);

        const costset = Math.round( (data.cost/10 ** 18) * 10 ) / 10;
        
        //checks
        if(tokenbalance < costset ) {
            //notifications
            setNotify(true);
            setNotifyType("warn");
            setNotifyMsg("Insufficient funds");
        }


        const buy = await contract.buysellAlbum(idOne, idTwo);
        await buy.wait();

        //backend calls

        //backend route https://streamifibackend.fly.dev/
        //update seller
        const valueAmount = (costset/bnblife) * 1;
        const updateSeller = await fetch(`https://streamifibackend.fly.dev/sold/${seller}`, 
            {
            method: 'POST',   
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: valueAmount, musicType: "Album", otherparty: address })
        });
        
        await updateSeller.json();

        //update buyer
        const updateBuyer = await fetch(`https://streamifibackend.fly.dev/buy/${address}`, 
            {
            method: 'POST',   
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: valueAmount, musicType: "Album", otherparty: seller })
        });
        
        await updateBuyer.json();


            //notifications
            setNotify(true);
            setNotifyType("success");
            setNotifyMsg(`${address} bought an Album`);

      }



      //get Live price
      const getPrice = async() => {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD");
        var data = await response.json();
        setBnblive(data.USD);
       }

      useEffect(() => {

        checkOwner();
        getPrice();
        
      }, [])
      



  return (
    <div className='grid grid-rows-2 gap-4 p-8 text-white' >
      {/* Top */}
      <div className= {`relative bg-[#000] w-[100%] p-5 ${!owns ? "md:grid md:grid-cols-3 gap-3" : 'md:grid md:grid-cols-3 gap-3' } rounded-[5px] text-xs`}>

        {/* For mobile */}
        <div className=" absolute w-[80px] text-center text-[#00ff00] right-3 border-2 border-[#00FF00] rounded-[15px] p-2 font-light cursor-pointer md:hidden">Details</div>

        {/* Left */}
        <div className={`text-white flex flex-col justify-center ${owns ? 'items-center' : 'items-start'}`} >
          {/* Top */}
          <div className="flex justify-center items-center rounded-[10px] p-2 bg-[#D9D9D9] w-[150px]">
              <img src={!reselect ? selectedAlbum[0].imguri : reselect.imguri} alt="sample" className='w-[70%]' />
          </div>

           {/* Changeable */}
           { owns ?
            
            <Player currentSong={!reselect ? selectedAlbum[0] : reselect} />

            :

             <div className="pt-5">

                <div className="font-light">
                  Album by {!reselect ? selectedAlbum[0].artist : reselect.artist}
                </div>

                <div className="flex justify-between items-center pt-3 ">
                  <div className="border-2 border-[#553CDF] rounded-[15px] p-2 font-light cursor-pointer" onClick={ () => purchase(!reselect ? selectedAlbum[0] : reselect) }>Purchase now</div>

                  <div className="">
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
             </div>

           }
           


        </div>


        {/* Seperate Line */}
        <div className="hidden md:block md:h-[220px] md:bg-white md:mt-5 md:ml-2 md:mr-2 md:text-[1px] w-[1.3px] place-self-center">.</div>
        



        {/* Right */}
        <div className="hidden md:flex md:flex-col md:gap-3 md:text-white md:font-light md:text-xs">
          <span>NFT Music</span>

          <div className="flex flex-col">

            <div className="font-medium text-[20px] pt-2 pb-2">Eminem Monster</div>
            <div className="w-[70%]">
              Album by {!reselect ? selectedAlbum[0].artist : reselect.artist}
              this album data is coming from the chain
            </div>

          </div>

          <div className="flex bg-[#553CDF] p-3 rounded-[10px] w-[65%]">
            {/* <div className="">{!reselect ? selectedAlbum.artist : reselect.artist}</div> */}
            <div className="pl-1">
              <div className="font-bold text-md">{!reselect ? selectedAlbum[0].songname : reselect.songname}</div>
              <div className="flex flex-col p-1 ">

              <div className="font-light text-sm flex justify-between p-1">
                <span>Current Owner</span>
                <span>{ shortenAddress(seller) }</span>
              </div>

              <div className="font-light text-sm flex justify-between p-1">
                <span>Creator</span>
                <span>{ shortenAddress(selectedAlbum[0].creator) }</span>
              </div>

              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">

            <div className="flex justify-between">
              <div className="">Release Date:</div>
              <div className="">{!reselect ? selectedAlbum[0].date : reselect.date}</div>
            </div>

            <div className="flex justify-between">
              <div className="">Price:</div>
               <div className="flex justify-center items-center bg-[#553CDF] p-2 rounded-[10px] w-[75px] "> 
                <span className='pr-1'>{!reselect ? Math.round( (selectedAlbum[0].cost/10 ** 18) * 10 ) / 10 : Math.round( (reselect.cost/10 ** 18) * 10 ) / 10 } ETH</span>
                <img src="/images/price.png" alt="price" />
              </div>
            </div>            
            
          </div>

        </div>

      </div>

      {/* Botom */}
      <div className="flex flex-col gap-5 mt-10">
        
        { selectedAlbum.map((data, index) => (

            <div 
                className="flex justify-between p-2 pr-8 rounded-[5px] items-center" 
                style={{background: `${!reselect && index == 0 ? "rgba(217, 217, 217, 0.11)" : reselect && data.id == reselect.id && "rgba(217, 217, 217, 0.11)" }`}} 
                onClick={() => setReselect(data)} 
                >
            {/* Left */}
            <div className="flex justify-start items-center gap-4">
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                    </svg>              
            </span>
            <span className="flex justify-center items-center" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                <img src={data.imguri} alt="image" className='w-[35px] p-[3px]' />
            </span>
            <span>{data.songname}</span>
            </div>

            {/* Right */}
            <div className="">
            2:12
            </div>
        </div>

        ))}

      
      </div>

    </div>
  )
}
