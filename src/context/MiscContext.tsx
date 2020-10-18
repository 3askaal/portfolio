import React, { createContext, useEffect, useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { findIndex, map } from 'lodash'
import { ROUTES } from '../constants'

export const MiscContext = createContext({})

export const MiscProvider = ({ children }: any) => {
  const [isSketched, setIsSketched] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const location = useLocation()

  const nextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1)
  }
  
  const previousPage = () => {
    setCurrentPageIndex(currentPageIndex - 1)
  }
  
  useEffect(() => {
    setCurrentPageIndex(findIndex(ROUTES, { path: location.pathname }))
  }, [])

  useEffect(() => {
    console.log(currentPageIndex)
  }, [currentPageIndex])


  return (
    <MiscContext.Provider
      value={{
        isSketched,
        setIsSketched,
        location,
        currentPageIndex,
        nextPage,
        previousPage
      }}
    >
      <Redirect to={ROUTES[currentPageIndex].path} />
      {children}
    </MiscContext.Provider>
  )
}
