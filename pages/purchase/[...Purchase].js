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
      } = useContext(Contexts);



      useEffect(() => {

      }, [])
      
  

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
