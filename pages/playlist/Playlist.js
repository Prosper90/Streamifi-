import React, {useState, useEffect, useContext} from 'react';
import Albumlist from '../../components/playlist/Albumlist';
import Singlelist from '../../components/playlist/Singlelist';
import Recent from '../../components/playlist/Recent';
import Player from '../../components/player/Player';
import Updates from '../../components/playlist/Updates';
import Contexts from '../../components/context/contextclass';
import { ContractAddress, contractABI, chainBSC, chainPolygon } from '../../components/utils/constants';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import  Audio  from '../../components/player/Audio';


export default function Playlist() {
   
    //router
    const router = useRouter();

    //context and states
    const { 
      address,  
      setNotify, 
      setNotifyType,
      setNotifyMsg,
      manualChain,
      unfilteredAlbums,
      unFilteredsingle,
    } = useContext(Contexts);


  const [playlist] = useState(true);
  const [albumList, setAlbumList] = useState();
  const [singleList, setSingleList] = useState();

  const [recent, setRecent] = useState([]);

  const [songend, setSongEnd] = useState();

  //selected music
  const [selected, setSelected] = useState();

  //get contract instance
  const getContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(ContractAddress, contractABI, signer);
  }



  const getowned = async () => {
    const contract = await getContract();

    const ownedlists = await contract.ownList(address);
    var arrAlbum =  unfilteredAlbums.filter((item) => ownedlists.AlbumPlayList.includes(item.Albummarketplace[0].id)) ;
    var arrSingle = unFilteredsingle.filter(({id}) => ownedlists.SinglePlayList.includes(id));

    //now filter arrAlbum again and merge them
    const values = [];
    arrAlbum.map((data) => {
      values.push(data.Albummarketplace);
    });
    //end of arr filter
    if(values.length !== 0) {
        setSelected(values[0]);
      } else {
        setSelected(arrSingle[0]);
      }
      setAlbumList(values);
      setSingleList(arrSingle);
  }


  const playSong = (value) => {
    setSelected(value);
    setRecent(recent => [...recent, value]);
  }



  useEffect(() => {

    getowned();

  }, [])

  

  return (
    <div className=' text-white font-sm w-full grid md:grid-cols-3 gap-3 p-8'>


      {/* Left */}
      <div className=" col-span-4 md:col-span-2 grid grid-row-3 md:grid-rows-2 gap-3 ">

         {/* First layer */}
        <div className="rounded-[10px] bg-transparent flex flex-col justify-center  p-5  md:px-5 gap-3 items-start h-full md:h-[70%] ">
          <div className="font-semibold text-sm">Albums Top</div>
          
          {albumList?.length == 0 ?
             <div className="">Empty collection</div>
          :
            <Albumlist 
              albumList={albumList}
              playSong={playSong}
            />
          }

        </div>


         {/* Second layer */}
         <div className="rounded-[10px] bg-transparent flex flex-col justify-center  p-5  md:px-5 gap-3 items-start h-full md:h-[70%] ">
          <div className="font-semibold text-sm">Singles Top</div>
            
          {singleList?.length == 0 ?
             <div className="">Empty collection</div>
          :
            <Singlelist 
              singleList={singleList}
              playSong={playSong}
            />
          }
        </div>



         {/* Third layer */}
        <div className="p-2 text-sm overflow-x-auto mt-3">
           <div className="font-semibold text-sm flex justify-between pb-4">
            <span>Recently played</span>
            <span className='cursor-pointer'>See all</span>
           </div>        
       
           {
            recent.length == 0
            ?
            <div className="">No collection</div>
            :
            <Recent
              recent={recent}
              playSong={playSong}
            />
           }

        </div>


      </div>




      {/* Right */} 
      <div className=" absolute bottom-14 left-[21px] w-[90%] bg-covertwo flex justify-between p-2 pr-8 rounded-[5px] items-center cursor-pointer md:relative md:p-1 md:col-span-1 md:bg-[#18181C] md:flex md:flex-col md:justify-center md:items-center md:gap-5 md:text-sm md:rounded-[5px] md:mt-7 ">

          {/* First layer */}
          <div className="hidden md:block p-2 text-sm text-center">
             <div className="font-semibold text-md py-5 ">Updates</div>

             <Updates />
          </div>  


          {/* Second layer */}
          <div className=" hidden md:p-2 md:text-sm md:overflow-x-auto">

          </div>



          {/* Third layer  note(border-[1px] border-[#553CDF]) */}
          {
            selected ?
            <>
              <div className=" flex justify-start items-center gap-4  md:p-2 md:text-sm  md:flex md:flex-col md:justify-center md:items-center md:gap-7 md:rounded-[10px] md:w-[90%]">

              <div className="hidden md:block font-semibold text-md pt-5">Now Playing</div>
              <div className="hidden md:bg-mirror md:rounded-[10px] md:shadow-boxshadow md:border-[1px] md:border-boderget md:flex justify-center items-center w-[60%]" >
                <img src="/images/samplemain.png" alt="" />
              </div>
              
              <div className="hidden md:block">
                  <Player 
                    currentSong={selected?.uri} 
                    name={selected?.songname}
                    artist={selected?.artist}
                    />
              </div>


                {/* Mobile section */}
                <span className="block md:hidden" >
                  <Audio 
                    song={selected?.uri}
                    route={router?.pathname}
                    setSongEnd={setSongEnd}
                    />
                </span>
                <span className="flex justify-center items-center md:hidden" style={{background: 'linear-gradient(132.49deg, rgba(240, 235, 234, 0.25) 5.69%, rgba(255, 255, 255, 0.25) 5.69%, rgba(240, 235, 234, 0.24) 86.04%)', backdropFilter : 'blur(20px)'}}>
                    <img src="/images/samplemain.png" alt="image" className='w-[35px] p-[3px]' />
                </span>
                <div className="flex flex-col md:hidden">
                    <span> {selected?.songname} </span>
                    <span className='text-xs font-thin'> {selected?.artist} </span>
                </div>              

            </div>   

            
            <div className="block md:hidden">
              {/* Right */}
              {songend}
            </div>
           </>
           :
           <div className="hidden md:block md:h-[200px]">Empty</div>
          }
            

      </div>
       



       
    </div>
  )
}
