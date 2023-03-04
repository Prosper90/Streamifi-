import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../components/context/contextclass';
import Landingpage from '../components/landingPage/Landingpage';


export default function Home() { 


  //context
  const {pages} = useContext(Contexts);



    useEffect(() => {
      console.log("Called index");
    }, [])


  return (
    <>
     <Landingpage />
    </>
  )
}
