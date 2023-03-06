import React,{ useState, useEffect, useContext} from 'react';
import Topinfo from '../../components/infoheader/Topinfo';
import Contexts from '../../components/context/contextclass';
import { ContractAddress, contractABI, chainID } from '../../components/utils/constants';
import { ethers } from 'ethers';


export default function Mint() {

      /* global BigInt */

    //context and states
    const { 
      provider, 
      setProvider, 
      address, 
      setAddress, 
      signer, 
      setSigner, 
      chain, 
      setChain, 
      notify, 
      setNotify, 
      notifyType,
      setNotifyType,
      notifyMsg,
      setNotifyMsg,
      userData
    } = useContext(Contexts);
      const [bnblife, setBnblive] = useState();
      const [inputdataone, setInputdataone] = useState("0");
      const [inputdatatwo, setInputdatatwo] = useState("0");


      

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
  
  
          const Contract = await getContract();
          const addSingle = await Contract.addSingle(copies, songName, artist, musiuri, imageuri, reformat);
          await addSingle.wait();
  
  
  
            //update user to creator if they were not
            //backend route https://streamifibackend.fly.dev/
            if(!userData.creator){
              //console.log(checkseller);
                  const create = await fetch(`https://streamifibackend.fly.dev/create/${address}`, 
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
          

          const Contract = await getContract();
          const mintAlbum = await Contract.addAlbum( songput, artistput, musiuris, imageuri, reformat );
          await mintAlbum.wait();


          //update user to creator if they were not
          if(!userData.creator){
              //console.log(checkseller);
                  const create = await fetch(`https://streamifibackend.fly.dev/create/${address}`, 
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


      useEffect(() => {
        getPrice();
      }, [])
      

  return (
    <div className='h-full text-[#fff]'>

        <div className="w-full">
           <img src="/images/mintimage.png" alt="mintImage" />
        </div>

        {/* Mint inputs */}
        <div className=" flex flex-col items-center md:flex-row md:justify-center gap-[70px] p-2 mt-[50px] text-sm ">

          {/* For Albums */}
          <div className=" w-[80%] md:w-[35%]">

            <h3 className='font-medium mb-[29px]'>Mint  Album</h3>

            <form action="flex flex-col bg-white" onSubmit={(e) => mintalbum(e)}>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Music Names' name='musicNames' className='bg-transparent outline-0 border-0' />
                 <img src="/images/headset.png" alt="" />
               </div>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Artist' name='artists' className='bg-transparent outline-0 border-0' />
                 <img src="/images/artist.png" alt="" />
               </div>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Uris' name='musiuris' className='bg-transparent outline-0 border-0' />
                 <img src="/images/uri.png" alt="" />
               </div>

               <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                 <input type="text" placeholder='Image cover' name='imageuri' className='bg-transparent outline-0 border-0' />
                 <img src="/images/image.png" alt="" />
               </div>

               <div className=" relative flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                  {inputdataone && <small className='absolute bottom-6'  >{inputdataone} BNB</small> } 
                 <input type="text" placeholder='Price' className='bg-transparent outline-0 border-0' onChange={(e) => handleChangeone(e)} />
                 <img src="/images/dollar.png" alt="" />
               </div>

               <button className='bg-[#553CDF] text-white rounded-[5px] p-3 w-[150px]' type='submit'>Mint</button>

            </form>

          </div>

          {/* Seperate Line */}
          <div className=" hidden md:block md:h-[400px] md:bg-white md:mt-5 md:ml-7 md:mr-7 md:text-[1px]">.</div>

          {/* For Singles */}
          <div className=" w-[80%] md:w-[35%] h-full">

            <h3 className='font-medium mb-[29px]'>Mint  Singles</h3>

            <form action="flex flex-col gap-3 bg-white" onSubmit={(e) => mintsingle(e)}>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Music Names</div> */}
                <input type="text" name='musicName' placeholder='Music Names' className='bg-transparent outline-0 border-0' />
                <img src="/images/headset.png" alt="" />
              </div>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Artist</div> */}
                <input type="text" placeholder='Artist' name='artist' className='bg-transparent outline-0 border-0' />
                <img src="/images/artist.png" alt="" />
              </div>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Uris</div> */}
                <input type="text" placeholder='Uris' name='musiuri' className='bg-transparent outline-0 border-0' />
                <img src="/images/uri.png" alt="" />
              </div>

              <div className="flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">
                {/* <div className="">Image cover</div> */}
                <input type="text" placeholder='Image cover' name='imageuri' className='bg-transparent outline-0 border-0' />
                <img src="/images/image.png" alt="" />
              </div>

              <div className="relative flex justify-between items-end bg-transparent border-b-2 border-[#333333] mb-8 pb-2">  
                {inputdatatwo && <small className='absolute bottom-6' >{inputdatatwo} BNB</small>} 
                <input type="text" placeholder='Price' className='bg-transparent outline-0 border-0' onChange={(e) => handleChangetwo(e)} />
                <img src="/images/dollar.png" alt="" />
              </div>

              <button className='bg-[#553CDF] text-white rounded-[5px] p-3 w-[150px]' type='submit' >Mint</button>

            </form>

          </div>



        </div>
        
    </div>
  )
}
