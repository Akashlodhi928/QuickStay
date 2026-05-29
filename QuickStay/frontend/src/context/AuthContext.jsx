import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authDataContext = createContext();

function AuthCotext({ children }) {
  let serverUrl = "https://quickstay-1-aa87.onrender.com";
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  let value = {
    serverUrl,
    loading,
    setLoading,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthCotext;