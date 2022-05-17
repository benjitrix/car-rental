import React, { useContext, useState, useEffect } from 'react'
import AuthServices from '../services/AuthServices'

export const AppContext = React.createContext()

export const AppProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({name: '', email: ''})

  console.log(user.name);

  useEffect(() => {
    const retrievedToken = localStorage.getItem('car-rental-token')
    console.log(retrievedToken);
    if (retrievedToken === null) {
      return console.log('No token retrieved. User not logged in');
    } else {
      AuthServices.isAuthenticated(retrievedToken).then(data => {
        if (data.message.isAuthenticated) {
          setToken(retrievedToken)
          setUser({name: data.message.user, role: data.message.role})
          setIsAuthenticated(data.message.isAuthenticated)
          setIsLoading(false)
          console.log(data.message.msgBody);
        }
        console.log(data);
      })
    }
  }, [token])

  return (
    <AppContext.Provider value={{
      isLoading,
      token,
      isAuthenticated, 
      user,
      setUser,
      setToken,
      setIsAuthenticated,
      }}
      >
        {children}
    </AppContext.Provider>
  )
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}