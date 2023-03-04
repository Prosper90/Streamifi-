import React, {useContext, useEffect, useState} from 'react';
import Contexts from '../context/contextclass';
import { shortenAddress } from '../utils/trauncate';
import { ethers } from 'ethers';

export default function Topinfo() {

    //context and states
    const { 
      provider, 
      setProvider, 
      address,
      tokenbalance,
      setTokenBalance,
      setChain
    } = useContext(Contexts);
    
    let chainlinks = {
      bsc: "/images/binance.svg",
      polygon: "/images/polygon.svg",
      arbitrum: "/images/arbitrum.svg"
    }

  const [selectedChain, setSelectedChain] = useState("/images/binance.svg");
  const [choose, setChoose] = useState(false);

  const change = (data, id) => {
    setSelectedChain(data);
    setChoose(false);
  }

      //get balance
  const getBalance = async () => {
    //check if wallet is connected
    if (address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let val =  String(await provider.getBalance(address));
      const reval = Math.round( (parseInt(val)/10 ** 18) * 10 ) / 10;
      setTokenBalance(reval);
    }
  };

  useEffect(() => {
    if(!tokenbalance) {
      getBalance();
    }

  }, [choose])
  

  return (
    <div className='flex justify-between items-center p-7 w-full text-sm text-white'>
        {/* Search */}
         <div className=" hidden md:flex md:bg-[#ffffff0d] md:p-2 md:rounded-[4px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
           <input type="text" className='text-white bg-transparent outline-0 border-0 pl-2' placeholder='Search here' />
         </div>
         
         <div className="md:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
         </div>
        {/* Search */}


        <div className="flex  justify-around items-center gap-7">
            {/* Address */}
              <div className="bg-[#553CDF] text-white p-2 px-5 h-8 text-center">
                {shortenAddress(address)}
              </div>
            {/* Address */}
            
            <div className="flex justify-between items-center gap-3">
                {/* Balance */}
                <div className="flex justify-center items-center gap-[10px] bg-[#2C2D31] w-[102px] h-[30px] p-2">
                  <div className="flex justify-center items-center rounded-[3px] text-center bg-[#1D1E22] w-[31.75px] h-[25px]">
                    <img src="/images/walletbalance.png" alt="" />
                  </div>
                    <div className="text-white text-xs">{tokenbalance} ETH</div>
                </div>
                {/* Balance */}

                {/* chains */}
                <div className={`relative flex flex-col justify-center items-center cursor-pointer ${choose && "bg-[#000] w-[40px]"}`}  >

                  <div className="bg-[#000] p-1 rounded-[100%]" onClick={() => setChoose(true)}>
                    <img src={selectedChain} alt="chain" />
                  </div>

                  <div className={` ${!choose ? "hidden" : "absolute z-10 w-[40px] h-[70px] top-7 bg-[#000] flex flex-col justify-center items-center pt-2 px-[5px]" }  `} >
                    {
                      Object.keys(chainlinks).map((data, index) => {
                        if(chainlinks[data] !== selectedChain) {
                          return (
                            <img src={chainlinks[data]} alt="chain" className='cursor-pointer mb-2' onClick={() => change(chainlinks[data], data) } key={index} />                             
                          )
                        }
                      })
                    }
                  </div>

                </div>

                {/* chains */}
            </div>

        </div>



    </div>
  )
}
