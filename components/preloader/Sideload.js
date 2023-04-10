import React, {useContext} from 'react';
import Contexts from '../context/contextclass';
import BeatLoader from "react-spinners/BeatLoader";


export default function Smallpreloader() {
  
  const {
    sideLoad
  } = useContext(Contexts);

  const colorAdd = "#553CDF"

  return (
    <div className='absolute flex justify-center items-center p-4 w-[100%] h-[100%] opacity-100' style={{backgroundColor : 'rgb(0, 0, 0, 5)'}}>
       <BeatLoader
            loading={sideLoad}
            color={colorAdd}
            size={25}
       />
    </div>
  )
}
