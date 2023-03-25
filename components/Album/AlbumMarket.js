import React,{useState, useEffect, useContext} from 'react';
import { ContractAddress, contractABI, chainBSC, chainPolygon, chainArbitrum } from '../../components/utils/constants';
import { useRouter } from 'next/router';
import Contexts from '../context/contextclass';
import { ethers } from 'ethers';
import Link from 'next/link';
import Image from 'next/image';

export default function AlbumMarket({albums}) {

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
        setTypeSelected,
        selectedSingle,
        setSelectedSingle,
        singleList,
        setSingleList,
        selectedAlbum,
        setSelectedAlbum,
        manualChain
      } = useContext(Contexts);



    //router
    const router = useRouter();

      const Select = (data) => {
          setTypeSelected("Album");
          setSelectedAlbum(data);
          router.push(`/purchase/${data.Albummarketplace[0].id}`);
      }



      const getDate = (ama) => {
        const dateama = new Date(parseInt(BigInt(ama)) * 1000);
  
        //For the date string part of it
        const dateNumber = dateama.getDate();
        const monthNumber = dateama.getMonth() + 1;
        const yearNumber = dateama.getFullYear();
        const dateString = `${dateNumber}/${monthNumber}/${yearNumber}`;
        //const finalDateString = [dateString, timeString].join(" ");
        return dateString;
    
     }

      useEffect(() => {

      }, [albums])
      

  return (
         <>
          {/* Items */}
          {
          albums?.map((data, index) => (
                <div className="bg-[#211F27] rounded-[5px] cursor-pointer" key={index} onClick={() => Select(data)}>
                  {/* Top */}
                  <div className="flex justify-center items-center rounded-[5px] p-2" style={{background: "linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)", backdropFilter: 'blur(20px)'}}>
                     <img src={ data.Albummarketplace[0].imguri } alt="sample" className='w-[50%]' />
                  </div>
    
                  {/* Bottom */}
                  <div className="flex flex-col gap-3 p-3 text-[10px]">
                      {/* Top */}
                      <div className="flex justify-between "> 
                         <div className="">
                           <div>{ data.Albummarketplace[0].songname }</div>
                           <div>Album by { data.Albummarketplace[0].artist } </div>
                         </div>
    
                         <div className="">
                            <span>{ getDate(data.Albummarketplace[0].date) }</span>
                         </div>
                      </div>
                      {/* Bottom */}
                      <div className="flex justify-between">
                         <div className="flex justify-center items-center">
                           <span>Price: { Math.round( (data.Albummarketplace[0].cost / 10 )  * 10 ) / 10**18  } {manualChain == chainBSC ? "bnb" : manualChain == chainPolygon ? "matic" : "eth"} </span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
                         </div>
    
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
                 </div>
           ))            
          }         
           
        </>
  )
}
