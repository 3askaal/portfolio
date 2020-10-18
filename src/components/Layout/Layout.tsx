import React, { useEffect, useState, useContext, useRef } from 'react'
import { styled } from '3oilerplate'
import ReactGA from 'react-ga'
import { debounce } from 'lodash'
import { width, height, space } from 'styled-system'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'react-feather'
import { getContainerHeight, getContainerWidth } from '../../helpers'
import { Holes, Switch , Button } from '..'
import { MiscContext } from '../../context'


export const SLayoutWrapper = styled.div(
  ({ theme, isSketched }: any) => ({
    display: 'flex',
    width: '100vw',
    maxWidth: '100%',
    // justifyContent: 'center'
    paddingLeft: '1rem'
  }),
)

export const SLayout = styled.div(
  ({ theme, isSketched }: any) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  }),
  width,
  height,
  space,
)

export const SLayoutHoles = styled.div(({ theme }: any) =>
  ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    overflow: 'hidden',
    paddingLeft: '0.11rem',
    paddingTop: '0.12rem',
    opacity: 1,
    transition: theme.transition,
    marginLeft: ['-1rem', '0'],

    ...(!theme.isSketched && {
      opacity: 0,
    }),
  }),
)

export const SLayoutSwitch = styled.div(({ theme }: any) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  marginTop: '1rem',
  marginRight: '1rem',
  zIndex: 1,
  transition: theme.transition,
}))

export const SLayoutNav = styled.div(({ theme, position }: any) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: ['flex-end', null, 'center'],
  [position]: 0,
  top: 0,
  bottom: 0,
  zIndex: 1,
  transition: theme.transition,
  paddingBottom: '1rem',

  ...(position === 'right' && {
    marginRight: '1rem'
  }),
  
  ...(position === 'left' && {
    marginLeft: '1rem',
    marginTop: '1rem',
    alignItems: 'flex-start'
  }),
}))

export const SLayoutContent = styled.div(({ maxWidth }: any) =>
  ({
    position: 'relative',
    width: '100%',
    maxWidth: maxWidth || '23rem',
    paddingTop: ['1rem', '2rem'],
    paddingLeft: ['1rem', '2rem'],
    paddingRight: ['1rem', '2rem'],
    paddingBottom: '3rem',
  }),
)

export const Layout = ({ children, maxWidth, button, pageIndex, ...props }: any) => {
  const { isSketched, setIsSketched, currentPageIndex, nextPage, previousPage }: any = useContext(MiscContext)
  const [containerWidth, setContainerWidth] = useState(getContainerWidth())
  const [containerHeight, setContainerHeight] = useState(getContainerHeight())

  function updateDimensions() {
    setContainerWidth(getContainerWidth())
    setContainerHeight(getContainerHeight())
  }

  function onSwitchClick() {
    ReactGA.event({
      category: 'Theme',
      action: 'Clicked Toggle Sketch Mode',
    })
    setIsSketched(!isSketched)
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', debounce(updateDimensions, 200))

    return () => {
      window.removeEventListener('resize', debounce(updateDimensions, 200))
    }
  }, [])

  return (
    <SLayoutWrapper>
      <SLayout
        s={{
          width: containerWidth,
          height: containerHeight,
          display: currentPageIndex === pageIndex ? 'visible' : 'hidden'
        }}
        {...props}
      >
        { !currentPageIndex && (
          <SLayoutHoles>
            <Holes />
          </SLayoutHoles>
        )}
        <SLayoutNav position={button}>
          <Button square onClick={() => button === 'right' ? nextPage() : previousPage()}>
            { button === 'left' && <ChevronLeftIcon /> }
            { button === 'right' && <ChevronRightIcon /> }
          </Button>
        </SLayoutNav>
        <SLayoutSwitch onClick={onSwitchClick}>
          <Switch />
        </SLayoutSwitch>
        <SLayoutContent maxWidth={maxWidth}>{children}</SLayoutContent>
      </SLayout>
    </SLayoutWrapper>
  )
}
