import React, {useState, useEffect, useRef} from 'react';




export default function Recent({recent, playSong, formatDurationTwo}) {

  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
    }
  }, [recent]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center overflow-x-hidden overflow-y-auto h-[300px] w-[100%]">
      {
        recent.map((data, index) => (
          <div 
            className="flex justify-between p-2 pr-8 rounded-[5px] items-center cursor-pointer w-full" 
            style={{background: "rgba(217, 217, 217, 0.11)"}}
            key={index} 
          >
            <audio ref={audioRef} src={data.uri} hidden/>
            {/* Left */}
              <div className="flex justify-start items-center gap-4">
              <span>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                      >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                      </svg>              
              </span>
              <span className="flex justify-center items-center" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                  <img src={data.imguri} alt="image" className='w-[35px] p-[3px]' />
              </span>
              <div className="flex flex-col">
                  <span> {data.songname} </span>
                  <span className='text-xs font-thin'> {data.artist} </span>
              </div>
      
              </div>
      
              {/* Right */}
              <div className="">
               {formatDurationTwo(duration)}
              </div>
          </div>
        ))
      }
    </div>

  )
}
