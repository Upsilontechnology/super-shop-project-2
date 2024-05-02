import React, { createContext, useContext, useState } from "react";

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState("");

  const updateBranch = (newBranch) => {
    setSelectedBranch(newBranch);
  };

  return (
    <BranchContext.Provider value={{ selectedBranch, updateBranch }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => useContext(BranchContext);
