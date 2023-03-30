import React, {useState, useEffect} from "react";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import Playtwo from "./Playtwo";
import Pausetwo from "./Pausetwo";


import useAudioPlayer from './useAudioPlayer';

function Audio({song, route, setSongEnd}) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
  const [mobile, setMobile] = useState();


  function formatDurationTwo(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }


  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth);
      setSongEnd(formatDurationTwo(duration));
    }
      //console.log(window.innerWidth, "innerWidth called");
      window.addEventListener('resize', handleResize);
      setMobile(window.innerWidth);
  }, [mobile]);

  return (

  <div className="flex flex-col gap-3 w-[250px]">


        {/* Line reader */}

        {/* Slider Container */}
      <div className="w-100" >
        {/*  progress bar
            <div className={`bg-[#00ff00] absolute z-20 h-[50px] w-[${rangeRef?.current?.value / duration * 100}%] h-auto`} ></div>
        */}
        {/* thumb 
            <input type='range' defaultValue='0' className="thumb cursor-pointer" ref={rangeRef} onChange={changeRange} />
        */}
        { (route === "/playlist/Playlist" && mobile > 640) &&
          <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
        }
            {/* <input type="range"   step={0.01} className='range'  /> */}
            <audio id="audio" src={song} preload='metadata' ></audio>
        </div>

        {/* time start - time end 
        <div className="flex justify-between">
            <span> {calculateTime(currentTime)} </span> 
            <span> { (duration && !isNaN(duration)) && calculateTime(duration) } </span>
        </div>
      */}


        {/* controls */}
        <div className="flex justify-center gap-2" >
        <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-[#553CDF]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
            </svg>                
        </div>
        
        { (route === "/playlist/Playlist" && mobile > 640)

          ?
          
          <>
          { playing ?

            <Pause handleClick={() => setPlaying(false)} />  :
            <Play handleClick={() => setPlaying(true)} />
                 
          }
          </>

          :

          <>
          { playing ?

            <Pausetwo handleClick={() => setPlaying(false)} />  :
            <Playtwo handleClick={() => setPlaying(true)} />
                 
          }
          </>

        }



            <div className="cursor-pointer" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 fill-[#553CDF]" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
            </svg>
            </div>

        </div>

        </div>    
  );
}

export default Audio;
