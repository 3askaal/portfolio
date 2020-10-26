import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { debounce, findIndex } from 'lodash'
import { PAGES, PROJECTS } from '../constants'
import { getBlockSize, getContainerHeight, getContainerWidth } from '../helpers'

export const MiscContext = createContext({})

export const MiscProvider = ({ children }: any) => {
  const [isSketched, setIsSketched] = useState(true)
  const [layoutDimensions, setLayoutDimensions] = useState<any>({})
  const [paperDimensions, setPaperDimensions] = useState({})
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [previousPageIndex, setPreviousPageIndex] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const location = useLocation()
  const history: any = useHistory()

  const nextPage = () => {
    setPreviousPageIndex(currentPageIndex)
    setCurrentPageIndex(currentPageIndex + 1)
  }
  
  const previousPage = () => {
    setPreviousPageIndex(currentPageIndex)
    setCurrentPageIndex(currentPageIndex - 1)
  }

  const updateDimensions = (el?: any) => {
    const newContainerDimensions: any = {
      width: getContainerWidth(),
      height: getContainerHeight(el),
      blockSize: getBlockSize(),
      amountBlocks: getContainerHeight(el) / getBlockSize()
    }

    console.log('container: ', newContainerDimensions)
    setLayoutDimensions(newContainerDimensions)
  
    const newPaperDimensions: any = {
      height: Math.round(document.body.clientHeight),
      width: Math.round(window.screen.width * PAGES.length) + getBlockSize(),
      blockSize: getBlockSize()
    }

    console.log('paper: ', newPaperDimensions)
    setPaperDimensions(newPaperDimensions)
  }
  
  useEffect(() => {
    setCurrentPageIndex(findIndex(PAGES, { path: location.pathname }))

    // window.addEventListener('resize', debounce(updateDimensions, 200))

    // return () => {
    //   // window.removeEventListener('resize', debounce(updateDimensions, 200))
    // }
  }, [])

  useEffect(() => {
    updateDimensions()
  }, [currentPageIndex])

  return (
    <MiscContext.Provider
      value={{
        isSketched,
        setIsSketched,
        layoutDimensions,
        setLayoutDimensions,
        updateDimensions,
        paperDimensions,
        location,
        currentPageIndex,
        previousPageIndex,
        nextPage,
        previousPage,
        currentProjectIndex,
        setCurrentProjectIndex
      }}
    >
      <Redirect to={PAGES[currentPageIndex].path} />
      {children}
    </MiscContext.Provider>
  )
}
