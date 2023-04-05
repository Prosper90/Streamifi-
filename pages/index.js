import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../components/context/contextclass';
import Landingpage from '../components/landingPage/Landingpage';
import Notifiy from '../components/Notifier/Notifiy';
import Smallpreloader from '../components/preloader/Smallpreloader';


export default function Home({users}) { 


    //context and states
    const { 
      smallLoad,
      setSmallLoad
    } = useContext(Contexts);


    useEffect(() => {
      console.log("Called index");
    }, [])


  return (
    <>
     {
      smallLoad ?
      <Smallpreloader />
      :
      <Landingpage
      users={users}
     />
     }
    </>
  )
}




export async function  getServerSideProps(context) {

  const user = await fetch(`https://streamifibackend.fly.dev/user`, { method: 'GET' });
  const userInfo = await user.json();




  return {
    props: {
      users : userInfo,
    }
  }
  
}