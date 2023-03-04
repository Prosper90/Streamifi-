import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../context/contextclass';
import { ethers } from 'ethers';
import { shortenAddress } from '../utils/trauncate';
import { ContractAddress, contractABI, chainBSC, chainPolygon, chainArbitrum } from '../utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Notifiy from '../Notifier/Notifiy';
import Image from 'next/image';



export default function Header() {


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
          userData,
          setUserdata
        } = useContext(Contexts);

    //router
    const router = useRouter();

    const [nav, setNav] = useState(false);





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
                return;
              }
            }
          
    };

    //connect
    const connect = async (providerarg) => {

        if(chain == chainBSC) {
          correctChain(chainBSC);
        } else if(chain == chainPolygon) {
          correctChain(chainPolygon);
        } else if(chain == chainArbitrum) {
          correctChain(chainArbitrum);
        }

        if(window.ethereum) {
          await providerarg?.send("eth_requestAccounts", []);
        }
          const another = await new ethers.providers.Web3Provider(window.ethereum);
          //set and get signer
          const signer = await another.getSigner();
          setSigner(signer);
          //get and set address
          const address = await signer.getAddress();
          setAddress(address)
          //set chain
          setChain(await signer.getChainId());
          //setModalWallet(false);
          //check to see if this account is on the backend if not create an account
          
          const user = await fetch(`backend/user/${address}`, { method: 'GET' });
          const userInfo = await user.json();
          if(userInfo) {
            setUserdata(userData);
          }
          
          if(!userInfo) {
            //create user 
            //backend route https://streamifibackend.fly.dev/
            const createUser = await fetch(`https://streamifibackend.fly.dev/user`, 
            {
              method: 'POST',   
               headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
             },
             body: JSON.stringify({ address: address, creator: false})
           });
           
            const checkSuccess = await createUser.json();
            await checkSuccess.wait();
            //show new user notification and activate tutorial

            setNotify(true);
            setNotifyType("Success")
            setNotifyMsg(`Welcome ${shortenAddress(address)}`);            
          }
          
          
          return;
      }




      const goto = (link) => {

        /*if(!address){
            setNotify(true);
            setNotifyType("warn")
            setNotifyMsg("Please connect your wallet to proceed");
            return ;
          }
          */
    
    
          router.push(link);
          
      }


      useEffect(() => {
       //persist
        if(address) {
            connect(provider);
        }
        
        if(chain) {
          correctChain(chain);
        }
      }, [])
      


  return (
    <div className='relative p-5 md:p-10 flex justify-between items-center text-white text-sm'>

        <div className="">
            <Image height={30} width={30} src="/images/logo.png" alt="logo" />
        </div>
          
        {/* Right */}
        <div className={` md:flex md:justify-center transition-all md:items-center md:gap-20 ${nav ? "flex flex-col bg-[#0C0F16] justify-center items-center fixed top-0 left-0 w-screen z-[9999] py-44" : "hidden"} `}>
               <button onClick={() => setNav(!true)} className='absolute md:hidden top-12 right-16 text-2xl'>&times;</button>
            <div className="flex flex-col items-center md:flex-row md:justify-center gap-10">
               <div className="hover:text-[#553CDF] cursor-pointer" onClick={() => goto("/mintpage/Mint") }>Create</div>
               <div className="hover:text-[#553CDF] cursor-pointer" onClick={() => goto("/marketplace/Marketplace")}>marketPlace</div> 
               <div className="hover:text-[#553CDF] cursor-pointer" onClick={() => goto(`/dashboard/${address}`)}>Dashboard</div>
               <Link href="#about"> <div className="hover:text-[#553CDF] cursor-pointer">About Us</div> </Link>
            </div>

            <button className="bg-[#553CDF] rounded-[20px] md:mt-0 mt-8 p-2 cursor-pointer px-7" onClick={ () => connect(provider) }>
               {address ? shortenAddress(address) : "Connect" } 
            </button>

        </div>

          <button className=' p-1 flex items-center md:hidden border rounded-md border-[#ffffff1a]'> <Image height={10} width={10} src="/images/icons8-menu-rounded-50.png" alt="menu" className='h-6 w-12 ' onClick={() => setNav(true)} />  </button>
            

            {  notify &&
                <Notifiy />
            }


    </div>
  )
}
