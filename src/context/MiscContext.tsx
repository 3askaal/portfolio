import React, { createContext, useEffect, useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { debounce, findIndex } from 'lodash'
import { PAGES } from '../constants'
import { getBlockSize, getContainerHeight, getContainerWidth } from '../helpers'

export const MiscContext = createContext({})

export const MiscProvider = ({ children }: any) => {
  const [isSketched, setIsSketched] = useState(true)
  const [containerDimensions, setContainerDimensions] = useState<any>({})
  const [paperDimensions, setPaperDimensions] = useState({})
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [previousPageIndex, setPreviousPageIndex] = useState(0)
  const location = useLocation()

  const nextPage = () => {
    setPreviousPageIndex(currentPageIndex)
    setCurrentPageIndex(currentPageIndex + 1)
  }
  
  const previousPage = () => {
    setPreviousPageIndex(currentPageIndex)
    setCurrentPageIndex(currentPageIndex - 1)
  }

  const updateDimensions = () => {
    console.log('Container:')
    console.log({
      width: getContainerWidth(),
      height: getContainerHeight(),
    })
    setContainerDimensions({
      width: getContainerWidth(),
      height: getContainerHeight(),
      blockSize: getBlockSize(),
      amountBlocks: getContainerHeight() / getBlockSize()
    })

    console.log('Paper:')
    console.log({
      height: Math.round(document.body.clientHeight),
      width: Math.round(window.innerWidth * PAGES.length),
      blockSize: getBlockSize()
    })
    setPaperDimensions({
      height: Math.round(document.body.clientHeight),
      width: Math.round(document.body.clientWidth * PAGES.length),
      blockSize: getBlockSize()
    })
  }
  
  useEffect(() => {
    setCurrentPageIndex(findIndex(PAGES, { path: location.pathname }))

    window.addEventListener('resize', debounce(updateDimensions, 200))

    return () => {
      window.removeEventListener('resize', debounce(updateDimensions, 200))
    }
  }, [])

  useEffect(() => {
    updateDimensions()
  }, [currentPageIndex])

  return (
    <MiscContext.Provider
      value={{
        isSketched,
        setIsSketched,
        containerDimensions,
        setContainerDimensions,
        paperDimensions,
        updateDimensions,
        location,
        currentPageIndex,
        previousPageIndex,
        nextPage,
        previousPage
      }}
    >
      <Redirect to={PAGES[currentPageIndex].path} />
      {children}
    </MiscContext.Provider>
  )
}
