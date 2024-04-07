/* eslint-disable react/prop-types */
import { BookmarkIcon, ClockIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/outline";

function Video({url}) {
  return (
    <div className="p-3">
      <div>
        <img
          className="max-w-full rounded-md"
          src={url}
          alt="image"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex">
          {/* <span > */}
            <img className=" h-7 w-7 text-center rounded-full p-1" src="https://images.toffeelive.com/images/channels/profile/2/g-series-pro.png" alt="channel"/>
          {/* </span> */}
          <span className="mt-1 ml-1 text-sm">Sumit Saha</span>
        </div>
        <div className="flex justify-end">
          <div className="flex">
            <EyeIcon className="h-6 w-6" /> 50k.
          </div>
          <div className="flex pl-2">
            <HeartIcon className="h-6 w-6" />
            100
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="flex">
            <ClockIcon className="w-5 h-5" />
            <span className="text-sm"> 01 March, 2024</span>
        </div>
        <div className="flex">
            <div className="text-sm">Save</div>
            <BookmarkIcon className="h-6 w-6"/>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
      <Video url={"https://i.ytimg.com/vi/MIL2BK02X8A/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASHrERzan-h2roH_irBJS6lUmSpg"}/>
      <Video url={"https://i.ytimg.com/vi/ZYb_ZU8LNxs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBy76JStn_TsJC4khWN08S8C5i8eA"}/>
      <Video url={"https://i.ytimg.com/vi/oSWTXtMglKE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAMOcIInOwEScdTDkIhYWF6a5XESg"}/>
      <Video url={"https://i.ytimg.com/vi/fZPgBnL2x-Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAyTHQe3bGT5RMP3nc0sseDmBWZdg"}/>
      <Video url={"https://i.ytimg.com/vi/Ke90Tje7VS0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCZPkKQpUKwyYqCNt5BSBS4S37Vmg"}/>
      <Video url={"https://i.ytimg.com/vi/BI1o2H9z9fo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDDkQYa22pHJe9AjFtDJ7TlgqsYag"}/>
      <Video url={"https://i.ytimg.com/vi/jS4aFq5-91M/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCyZZs-s_Ss0ahCRGI0C6KzVMwPgg"}/>
      <Video url={"https://i.ytimg.com/vi/MIL2BK02X8A/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASHrERzan-h2roH_irBJS6lUmSpg"}/>
      <Video url={"https://i.ytimg.com/vi/ZYb_ZU8LNxs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBy76JStn_TsJC4khWN08S8C5i8eA"}/>
      <Video url={"https://i.ytimg.com/vi/oSWTXtMglKE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAMOcIInOwEScdTDkIhYWF6a5XESg"}/>
       
    </div>
  );
}
