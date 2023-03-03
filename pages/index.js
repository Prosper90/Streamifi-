import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../components/context/contextclass';
import Dashboard from '../pages/dashboard/Dashboard';
import Marketplace from '../pages/marketplace/Marketplace';
import Mint from '../pages/mintpage/Mint';
import Landingpage from '../components/landingPage/Landingpage';


export default function Home() { 


  //context
  const {pages} = useContext(Contexts);

  const pageActive = () => {
        switch (pages) {
            case 'mint':
                return <Mint />
            case 'marketplace':
                return <Marketplace />
            case 'dashboard':
                 return <Dashboard />             
            default:
                break;
        }
    }

    useEffect(() => {
      console.log("Called index");
    }, [pages])


  return (
    <>
     <Landingpage />
    </>
  )
}
