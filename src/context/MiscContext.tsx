import React, { createContext, useState } from 'react'

export const MiscContext = createContext({})

export const MiscProvider = ({ children }: any) => {
  const [isSketched, setIsSketched] = useState(false)

  return (
    <MiscContext.Provider
      value={{
        isSketched,
        setIsSketched,
      }}
    >
      {children}
    </MiscContext.Provider>
  )
}
