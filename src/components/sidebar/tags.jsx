/* eslint-disable react/prop-types */
import { XMarkIcon
} from "@heroicons/react/24/outline";
export default function Tags({handelOpenFilterModal,handelTagsFilter}){
    return(
        <div className="absolute bg-slate-600 w-40 h-52 top-2/4 rounded m-2 pl-2 pb-12">
      <div className="flex justify-end h-8" onClick={()=>handelOpenFilterModal('tags','close')}>
        <XMarkIcon className="h-7 w-7 hover:h-8 hover:w-8 cursor-pointer"/>
      </div>

      <div className="flex flex-wrap pb-3 font-semibold">
        <div className="bg-[#FF204E] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('c')}>
          C/C++
        </div>

        <div className="bg-[#03C988] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('react')}>
          React
        </div>

        <div className="bg-[#892CDC] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('frontend')}>
          Frontend
        </div>

        <div className="bg-[#FDA403] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('dsa')}>
          DSA
        </div>

        <div className="bg-[#FB2576] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('oop')}>
          OOP
        </div>
        <div className="bg-indigo-900 hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('javascript')}>
          Javascript
        </div>
        <div className="bg-[#2ba09a] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer" onClick={()=>handelTagsFilter('architechture')}>
          Architechture
        </div>
      </div>
    </div>
    )
}