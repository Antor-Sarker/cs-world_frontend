import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function Navbar() {
  return (
    <nav className="fixed w-full z-10 py-5 bg-[#091524]">
      <ul className="flex justify-between mx-5">
        <li className="flex">
          <div className="flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
            <Bars3Icon className="w-8 h-8 mt-1 mr-5 text-white"/>
          </div>
          <div className="mt-1 font-extrabold text-3xl text-indigo-50 mr-4">
            CS-World
          </div>
          <div className="rounded-md flex bg-[#243e5e]">
            <MagnifyingGlassIcon className="mt-2 h-6 w-6 mx-2 text-[#687789] bg-[#243e5e]" />
            <input
              className="w-28 sm:w-28 md:w-full lg:w-full xl:w-full 2xl:w-full rounded-md focus:outline-none bg-[#243e5e]"
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
            />
          </div>
        </li>
        <li className=" rounded-full bg-pink-500 p-2  text-white">Log In</li>
      </ul>
    </nav>
  );
}
