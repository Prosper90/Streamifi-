import React, {useState, useEffect, useContext} from 'react';
import Album from '../../components/purchase/Album';
import Single from '../../components/purchase/Single';
import Contexts from '../../components/context/contextclass';
import { ethers } from 'ethers';

export default function Purchase() {
  
  
      //context and states
      const { 
        provider, 
        address, 
        notify, 
        setNotify, 
        notifyType,
        setNotifyType,
        notifyMsg,
        setNotifyMsg,
        typeSelected,
        setTypeSelected,
        manualChain
      } = useContext(Contexts);



      useEffect(() => {

        if(!address){
          setNotify(true);
          setNotifyType("warn")
          setNotifyMsg("Expired connect your wallet to proceed");
          
          router.push('/');
        }

      }, [manualChain])
      
  

  return (
    <>
      {
        typeSelected == "Album" ?
        <Album />
        :
        <Single />
      }
      

    </>
  )
}
