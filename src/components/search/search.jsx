/* eslint-disable react/prop-types */
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import setHistory, {
  deleteHistoryById,
  getHistory,
} from "../../utils/searchHistory";

//search history
function History({ handelSearch, searchInput }) {
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const data = getHistory();
    setSearchHistory(data);
  }, []);

  function handelHistory(searchInput, name) {
    searchInput.value = name;
    handelSearch(name);
  }

  function handelHistoryDelete(event, id) {
    event.stopPropagation();
    const afterDelete = deleteHistoryById(id);
    setSearchHistory(afterDelete);
  }

  return (
    <div className="text-white cursor-pointer">
      {searchHistory?.map((item) => {
        return (
          <div
            key={item.id}
            className="flex justify-between px-10 py-3 border-b-2 hover:bg-slate-700 border-slate-700"
            onClick={() => handelHistory(searchInput, item.name)}
          >
            <div>{item.name}</div>
            <div
              className="flex text-red-400 hover:text-red-600"
              onClick={(event) => handelHistoryDelete(event, item.id)}
            >
              <TrashIcon className="w-5 h-5"></TrashIcon>
              <div className="hover:underline">Remove</div>
            </div>
          </div>
        );
      })}
      {searchHistory.length === 0 && (
        <p className="text-slate-400 text-xl text-center pt-20">
          Not Yet Searched !
        </p>
      )}
    </div>
  );
}

// search result
function Result({ item, searchInput }) {
  const navigate = useNavigate();

  function handelNavigate(url) {
    navigate(url);
    setHistory(searchInput.value);
  }

  return (
    <div
      className="border-b-2 border-slate-700 hover:bg-slate-800 text-white flex cursor-pointer"
      onClick={() => handelNavigate(`/video/${item.id}`)}
    >
      <img className="max-w-64 p-3" src={item.thumbnail} />
      <div className="pt-12">
        <div className="text-xl font-semibold">{item.title}</div>
      </div>
    </div>
  );
}

export default function Search({
  handelSearch,
  searchInput,
  handelOpenSearchModal,
  searchResult,
}) {
  return (
    <div
      className="bg-blue-950 w-full sm:w-full md:w-6/12 lg:w-4/12 xl:w-4/12 2xl:w-4/12 h-screen fixed top-20 z-20 overflow-y-scroll"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#81ABBC black" }}
    >
      <div
        className="flex text-white justify-end"
        onClick={() => handelOpenSearchModal(searchInput)}
      >
        <XMarkIcon className="w-9 h-9 cursor-pointer" />
      </div>

      <div className="text-indigo-400 text-xl text-center border-b-2 border-slate-700">
        {searchResult === null
          ? "Search History"
          : searchResult?.length
          ? searchResult.length + " Results Found"
          : "No Results Found"}
      </div>

      <div>
        {/* display hearch history OR Search Results */}
        {searchInput.value ? (
          searchResult?.map((item) => (
            <Result key={item.id} item={item} searchInput={searchInput} />
          ))
        ) : (
          <History handelSearch={handelSearch} searchInput={searchInput} />
        )}
      </div>
    </div>
  );
}
