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
  manualChain
} = useContext(Contexts);

/* global BigInt */
const getContract = async () => {
  const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
  const signer =  temporalProvider.getSigner();
  return new ethers.Contract(ContractAddress, contractABI, signer);
}

const [albums, setAlbums] = useState();
const [single, setSingle] = useState();


const getAlbums = async () => {
  const contract = await getContract();
  const data = await contract.getAlbumsmarket();
  //setAlbums(data);
  
  const goThrought = data.filter((data) => {
    return data.Albummarketplace[0].sale === true;
  });
  console.log(goThrought);

  setAlbums(goThrought);
  
}


const getSingle = async () => {
  const contract = await getContract();
  const data = await contract.getSinglesmarket();

  const goThrought = data.filter((data) => {
    return data.sale === true;
  });

  setSingle(goThrought);
}


useEffect(() => {
  getAlbums();
  getSingle();
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

          <div className="flex justify-center gap-3 ">
         
          
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
