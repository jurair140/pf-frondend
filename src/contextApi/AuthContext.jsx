import React, { createContext, useEffect, useState } from 'react'


export const logContext = createContext()

function AuthContext({children}) {

    const [logStatus,setlogStatus] = useState(false)

    const checkLogStatus = ()=>{
        if(sessionStorage.getItem('token')){
            setlogStatus(true)
        }
        else{
            setlogStatus(false)
        }
    }

    useEffect(()=>{
        checkLogStatus()
    },[])
    
  return (
    <logContext.Provider value={{logStatus,setlogStatus}}>
        {children}
    </logContext.Provider>
    
  )
}

export default AuthContext
