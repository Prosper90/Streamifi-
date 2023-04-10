import React, {useState, useEffect, useContext} from 'react';
import Contexts from '../../components/context/contextclass';
import axios from 'axios';

export default function Upload({ selected, setProgress, setUploaded, setSingleImg, setSingleSongs, setAlbumImg, setAlbumSongs }) {



    //context and states
    const { 
      address, 
      setNotify, 
      setNotifyType,
      setNotifyMsg,
      setSmallLoad,
      setSideLoad
    } = useContext(Contexts);



  //states
  const [fileName, setFileName] = useState([]);
  const [imgCover, setImageCover] = useState();
  const [progresion, setProgression] = useState("cover");
  const [allFiles, setAllFiles] = useState([]);
  const [nameCount, setNameCount] = useState(0);
  const [addUpload, setAddupload] = useState(false);
  

  //functions

  //filter files
  const fileFilter = (file) => {
    // Reject a file 
    if (file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'audio/mpeg' || file.type === 'audio/wav') {
        return true;
    } else {
        return false;
    }
  };

  //add files
  const addFile = (e) => {
    e.preventDefault();
   
    console.log(e.target.files[0].type);
    const check = fileFilter(e.target.files[0]);
    if(!check) {
      setNotify(true);
      setNotifyType("warn")
      setNotifyMsg("File must strictly be an audio");
      return ;
    }
  
   if(imgCover) {

    //checks
    if(e.target.files[0].type === 'audio/mpeg') {

      if(selected == "Single") {
        if(allFiles.length === 2) {
          setNotify(true);
          setNotifyType("warn")
          setNotifyMsg("Singles can only contain one song");
          return;
        }
      }

      let file = e.target.files[0];
      let blob = file.slice(0, file.size, file.type); 
      let newFile = new File([blob], `${nameCount}.mp3`, {type: file.type});
  
  
      setAllFiles(allFiles => [...allFiles, newFile])
      setFileName(fileName => [...fileName, newFile]);
      setNameCount(nameCount => nameCount + 1);
      setAddupload(true);
    } else {
      setNotify(true);
      setNotifyType("warn")
      setNotifyMsg("Next file must be an an audio of tpe mp3");
    }

   } else {
  
    //checks
    if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png') {
      setAllFiles(allFiles => [...allFiles, e.target.files[0]])
      setImageCover(e.target.files[0].name);
      setProgression("songs");
    } else {
      setNotify(true);
      setNotifyType("warn")
      setNotifyMsg("First file must be an image cover");
    }


   }


  }



  const upload = async (e) => {
    e.preventDefault();
    setSideLoad(true);

    const formdata = new FormData();

   allFiles.map((data) => {
    formdata.append("files", data);
   })

   formdata.append("address", address);
   formdata.append("type", selected);
    

    //production https://streamifibackend.fly.dev/user/addfiles
    //test http://localhost:8000
    const config = {     
      headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'multipart/form-data'
      },
      data: {
        address: address,
        type: selected
      }
   }

   const add = await axios.post("https://streamifibackend.fly.dev/user/upload", formdata, config);
   const gotten = await add.data;

    console.log(gotten);
    console.log(add);
    
    if(gotten.completed) {
      setUploaded(true);
      setAddupload(false);
      setSideLoad(false);
      if(selected === "Album") {
        setAlbumImg(`${gotten.path}${imgCover}`)
        setAlbumSongs(`${gotten.path}`)
      } else {
        setSingleImg(`${gotten.path}${imgCover}`);
        setSingleSongs(`${gotten.path}`)
      }
      //notification
      setNotify(true);
      setNotifyType("success")
      setNotifyMsg("Files uploaded, proceed to mint");
    }
  }

  useEffect(() => {

  }, [])
  

  
  return (
    <div className='flex flex-col justify-center items-center gap-5 mb-[90px] md:flex-row md:justify-center md:items-center md:gap-[157px] md:mb-[90px]'>
      <div className="flex flex-col justify-center items-center">
          {progresion == "cover" ? 
            <div className="text-sm p-[2px] font-light">Upload image cover</div>
            :
            <div className="">
              { selected == "Album" ?
                "Upload Songs"
                :
                "Upload Song"
              }
            </div> 
          }
          <form 
            className=""
            id='signUpForm'
            onSubmit={(e) => upload(e)}
             >
              <div
               onClick={ () => document.querySelector(".input-field").click()}
               className="bg-transparent cursor-pointer w-[350px] h-[200px] border-[1px] border-[#553CDF] rounded-[8px] flex flex-col justify-center items-center"
               >

                <input type="file" value="" hidden name='filesadd' className='input-field' onChange={(e) => addFile(e) } />
                <div className="">Add File</div>
                <div className="">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>                
                </div>

            </div>
          

          {
            addUpload &&
            <button type='submit' className="outline-none border-none shadow-md rounded-[5px] bg-transparent text-[#553CDF] w-[70px] p-3 mt-3 cursor-pointer" >Upload</button>
          }
        </form>
      </div>

     <div className="flex flex-col gap-[33px] w-[90%] md:w-[200px] md:h-[200px]  ">
      {/* Image cover */}
      <div className="w-full">
        
       { imgCover ?
       <>
          <div className="text-sm p-[2px] font-light">image cover</div>

          <div className="border-[1px] border-[#553CDF] rounded-[5px] flex justify-start gap-2 p-4 items-center w-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                className="w-[25px] h-6"
                style={{width: '25px'}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
           <span className='text-sm font-light'>{imgCover}</span>
        </div>
        </>
        :
        <div className="">Upload Song cover</div>
       }

      </div>


      {/* Songs */}
      { imgCover &&
       <div className="">
      { fileName ?
         <>
          <div className="text-sm p-[2px] font-light">{selected === "Album" ? "songs" : "song"}</div>

          <div className="overflow-y-scroll overflow-x-hidden h-[150px] flex flex-col gap-[7px]">
           { fileName.map((data, index) => (
              <div className="border-[1px] border-[#553CDF] rounded-[5px] flex justify-start gap-2 p-4 items-center w-100" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                    />
                  </svg>               
                   <span className='text-sm font-light'>{data.name}</span> 
               </div>
              ))
             }
            </div>

            </>
            :

            <div className="">Upload songs</div>
          }
         

        </div> 

      }
     

     </div>

    </div>
  )
}
