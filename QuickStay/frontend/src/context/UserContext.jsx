import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const userDataCotext = createContext();

function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });

      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error?.response?.data || error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
    authLoading,
  };

  return (
    <userDataCotext.Provider value={value}>
      {children}
    </userDataCotext.Provider>
  );
}

export default UserContext;