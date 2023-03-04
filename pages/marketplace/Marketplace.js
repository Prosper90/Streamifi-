import React, {useState, useEffect} from 'react';
import AlbumMarket from '../../components/Album/AlbumMarket';
import SingleMarket from '../../components/Single/SingleMarket';
import { ContractAddress, contractABI, chainID } from '../../components/utils/constants';
import { ethers } from 'ethers';

export default function Marketplace() {

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
}, [])


  return (
    <div className='grid grid-rows-2 gap-[100px] text-white p-8'>

       {/* Albums */}

        <div className="flex flex-col gap-3">
          <div className="">On Sale Albums</div>

          <div className="flex justify-center gap-3">
           { albums ?
              albums.map((data, index) => {
                if(data[0].sale) {
                  return (
                    <AlbumMarket data={data} key={index} />
                   )
                }
             })
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
