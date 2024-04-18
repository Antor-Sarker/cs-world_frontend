import Navbar from "../navbar/navbar";
import SideBar from "../sidebar/sideBar";
import Videos from "../videos/videos";

import { useState } from "react";
 

export default function Home() {
  const [isOpenSearchModal,setIsOpenSearchModal]= useState(false)
  return (
    <div>
      <Navbar isOpenSearchModal={isOpenSearchModal} setIsOpenSearchModal={setIsOpenSearchModal}/>
      <div className={`${isOpenSearchModal && "blur"} grid grid-cols-6 absolute top-20 text-white bg-black`}>
        <div className="pt-1 col-start-1 col-span-1 fixed z-10">
          <SideBar />
        </div>
        <div className="pt-1 col-start-2 col-span-5 relative">
          <Videos />
        </div>
      </div>
    </div>
  );
}
