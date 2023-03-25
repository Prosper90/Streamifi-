import React, {useEffect, useState, useRef} from 'react';
import Audio from './Audio';

export default function Player({ currentSong, name, artist }) {





  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-3'>
        {/* Top */}
      <div className="flex flex-col gap-2">
         <div className="font-meduim"> {name} </div>
         <div className="font-light"> {artist} </div>
      </div>

        {/* Bottom */}
       <Audio song={currentSong} />
    </div>
  )
}
