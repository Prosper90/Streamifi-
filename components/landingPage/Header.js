import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../context/contextclass';
import { ethers } from 'ethers';
import { shortenAddress } from '../utils/trauncate';
import { ContractAddress, contractABI, chainID } from '../utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Notifiy from '../Notifier/Notifiy';



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

    //connect
    const connect = async (providerarg) => {
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
          }
          
          return;
      }




      const goto = (link) => {

        if(!address){
            setNotify(true);
            setNotifyType("warn")
            setNotifyMsg("Please connect your wallet to proceed");
            return ;
          }
    
    
          router.push(link);
          
      }


      useEffect(() => {
       //persist
        if(address) {
            connect(provider);
        }
      }, [])
      


  return (
    <div className='relative p-5 md:p-10 flex justify-between items-center text-white text-sm'>

        <div className="">
            <img src="/images/logo.png" alt="logo" />
        </div>
          
        {/* Right */}
        <div className={`hidden md:flex md:justify-center md:items-center md:gap-20 ${nav && "flex flex-col justify-center items-start"} `}>
            
            <div className="flex flex-col items-center md:flex-row md:justify-center gap-10">
               <div className="hover:text-[#553CDF] cursor-pointer" onClick={() => goto("/mintpage/Mint") }>Create</div>
               <div className="hover:text-[#553CDF] cursor-pointer" onClick={() => goto("/marketplace/Marketplace")}>marketPlace</div> 
               <div className="hover:text-[#553CDF] cursor-pointer" onClick={() => goto("/dashboard/Dashboard")}>Dashboard</div>
               <Link href="#about"> <div className="hover:text-[#553CDF] cursor-pointer">About Us</div> </Link>
            </div>

            <div className="bg-[#553CDF] rounded-[20px] p-2 cursor-pointer px-7" onClick={ () => connect(provider) }>
               {address ? shortenAddress(address) : "Connect" } 
            </div>

        </div>

            {
                !nav ? <div className=' p-1 flex items-center md:hidden border rounded-md border-[#ffffff1a]'> <img src="/images/icons8-menu-rounded-50.png" alt="menu" className='h-6 w-12 ' onClick={() => setNav(true)} />  </div> :
                    <div className=' p-1 flex items-center md:hidden border rounded-md border-[#ffffff1a]' onClick={() => setNav(!true)}> <img src="/images/icons8-menu-rounded-50.png" alt="menu" className='h-6 w-12' /> </div>
            }

            {  notify &&
                <Notifiy />
            }


    </div>
  )
}
