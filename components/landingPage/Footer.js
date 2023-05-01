import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className='w-full'>
      
      <div className="p-8 pt-14  bg-[#000] text-white text-sm h-[100dvh] md:h-[250px] flex flex-col justify-around items-start md:flex-row md:justify-around md:items-start">


      <div className="flex flex-col gap-2">
        <div className="mb-2 flex items-end gap-[2px]">
            <Image height={30} width={50} src="/images/logo.svg" alt="logo" /><span className='text-lg font-bold'>Streamifi</span>
        </div>
        <div className="w-[70%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequuntur.</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mb-2 font-bold text-lg">Streamifi</div>
        <div className="">Docs</div>
        <div className="">News and Updates</div>
        <div className="">Future</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mb-2 font-bold text-lg">Resources</div>
        <div className="">whitepaper</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mb-2 font-bold text-lg">Info</div>
        <div className="">Email</div>
      </div>

    </div>


    </div>
  )
}
