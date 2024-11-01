import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
     <input
  type="search"
  className="p-2 rounded-2xl min-w-[600px] mt-10 border-2 border-black" // Add border width
  placeholder="Search Here"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div className="border" key={paste?._id}>
              <div>{paste.title}</div>
              <div>{paste.content}</div>
              <div className="flex flex-row gap-5 place-content-evenly mb-4 mt-1.5">
                <button>
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                <button>Update</button>
                <button>
                  <a href={`/pastes/${paste?._id}`}>View</a>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    // toast.success("Copied To Clipboard");
                  }}
                >
                  Copy
                </button>
                <button>Share</button>
              </div>
              <div>{formatDate(paste.createdAt)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pastes;
