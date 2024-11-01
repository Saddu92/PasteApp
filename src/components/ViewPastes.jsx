import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from "../redux/pasteSlice";


const ViewPastes = () => {
const {id}= useParams();
const allPastes= useSelector((state)=> state.paste.pastes);
const paste = allPastes.filter((p)=> p._id === id)[0];

  return (
    <div>
    <div className="space-x-10">
      <input
      disabled
        className="p-4 rounded-2xl mt-5 border border-black min-h-[10px] min-w-[500px] "
        type="text"
        placeholder="Enter Your Title Here"
        value ={paste.title}
        onChange={(e) => setTitle(e.target.value)}
      />
    
    </div>
    <div>
      <textarea
      disabled
        className="rounded-2xl mt-4 min-w-[500px] p-4 border border-black"
        value={paste.content}
        placeholder="Enter The Content Here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  </div>
);
  
}

export default ViewPastes;
