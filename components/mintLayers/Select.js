import React, {useContext} from 'react';
import Contexts from '../context/contextclass';

export default function Select({setSelected, setProgress, selected}) {

  const {
    tokenbalance,
    setNotify, 
    setNotifyType,
    setNotifyMsg,
  } = useContext(Contexts);

  const selector = (data) => {
    if(tokenbalance <= 0) {
      setNotify(true);
      setNotifyType("warn")
      setNotifyMsg("Address must be funded to proceed");
      return ;      
    }
    setSelected(data);
  }

  return (
    <div className='flex flex-col w-100 gap-[23px] p-[35px]'>
         {/* For album */}
         <div className={`bg-[#18181C] flex flex-col ${selected === "Album" ? "border-[1px] border-[#553CDF]" : "border-none" } p-[10px] rounded-[7px] cursor-pointer`} onClick={() => selector("Album")}>
          <div className="w-full flex justify-between py-3">
            <div className="rounded p-2 border-[1px] border-[#553CDF] text-md font-light">Album</div>

            <input type="radio" />
          </div>
          <div className="text-sm font-light p-[25px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, similique delectus distinctio doloribus cupiditate tenetur reprehenderit, obcaecati, reiciendis excepturi illum odio totam! Error et eveniet officiis vero consequatur iusto voluptatum!
          </div>
         </div>

         {/* For single */}
         <div className={`bg-[#18181C] flex flex-col ${selected === "Single" ? "border-[1px] border-[#553CDF]" : "border-none" } p-[10px] rounded-[7px] cursor-pointer`} onClick={() => selector("Single")} >
          <div className="w-full flex justify-between py-3">
            <div className="rounded p-2 border-[1px] border-[#553CDF] font-light">Single</div>

            <input type="radio" />
          </div>
          <div className="text-sm font-light p-[25px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, similique delectus distinctio doloribus cupiditate tenetur reprehenderit, obcaecati, reiciendis excepturi illum odio totam! Error et eveniet officiis vero consequatur iusto voluptatum!
          </div>
         </div>

    </div>
  )
}
