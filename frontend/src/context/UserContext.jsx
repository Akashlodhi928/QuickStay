import { useContext } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'

export const userDataCotext = createContext()

function UserContext({children}) {

    let {serverUrl} = useContext(authDataContext)
    const [userData,setUserData] = useState(null)


    const getCurrentUser = async ()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/user/currentuser`, {withCredentials:true})
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

     useEffect(() => {
    
      getCurrentUser();
  
  }, []);


     let value= {
        userData,
        setUserData,
        getCurrentUser
     }
  return (

    <div>
        <userDataCotext.Provider value={value}>
            {children}
        </userDataCotext.Provider>
    </div>
  )
}

export default UserContext