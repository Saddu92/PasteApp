import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: (() => {
    try {
      const pastes = localStorage.getItem("pastes");
      return pastes ? JSON.parse(pastes) : [];
    } catch (error) {
      console.error("Failed to parse pastes from localStorage", error);
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // add a check that the same pastes id created or not

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste.id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Updated Successfully");
      } else {
        toast("Paste not found for updating");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("All pastes have been reset");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Removed Succesfully");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
