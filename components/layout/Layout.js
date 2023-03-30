import React, {useState, useEffect} from 'react';
import Contexts from '../context/contextclass';
import Navigation from '../Navigation/Navigation';
import Navigationmobile from '../Navigation/Navigationmobile';
import { useRouter } from 'next/router';
import Topinfo from '../infoheader/Topinfo';
import { ethers } from 'ethers';
import Notifiy from '../Notifier/Notifiy';
import { chainBSC, chainPolygon, chainArbitrum } from '../utils/constants';


export default function Layout({children}) {

    const [pages, setPages] = useState('home');
    const [pageWidth, setPageWidth] = useState();

    //web 3 states
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [chain, setChain] = useState();
    const [notify, setNotify] = useState(false);
    const [notifyType, setNotifyType] = useState();
    const [notifyMsg, setNotifyMsg] = useState();
    const [userData, setUserdata] = useState();
 
    //for selecting musics
    const [typeSelected, setTypeSelected] = useState();
    const [selectedSingle, setSelectedSingle] = useState();
    const [singleList, setSingleList] = useState();
    const [selectedAlbum, setSelectedAlbum] = useState();
    //wallet balance
    const [tokenbalance, setTokenBalance] = useState();
    //our own chain
    const[manualChain, setmanualChain] = useState(chainBSC);
    const [chainChanged, setChainchanged] = useState(false);
    //preloaders
    const[smallLoad, setSmallLoad] = useState(false);
    //market data
    const [albums, setAlbums] = useState();
    const [single, setSingle] = useState();
    const [unfilteredAlbums, setUnfilteredAlbums] = useState();
    const [unFilteredsingle, setUnFilteredSingle] = useState();




    //onload with metamask
    const onLoad = async (data) => {
      const provider = await new ethers.providers.Web3Provider(data);
      setProvider(provider);
   }


    //check for correct chain
    const correctChain = async (id) => {

      try {
        //switch chain
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${Number(id).toString(16)}`,
            }],
        });
        setChainchanged(!chainChanged);
        return;
      } catch (error) {
        if (error === 4902) {
          //add the token or currency to metamask
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(id).toString(16)}`,
                rpcUrls: [
                  " https://data-seed-prebsc-1-s1.binance.org:8545",
                ],
                chainName: "BSC testnet",
                nativeCurrency: {
                  name: "BSC",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: [
                  "https://explorer.binance.org/smart-testnet",
                ],
              },
            ],
          });
          setChainchanged(!chainChanged);
          return;
        }
      }
    
  };


    //useEffect
    useEffect(() => {
      
      if(!window.ethereum) {
          //use wallet connect
          //onLoadTwo();
      } else {
          onLoad(window.ethereum);
      }


      //on account changed
      if(window.ethereum){

        window.ethereum.on('accountsChanged', function (accounts) {
          // Time to reload your interface with accounts[0]!
          setAddress(accounts[0]);
        });
      
      }
      
      if(provider) {
        if(!window.ethereum) {
          // Subscribe to accounts change
          getInstance.on("accountsChanged", async (accounts) => {
              setAddress(accounts[0]);
            });
        }
      }
  

      if(notify) {
        setTimeout(() => {
          setNotify(false);
          setNotifyType("");
          setNotifyMsg("");
        }, 5000);
       }
  
  
      }, [address, chain, notify, chainChanged])
          
  
  


    //router
    const router = useRouter();

    useEffect(() => {
      function handleResize() {
        setPageWidth(window.innerWidth);
      }
        //console.log(window.innerWidth, "innerWidth called");
        window.addEventListener('resize', handleResize);
        setPageWidth(window.innerWidth);



    }, [pageWidth]);



  return (
  <Contexts.Provider value={{
    pages, 
    setPages, 
    provider, 
    setProvider, 
    address, 
    setAddress, 
    signer, setSigner, 
    chain, 
    setChain,
    //notification
    notify,
    setNotify,
    notifyType,
    setNotifyType,
    notifyMsg,
    setNotifyMsg,
    //backend data
    userData,
    setUserdata,
    //for selecting musicType
    typeSelected,
    setTypeSelected,
    selectedSingle,
    setSelectedSingle,
    singleList,
    setSingleList,
    selectedAlbum,
    setSelectedAlbum,
    //wallet info
    tokenbalance,
    setTokenBalance,
    //manual chain
    manualChain,
    setmanualChain,
    //functions
    correctChain,
    //preloaders
    smallLoad,
    setSmallLoad,
    //market data
    albums,
    setAlbums,
    single,
    setSingle,
    unfilteredAlbums,
    setUnfilteredAlbums,
    unFilteredsingle,
    setUnFilteredSingle
    }} >
    {router.pathname === '/' ?

     <>
       {children}
     </>

    :

      <div className='grid grid-cols-5 bg-home h-[100vh] w-full relative'>

        {/* Navigation left side */}
        { pageWidth > 640 ?
          <div className=" bg-topbg row-span-full col-span-1 h-full">
            <Navigation />
          </div>
        :
          <div className="fixed bottom-0 w-[100%] h-[45px] p-[10px]">
            <Navigationmobile />
          </div>
        }


        {/* Main page Right */}
        <div className="col-span-full row-span-full sm:col-span-4 md:col-span-4 h-full overflow-y-scroll overflow-x-hidden">
          <Topinfo />
          {notify && <Notifiy />}
          {children}
        </div>

      </div>     

    }
   </Contexts.Provider>
  )
}
