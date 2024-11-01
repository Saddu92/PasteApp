import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState(""); // all data related to title
  const [value, setValue] = useState(""); // all data related to content
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update existing paste
      dispatch(updateToPastes(paste));
      // toast.success("Paste updated successfully!");
    } else {
      // Create new paste
      dispatch(addToPastes(paste));
      // toast.success("New paste created successfully!");
    }

    // After creation/update, clear input fields
    setTitle("");
    setValue("");
    setSearchParams({});
  }
useEffect(() => {
 if(pasteId){
  const paste= allPastes.find((p)=> p._id === pasteId)
  setTitle(paste.title);
  setValue(paste.content);
 }
}, [pasteId])


  return (
    <div>
      <div className="space-x-10">
        <input
          className="p-4 rounded-2xl mt-5 border border-black min-h-[auto]"
          type="text"
          placeholder="Enter Your Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 border border-black"
          value={value}
          placeholder="Enter The Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};
toast.dismiss(); 
export default Home;
