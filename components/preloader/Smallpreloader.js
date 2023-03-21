import React, {useContext} from 'react';
import Contexts from '../context/contextclass';
import ClipLoader from "react-spinners/ClipLoader";


export default function Smallpreloader() {
  
  const {
    smallLoad
  } = useContext(Contexts);

  const colorAdd = "#553CDF"

  return (
    <div className='absolute flex justify-center items-center p-4 opacity-25 w-[100%] h-[100%]' style={{backgroundColor : 'rgb(0, 0, 0, 5)'}}>
       <ClipLoader
            loading={smallLoad}
            color={colorAdd}
            size={70}
       />
    </div>
  )
}
