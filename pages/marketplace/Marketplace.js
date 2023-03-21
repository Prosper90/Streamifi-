import React, {useState, useEffect, useContext} from 'react';
import AlbumMarket from '../../components/Album/AlbumMarket';
import SingleMarket from '../../components/Single/SingleMarket';
import { ContractAddress, contractABI, chainID } from '../../components/utils/constants';
import { ethers } from 'ethers';
import Contexts from '../../components/context/contextclass';

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
  console.log(data);
  setAlbums(data);
}


const getSingle = async () => {
  const contract = await getContract();
  const data = await contract.getSinglesmarket();
  setSingle(data);
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

          <div className="flex justify-center gap-3">
           { albums ?
                <AlbumMarket albums={albums} />
             : 
               <div className="">Empty Market</div>
           }
            
          </div>

        </div>

       {/* Singles */}
        <div className="flex flex-col gap-3">
          <div className="">On Sale Singles</div>

          <div className="flex justify-center gap-3 ">
         
          
          { single ?
            single.map((data, index) => {
             if(data.sale) {
              return (
                <SingleMarket data={data} key={index} />
              )
             }
            })
            :
            <div className="">Empty market</div>
           }
  
          </div>

        </div>

     </div>
  )
}
