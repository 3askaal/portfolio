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
  const [currentProjectIndex, setCurrentProjectIndexState] = useState(0)
  const [previousProjectIndex, setPreviousProjectIndex] = useState(0)
  const [currentLayoutElement, setCurrentLayoutElement] = useState(null)
  const location = useLocation()

  const nextPage = () => {
    setPreviousPageIndex(currentPageIndex)
    setCurrentPageIndex(currentPageIndex + 1)
  }
  
  const previousPage = () => {
    setPreviousPageIndex(currentPageIndex)
    setCurrentPageIndex(currentPageIndex - 1)
  }

  const updateDimensions = (el?: any) => {
    setCurrentLayoutElement(el)

    const newContainerDimensions: any = {
      width: getContainerWidth(),
      height: getContainerHeight(el),
      blockSize: getBlockSize(),
      amountBlocks: getContainerHeight(el) / getBlockSize()
    }

    setLayoutDimensions(newContainerDimensions)
  
    const newPaperDimensions: any = {
      height: Math.round(document.body.clientHeight),
      width: Math.round(window.screen.width * PAGES.length) + getBlockSize(),
      blockSize: getBlockSize()
    }

    setPaperDimensions(newPaperDimensions)
  }

  const setCurrentProjectIndex = (newProjectIndex: number) => {
    setPreviousProjectIndex(currentProjectIndex)
    setCurrentProjectIndexState(newProjectIndex)
  }
  
  useEffect(() => {
    setCurrentPageIndex(findIndex(PAGES, { path: location.pathname }))

    window.addEventListener('resize', debounce(() => updateDimensions(currentLayoutElement), 200))

    return () => {
      window.removeEventListener('resize', debounce(() => updateDimensions(currentLayoutElement), 200))
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
        setCurrentProjectIndex,
        previousProjectIndex,
        setPreviousProjectIndex
      }}
    >
      <Redirect to={`${PAGES[currentPageIndex].path}${currentPageIndex > 0 ? `#${PROJECTS[currentProjectIndex].tag}` : ''}`} />
      {children}
    </MiscContext.Provider>
  )
}
