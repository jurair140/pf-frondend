import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


export const responseContext = createContext()


function ContextProvider({children}) {

    const [response,setResponse] = useState('')
    const [logStatus,setLogStatus] = useState(true)

  

    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setLogStatus(!logStatus)
      }
    },[])

  return (
   <>
   <responseContext.Provider value={{response,setResponse,logStatus}}>
    {children}
   </responseContext.Provider>
   </>
  )
}

export default ContextProvider
