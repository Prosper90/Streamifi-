import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import Contexts from '../context/contextclass';
import Header from './Header';
import Footer from './Footer';
import Collections from './Collections';
import Trendingsongs from './Trendingsongs';
import { ChatTokenOmonics } from '../utils/chatTokenOmics';


export default function Landingpage() {

  //context
  const { pages, setPages } = useContext(Contexts);
  const router = useRouter();

  //Links
  /*
  const nav = () => {
    router.push("/Mintpage/Mint");
    setPages('mint');
}
*/
  return (
    <div className="bg-[#00009999] text-white text-sm h-[100%] flex-col justify-center items-center gap-10">


      {/* Section One */}
      <div className="w-full relative h-[100dvh] md:h-screen bg-no-repeat bg-cover">
        <Header />
        <section className='h-[70dvh] flex items-center'>
          <div className="video-background">
            <video width='auto'
              height='100%'
              autoPlay muted loop
            >
              <source src="/images/WhatsApp Video 2023-03-04 at 11.54.04.mp4" type="video/mp4" />
            </video>

          </div>

          <div className=" pl-10 md:px-24 z-[5555]  ">

            <div className="z-[1000000000]  w-full">
              <div className="font-[800] text-[50px] leading-[60px]">
                DISCOVER AND <br />
                BUY MUSIC FOR LIFE
              </div>
              <div className="font-meduim text-sm pt-3 text-[20px]">Don’t just stream, earn, and succeed with artistes.</div>

              <div className="flex gap-10 mt-4">
                <div className="rounded-[35px] border-2 border-gradient-to-bl from-[#E81CFF] to-[#553CDF] bg-transparent p-3 px-7 cursor-pointer">View market</div>
                <div className="rounded-[35px] border-0 bg-gradient-to-bl from-[#E81CFF] to-[#553CDF] bg-transparent p-3 px-7 cursor-pointer">Join now</div>
              </div>
            </div>


            {/* <img src="/images/landingillustration.png" alt="" className='hidden md:block w-[70%] h-auto absolute z-[1] right-0' /> */}


          </div>

        </section>
      </div>

      {/* Section two */}
      <section className='flex items-center bg-[#0C0F16] justify-center h-[100dvh]'>
        <div id='about' className="relative  flex justify-center items-center z-[99999] ">
          <div className="p-8  bg-[url('/images/ABOUT.png')] bg-no-repeat bg-top -96 bg-contain md:bg-auto flex md:flex-row flex-col  justify-center items-start">

            <div className="flex-flex-col justify-start items-start w-[100%] md:w-[75%] px-0 md:px-20 mt-10">

              <h2 className="tracking-[.5em] md:text-xl text-lg font-sans font-normal text-[#E81CFF]">WHAT‘S Streamifi</h2>
              <p className="md:text-2xl text-lg font-sans font-bold mb-2">The decentralized trading & music streaming <br /> platform on Web 3.0</p>
              <p className="md:text-lg text-base font-sans font-thin">Streamifi brings DeFi and trading to the music industry. It enables creators to tokenize their name/brand, content, and songs; allowing fans to buy, sell, trade and promote these tokens directly in real time on the blockchain while also sharing streaming earnings.</p>


            </div>
            <div className="w-[50vw]">
              <Image width={500} height={500} src="/images/vadim-bogulov--PwZWV5AWV0-unsplash 1.png" alt="music log" />
            </div>

          </div>

        </div>

      </section>


      {/* Section three */}
      <div className=" bg-[#0C0F16] relative flex flex-col justify-center h-[100dvh] items-center z-[99999] ">

        <div className="absolute top-24 flex flex-col items-center">
          <h1 className='tracking-[.5em] md:text-xl text-lg font-sans font-normal text-[#E81CFF]'>Our Top List of Creator</h1>
          <h1 className='tracking-[.1em] md:text-5xl text-xl mt-3 font-sans font-bold '>Top List</h1>
        </div>
        <div className="p-8 bg-[url('/images/TOPLIST.png')] bg-no-repeat bg-top bg-contain md:bg-auto flex justify-center items-center w-full ">
          <div className="flex flex-col justify-center items-center w-[100%]  p-0 md:p-10 mt-10">

            <ul class="flex  p-1 bg-[#000] rounded-full shadow-lg mb-5">
              <li class="nc-NavItem2 relative" data-nc-id="NavItem2">
                <button className="block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full bg-primary-6000 text-primary-50 focus:outline-none bg-[#553CDF]">
                  <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm">
                    <span className="hidden sm:inline-block">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4399 19.05L15.9599 20.57L18.9999 17.53" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>
                    <span>Trending</span>
                  </div>
                </button>
              </li>

              <li className="nc-NavItem2 relative" data-nc-id="NavItem2">
                <button className="block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full text-neutral-6000 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900  focus:outline-none">
                  <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm cursor-pointer">
                    <span className="hidden sm:inline-block">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 19.5H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M16.5 21.5V17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>
                    <span>Top Creators</span>
                  </div>
                </button>
              </li>
            </ul>

            <div className="w-[100%]">
              <Trendingsongs />
            </div>


          </div>

        </div>


      </div>



      {/* Section Four */}
      <div className="bg-[#0C0F16] relative md:h-[100%] ">

        <div className="p-8 bg-[url('/images/NFTCOLLECTIONS.png')] bg-no-repeat bg-top bg-contain md:bg-auto flex justify-center items-center w-full ">

          <div className="flex flex-col justify-center items-center w-[100%] p-5 mt-10">

            <div className="text-[24px] font-semibold text-[#E81CFF] my-5 mb-8">NFT Collections</div>


            <div className="relative flex flex-col p-5 md:p-0 md:flex-row justify-center items-center gap-5 h-auto md:h-auto">
              <Collections />
            </div>

          </div>

        </div>


      </div>


      {/* Section Five */}
      <div className=" bg-[#0C0F16] flex pt-44 md:pt-0 justify-center items-center h-auto md:h-screen">

        <div className="relative bg-[url('/images/ROADMAP.png')] flex-col bg-no-repeat bg-top bg-contain md:bg-auto flex justify-center items-center w-full ">
          <div className="flex flex-col items-center">
            <h1 className='tracking-[.5em] md:text-xl text-lg font-sans font-normal text-[#E81CFF]'>GOALS AND PLANS</h1>
            <h1 className='tracking-[.1em] md:text-5xl text-xl mt-3 font-sans font-bold '>ROADMAP</h1>
          </div>
          <div className="flex flex-wrap my-5 md:mt-24 gap-16 justify-center w-[100%] md:w-[75%] ">

            <div className="flex flex-col items-center">
              <h1 className='md:text-xl text-lg mb-3 font-sans font-bold '>Phase <span className="text-[#E81CFF]">01.</span></h1>
              <div className="border border-[#E81CFF] rounded-md p-5 ">
                <p className='md:text-base text-sm font-sans font-normal'>- Ideation/structure formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Core team formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Market research
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className='md:text-xl text-lg mb-3 font-sans font-bold '>Phase <span className="text-[#E81CFF]">02.</span></h1>
              <div className="border border-[#E81CFF] rounded-md p-5 ">
                <p className='md:text-base text-sm font-sans font-normal'>- Ideation/structure formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Core team formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Market research
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className='md:text-xl text-lg mb-3 font-sans font-bold '>Phase <span className="text-[#E81CFF]">03.</span></h1>
              <div className="border border-[#E81CFF] rounded-md p-5 ">
                <p className='md:text-base text-sm font-sans font-normal'>- Ideation/structure formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Core team formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Market research
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className='md:text-xl text-lg mb-3 font-sans font-bold '>Phase <span className="text-[#E81CFF]">03.</span></h1>
              <div className="border border-[#E81CFF] rounded-md p-5 ">
                <p className='md:text-base text-sm font-sans font-normal'>- Ideation/structure formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Core team formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Market research
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className='md:text-xl text-lg mb-3 font-sans font-bold '>Phase <span className="text-[#E81CFF]">04.</span></h1>
              <div className="border border-[#E81CFF] rounded-md p-5 ">
                <p className='md:text-base text-sm font-sans font-normal'>- Ideation/structure formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Core team formation</p>
                <p className='md:text-base text-sm font-sans font-normal'>- Market research
                </p>
              </div>
            </div>


          </div>

        </div>


      </div>





      {/* Section six */}
      <div className="relative bg-[#0C0F16] flex justify-center items-center z-[99999] h-[70%] md:h-[100%]">

        <div className="p-8 md:mt-[80px] bg-[url('/images/TOKENOMICS.png')] bg-no-repeat bg-top bg-contain md:bg-auto flex justify-center items-center w-full ">

          <div className="flex flex-col justify-center items-center p-0 mt-10">

            <ChatTokenOmonics/>

          </div>

        </div>


      </div>



      {/* Section seven */}
      <div className="relative bg-[#0C0F16] flex justify-center items-center z-[99999] h-[70%] md:h-[100%]">

        <div className="p-8 md:mt-[80px] bg-[url('/images/GAMES.png')] bg-no-repeat bg-top bg-contain md:bg-auto flex justify-center items-center w-full ">

          <div className="flex flex-col justify-center items-center w-[100%] md:w-[75%] p-20 mt-10">

            <ul class="flex  p-1 bg-[#000] rounded-full shadow-lg mb-5">
              <li class="nc-NavItem2 relative" data-nc-id="NavItem2">
                <button className="block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full bg-primary-6000 text-primary-50 focus:outline-none bg-[#553CDF]">
                  <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm">
                    <span className="hidden sm:inline-block">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4399 19.05L15.9599 20.57L18.9999 17.53" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>
                    <span>Trending</span>
                  </div>
                </button>
              </li>

              <li className="nc-NavItem2 relative" data-nc-id="NavItem2">
                <button className="block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full text-neutral-6000 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900  focus:outline-none">
                  <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm cursor-pointer">
                    <span className="hidden sm:inline-block">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 19.5H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M16.5 21.5V17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </span>
                    <span>Top Creators</span>
                  </div>
                </button>
              </li>
            </ul>



          </div>

        </div>


      </div>


      <Footer />

    </div>
  )
}
