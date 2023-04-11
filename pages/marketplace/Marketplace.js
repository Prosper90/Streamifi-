import React, {useState, useEffect, useContext} from 'react';
import AlbumMarket from '../../components/Album/AlbumMarket';
import SingleMarket from '../../components/Single/SingleMarket';
import { ContractAddress, contractABI, chainID } from '../../components/utils/constants';
import { ethers } from 'ethers';
import Contexts from '../../components/context/contextclass';
import Image from 'next/image';

export default function Marketplace() {


//context info
const {
  address,
  manualChain,
  albums,
  single,
} = useContext(Contexts);

/* global BigInt */



useEffect(() => {

  if(!address){
    setNotify(true);
    setNotifyType("warn")
    setNotifyMsg("Expired connect your wallet to proceed");
    
    router.push('/');
  }

   console.log(single);
}, [manualChain])


  return (
    <div className='grid grid-rows-2 gap-[100px] text-white p-8'>

       {/* Albums */}

        <div className="flex flex-col gap-3">
          <div className="">On Sale Albums</div>

          <div className="flex justify-center items-center gap-3">
           { albums?.length !== 0 ?
                <AlbumMarket albums={albums} />
                :
                <div className="w-[24%] flex justify-center items-center">
                    <img src="/images/empty.svg" alt="illustration"  className='' />
                </div>                
           }
            
          </div>

        </div>

       {/* Singles */}
        <div className="flex flex-col gap-3">
          <div className="">On Sale Singles</div>

          <div className="flex justify-center items-center gap-3">
          { single?.length !== 0 ?

                <SingleMarket single={single} />
               :
               <div className="w-[24%] flex justify-center items-center">
                  <img src="/images/empty.svg" alt="illustration"  className='' />
               </div>   
              }
  
          </div>

        </div>

     </div>
  )
}
