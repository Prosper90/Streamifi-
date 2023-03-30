import React, {useEffect, useState, useRef} from 'react';
import Audio from './Audio';
import { useRouter } from 'next/router';

export default function Player({ currentSong, name, artist }) {


    //router
    const router = useRouter();


  return (
    <div className={`${router.pathname === "/playlist/Playlist" ? "flex flex-col items-center justify-center gap-1" : "flex flex-col items-center justify-center gap-3 mt-3" }`} >
        {/* Top */}
      <div className={`${router.pathname === "/playlist/Playlist" ? "flex flex-col gap-1 justify-center items-center" : "flex flex-col gap-2" }`}>
         <div className="font-meduim"> {name} </div>
         <div className="font-thin text-xs"> {artist} </div>
      </div>

        {/* Bottom */}
       <Audio 
         song={currentSong}
         route={router.pathname}
        />
    </div>
  )
}
