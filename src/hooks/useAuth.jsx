import React, { useContext } from "react";
import { AuthContext } from "../components/AuthProvider/AuthProvider";

const useAuth = () => {
  const Auth = useContext(AuthContext);
  return Auth;
};

export default useAuth;
// import { useState, useEffect, useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const useAuth = () => {
//   const { user, loading, error } = useContext(AuthContext);
//   return { user, authLoading: loading, authError: error };
// };

// export default useAuth;
