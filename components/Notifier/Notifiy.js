import React, {useContext} from 'react';
import Contexts from '../context/contextclass';

export default function Notifiy() {

  //context and states
  const { 
        notifyType, 
        notifyMsg,
    } = useContext(Contexts);


  return (
    <div className={`absolute ${notifyType == "warn" ?" bg-[#ffcc00] text-[#7a6603]" : "bg-[#28a745] text-[#fff]" } text-sm  shadow-lg text-center p-3  top-2 flex justify-center items-center rounded-[5px]`}>

        {notifyMsg}

    </div>
  )
}
