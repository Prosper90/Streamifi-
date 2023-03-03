import React, {useState, useEffect, useContext} from 'react';
import Album from '../../components/purchase/Album';
import Single from '../../components/purchase/Single';
import Contexts from '../../components/context/contextclass';
import { ethers } from 'ethers';

export default function Purchase() {
  
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
        setTypeSelected,
        selectedSingle,
        setSelectedSingle,
        singleList,
        setSingleList,
        selectedAlbum,
        setSelectedAlbum
      } = useContext(Contexts);



      useEffect(() => {

      }, [])
      
  

  return (
    <>

      <Single />

    </>
  )
}
