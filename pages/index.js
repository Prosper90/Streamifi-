import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../components/context/contextclass';
import Landingpage from '../components/landingPage/Landingpage';
import Notifiy from '../components/Notifier/Notifiy';


export default function Home({users}) { 




    useEffect(() => {
      console.log("Called index");
    }, [])


  return (
    <>
     <Landingpage
      users={users}
     />
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