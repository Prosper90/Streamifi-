import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../context/contextclass';
import { ethers } from 'ethers';
import Link from 'next/link';

export default function SingleMarket({single}) {


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
          setSelectedSingle
        } = useContext(Contexts);
  
  
  
      //router
      const router = useRouter();

      const Select = (data) => {
          setTypeSelected("Single");
          setSelectedSingle(data);
          router.push(`/purchase/${props.data.id}`);
      }


  return (
    <>
         {/* Items */}
         { single.map((data, index) => (
         <div className="bg-[#211F27] rounded-[5px]" key={index} onClick={() => Select(data)}>
             {/* Top */}
              <div className="flex justify-center items-center rounded-[5px] p-2" style={{background: "linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)", backdropFilter: 'blur(20px)'}}>
                <img src="/images/samplemain.png" alt="sample" className='w-[50%]' />
              </div>

              {/* Bottom */}
              <div className="flex flex-col gap-3 p-3 text-[10px]">
                  {/* Top */}
                  <div className="flex justify-between"> 
                    <div className="">
                      <div>Eminem Monster</div>
                      <div>Best of Eminem 2023 Album</div>
                    </div>

                    <div className="">
                        <span>1st may 2023</span>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center">
                    <span>Price: 2 ETH</span> <span className='pl-2'> <img src="/images/price.png" alt="" /> </span>
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
