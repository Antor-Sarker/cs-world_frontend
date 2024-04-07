import Navbar from "../navbar/navbar";

export default function Home(){
    return(
        <>
            <Navbar/>
            <div className=" grid grid-cols-6 absolute top-20 text-white bg-black">
                <div className="pt-1 col-start-1 col-span-1 fixed z-10">
                {/* <SideBar/> */}
                </div>
                <div className="pt-1 col-start-2 col-span-5 relative">
                    {/* <Videos/> */}
                </div>
            </div>
        </>
    )
}