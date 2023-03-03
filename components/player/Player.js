import React, {useEffect, useState, useRef} from 'react'; 

export default function Player({ currentSong }) {


  //playing
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  //referrences
  const rangeRef = useRef();  //refference to progress bar
  const thumbRef = useRef(); //refference to thumb

  const audio = useRef();  //referrence to audio player

  const animationRef = useRef(); //refference the animation


  const whilePlaying = () => {
    rangeRef.current.value = audio.current.currentTime;
    rangeRef.current.style.setProperty("width", `${rangeRef.current.value / duration * 100}%`);
    //thumbRef.current.value = audio.current.currentTime; 
    setCurrentTime(rangeRef.current.value );
    
    animationRef.current = requestAnimationFrame(whilePlaying);
  }



  const calculateTime = (secs) => {
   const minutes = Math.floor(secs/60);
   const returedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
   const seconds = Math.floor(secs/60);
   const returedSeconds = minutes < 10 ? `0${seconds}` : `${seconds}`;
   return `${returedMinutes}:${returedSeconds}`
  }


  const changeRange = () => {
    audio.current.currentTime = rangeRef.current.value;
    rangeRef.current.style.setProperty("width", `${rangeRef.current.value / duration * 100}%`);
    setCurrentTime(rangeRef.current.value );    
  }

  const backThirty = () => {
    rangeRef.current.value = Number(rangeRef.current.value) - 30;
    changeRange()
  }

  const forwardThirty = () => {
    rangeRef.current.value = Number(rangeRef.current.value) + 30;
    changeRange()
  }

 
  const play = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if(!prevValue) {
      audio.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }




  useEffect(() => {
    //new values
    const seconds = Math.floor(audio.current.duration);
    rangeRef.current.max = seconds;
    setDuration(seconds);


  }, [audio?.current?.loadedmetadata, audio?.current?.readyState]);

  useEffect(() => {
   console.log("Tracking them");
  }, [currentTime])
  
  


  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-3'>
        {/* Top */}
      <div className="flex flex-col gap-2">
         <div className="font-meduim"> Monster</div>
         <div className="font-light">Eminem</div>
      </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 w-[250px]">

           <div className="w-full flex flex-col gap-2">
            {/* Line reader */}

            {/* Slider Container */}
            <div className="containerAll" >
              {/*  progress bar
                <div className={`bg-[#00ff00] absolute z-20 h-[50px] w-[${rangeRef?.current?.value / duration * 100}%] h-auto`} ></div>
              */}
              {/* thumb */}
                <input type='range' defaultValue='0' className="thumb cursor-pointer" ref={rangeRef} onChange={changeRange} />

                {/* <input type="range"   step={0.01} className='range'  /> */}
                <audio ref={audio} src={currentSong.uri} preload='metadata' ></audio>
            </div>

            {/* time start - time end */}
            <div className="flex justify-between">
                <span> {calculateTime(currentTime)} </span> <span> { (duration && !isNaN(duration)) && calculateTime(duration) } </span>
            </div>
           </div>

           {/* controls */}
           <div className="flex justify-center gap-2" onClick={()=> backThirty()}>
              <div className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-[#553CDF]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                </svg>                
              </div>
              
              
              { isPlaying ?

                <div className="cursor-pointer" onClick={() => play()} >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 fill-[#553CDF]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                </div>                  
              :

                <div className="cursor-pointer" onClick={() => play()} >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-[#553CDF]" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                </div>               
              }


               <div className="cursor-pointer" onClick={() => forwardThirty()}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-[#553CDF]" >
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                 </svg>
               </div>

           </div>

        </div>
    </div>
  )
}
