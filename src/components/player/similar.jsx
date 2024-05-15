/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import getAuthData from "../../utils/auth";
function Video({ id, thumbnail }) {
  const authData = getAuthData();
  const navigate = useNavigate();

  function handelNavigate() {
    fetch("http://localhost:3500/viewCount", {
      method: "POST",
      body: JSON.stringify({ videoId: id, logedInUser: authData }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    navigate(`/video/${id}`);
  }
  return (
    <>
      <div className="m-3" onClick={handelNavigate}>
        <img className="rounded cursor-pointer" src={thumbnail} alt="image" />
      </div>
    </>
  );
}
export default function Similar({ similarVideos }) {
  return (
    <div>
      {similarVideos.map((item) => (
        <Video key={item.id} id={item.id} thumbnail={item.thumbnail} />
      ))}
    </div>
  );
}
