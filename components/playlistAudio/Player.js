import React, {useEffect, useState, useRef} from 'react';
import Audio from './Audio';
import { useRouter } from 'next/router';

export default function Player({ currentSong, setSongEnd }) {


    //router
    const router = useRouter();

    console.log(currentSong?.uri, "song uri");


  return (
    <div className={`flex flex-col items-center justify-center gap-1 `} >
        {/* Top */}
      <div className={`flex flex-col gap-1 justify-center items-center`}>
         <div className="font-meduim"> {currentSong?.name} </div>
         <div className="font-thin text-xs"> {currentSong?.artist} </div>
      </div>

        {/* Bottom */}
       <Audio 
         song={currentSong?.uri}
         setSongEnd={setSongEnd}
        />
    </div>
  )
}
