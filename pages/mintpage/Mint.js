import React,{ useState, useEffect, useContext} from 'react';
import Topinfo from '../../components/infoheader/Topinfo';
import Contexts from '../../components/context/contextclass';
import { ContractAddress, contractABI, chainID } from '../../components/utils/constants';
import { ethers } from 'ethers';
import Select from '../../components/mintLayers/Select';
import Upload from '../../components/mintLayers/Upload';
import Forms from '../../components/mintLayers/Forms';
import Smallpreloader from '../../components/preloader/Smallpreloader';



export default function Mint() {

      /* global BigInt */

    //context and states
    const { 
      provider, 
      setProvider, 
      address,  
      setNotify, 
      setNotifyType,
      setNotifyMsg,
      userData,
      manualChain,
      smallLoad,
      setSmallLoad
    } = useContext(Contexts);
      const [bnblife, setBnblive] = useState();
      const [inputdataone, setInputdataone] = useState("0");
      const [inputdatatwo, setInputdatatwo] = useState("0");
      //for progress
      const [progress, setProgress] = useState('home');
      const [selected, setSelected] = useState();
      const [uploaded, setUploaded] = useState(false);
      //uris and urls values
      //for singles
      const[singleImg, setSingleImg] = useState();
      const [singleSongs, setSingleSongs] = useState();
      //for Albums
      const[AlbumImg, setAlbumImg] = useState();
      const [AlbumSongs, setAlbumSongs] = useState();

      

      //get Live price
      const getPrice = async() => {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD");
        var data = await response.json();
        setBnblive(data.USD);
       }


      //get contract instance
      const getContract = async () => {
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer =  temporalProvider.getSigner();
        return new ethers.Contract(ContractAddress, contractABI, signer);
      }


      const isUrl = (string) => {
        try { return Boolean(new URL(string)); }
        catch(e){ return false; }
      }

      //mint Single
      const mintsingle = async (e) => {
        e.preventDefault();
         if(address) {

          const copies = e.target.copies.value;
          const songName = e.target.musicName.value;
          const artist = e.target.artist.value;
          const musiuri = e.target.musiuri.value;
          const imageuri = e.target.imageuri.value;
          const reformat = ethers.utils.parseEther(inputdatatwo);
  
  
            //checking for correct data input
  
            if( copies == "" || songName == "" || artist == "" || musiuri == "" || imageuri == "" || inputdatatwo == "0") {
              setNotify(true);
              setNotifyType("warn")
              setNotifyMsg("Fill the complete form");
              return ;
            }
            
  
            if(!isUrl(musiuri) || !isUrl(imageuri)) {
              setNotify(true);
              setNotifyType("warn")
              setNotifyMsg("Link should be Live and formatted properly");
              return ;
            }
            
  

          try {
            setSmallLoad(true);
            const Contract = await getContract();
            const addSingle = await Contract.addSingle(copies, songName, artist, musiuri, imageuri, reformat);
            await addSingle.wait();
            setSmallLoad(false);
          } catch (error) {
            setNotify(true);
            setNotifyType("warn");
            setNotifyMsg("You cancelled the transaction");                
          }
  

            //update user to creator if they were not
            //backend route https://streamifibackend.fly.dev/
            if(!userData.creator){
              //console.log(checkseller);
                  const create = await fetch(`https://streamifibackend.fly.dev/user/create/${address}`, 
                  {
                      method: 'POST',   
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ address: address})
                  }
              );
              await create.json();
          }
  

            setNotify(true);
            setNotifyType("Success")
            setNotifyMsg("Successfully Minted");
            return ;
        
  
         } else {
  
          setNotify(true);
          setNotifyType("warn")
          setNotifyMsg("Connect Wallet");
          return ;
  
         }
  
      }




      //mint Album
      const mintalbum = async (e) => {
        e.preventDefault();
        if(address) {

          const songNames = e.target.musicNames.value;
          const songput = songNames.split(",");

          const artists = e.target.artists.value;
          const artistput = artists.split(",");

          const musiuris = e.target.musiuris.value;

          const imageuri = e.target.imageuri.value;

          const copies = e.target.copies.value;

          //const price = e.target.priceone.value;

          const reformat = ethers.utils.parseEther(inputdataone);
          console.log(reformat);
          


          //checking for correct data input

          if(songNames == "" || artists == "" || musiuris == "" || imageuri == "" || inputdataone == "0") {
            setNotify(true);
            setNotifyType("warn");
            setNotifyMsg("Form should not be empty");
            return;
          }
          

          if(songput.length == 1 || artistput.length == 1) {
              setNotify(true);
              setNotifyType("warn");
              setNotifyMsg("Data should be more than one");
              return;
          }

          if(!isUrl(musiuris) || !isUrl(imageuri)) {
            setNotify(true);
            setNotifyType("warn");
            setNotifyMsg("Link should be live and formatted properly");
            return;
          }
          
          try {
            setSmallLoad(true);
            const Contract = await getContract();
            const mintAlbum = await Contract.addAlbum( copies, songput, artistput, musiuris, imageuri, reformat );
            await mintAlbum.wait();
            setSmallLoad(false);          
          } catch (error) {
            setNotify(true);
            setNotifyType("warn");
            setNotifyMsg("You cancelled the transaction");            
          }



          //update user to creator if they were not
          if(!userData.creator) {
              //console.log(checkseller);
                  const create = await fetch(`https://streamifibackend.fly.dev/user/create/${address}`, 
                  {
                      method: 'POST',   
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({address: address})
                  }
              );
              await create.json();
          }



          setNotify(true);
          setNotifyType("Success")
          setNotifyMsg("Successfully Minted");
          return ;


        } else {
          setNotify(true);
          setNotifyType("warn");
          setNotifyMsg("Connect Wallet");
        }

    }


      const handleChangeone = (e) => {       
        const converted = (e.target.value/bnblife) * 1;
        setInputdataone((converted).toFixed(4));
      }
    
  
      const handleChangetwo = (e) => {
        const converted = (e.target.value/bnblife) * 1;
        setInputdatatwo((converted).toFixed(4));
      }



      const pages = () => {
        switch (progress) {
          case "home":
            return <Select
            setSelected={setSelected}
            setProgress={setProgress}
            selected={selected}
            />;
          case "upload":
            return <Upload
            selected={selected}
            setProgress={setProgress}
            setUploaded={setUploaded}
            //for uris
            setSingleImg={setSingleImg}
            setSingleSongs={setSingleSongs}
            setAlbumImg={setAlbumImg}
            setAlbumSongs={setAlbumSongs}
            />;
          case "form":
            return <Forms
            selected={selected}
            mintalbum={mintalbum}
            inputdataone={inputdataone}
            handleChangeone={handleChangeone}
            mintsingle={mintsingle}
            inputdatatwo={inputdatatwo}
            handleChangetwo={handleChangetwo}
            //for uris
            singleImg={singleImg}
            singleSongs={singleSongs}
            AlbumImg={AlbumImg}
            AlbumSongs={AlbumSongs}
             />;
          default:
            break;
        }
      }



      useEffect(() => {

        getPrice();

      }, [manualChain])
      

  return (
    <div className='h-full text-[#fff]'>

        <div className="w-full">
           <img src="/images/mintimage.png" alt="mintImage" />
        </div>

        <div className="w-full relative">
          {
            smallLoad && 
            <Smallpreloader />
           }

          <div className="m-3 text-center">Mint</div>

          { pages() }

          <div className="w-full flex justify-center items-center pb-[55px]  md:p-[20px]">
             { progress === "home" ?
                <div className={`${ selected ? "opacity-100" : "opacity-25" } cursor pointer bg-[#553CDF] rounded-[5px] p-5 text-center w-[100px] h-[46px] pt-[11px]`}
                onClick={() => setProgress("upload") } >proceed</div>
              :
              progress === "upload" &&
                <div className={`${ uploaded ? "opacity-100" : "opacity-25" } cursor-pointer bg-[#553CDF] rounded-[5px] p-5 text-center w-[100px] h-[46px] pt-[11px]`}
                onClick={() => setProgress("form") } >proceed</div>
             }
          </div>

        </div>
        
    </div>
  )
}
