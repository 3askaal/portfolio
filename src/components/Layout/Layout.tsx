import React, { Ref, useContext, useEffect, useRef, useState } from 'react'
import { styled } from '3oilerplate'
import ReactGA from 'react-ga'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'react-feather'
import { Holes, Switch , Button } from '..'
import { MiscContext } from '../../context'
import { getContainerHeight } from '../../helpers'


export const SLayoutWrapper = styled.div(
  ({ theme, isSketched }: any) => ({
    display: 'flex',
    minHeight: '100vh',

    '+ *': {
      marginLeft: '1rem'
    }
  }),
)

export const SLayout = styled.div(
  ({ theme, isSketched }: any) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  })
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
    marginTop: '1rem',
    marginLeft: '1rem',

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
    paddingLeft: ['3rem', '3rem'],
    paddingRight: ['1rem', '2rem'],
    paddingBottom: '3rem',
  }),
)

export const Layout = ({ children, maxWidth, button, pageIndex, ...props }: any) => {
  const {
    isSketched,
    setIsSketched,
    containerDimensions,
    currentPageIndex,
    nextPage,
    previousPage
  }: any = useContext(MiscContext)

  const containerRef: Ref<any> = useRef()
  const [currentContainerHeight, setCurrentContainerHeight] = useState<number>(0)

  function onSwitchClick() {
    ReactGA.event({
      category: 'Theme',
      action: 'Clicked Toggle Sketch Mode',
    })
    setIsSketched(!isSketched)
  }

  useEffect(() => {
    if (pageIndex === currentPageIndex) {
      setCurrentContainerHeight(getContainerHeight(containerRef.current))
      console.log(getContainerHeight(containerRef.current))
    }
  }, [currentPageIndex])

  return (
    <SLayoutWrapper
      ref={containerRef}
    >
      <SLayout
        {...props}
        s={{
          width: containerDimensions.width,
          // height: currentPageIndex === pageIndex ? currentContainerHeight : 0
        }}
      >
        { currentPageIndex === 0 && (
          <SLayoutHoles>
            <Holes />
          </SLayoutHoles>
        )}
        <SLayoutNav position={button}>
          { button === 'left' && (
            <Button square onClick={() => previousPage()}>
              <ChevronLeftIcon />
            </Button>
          )}
          { button === 'right' && (
            <Button square onClick={() => nextPage()}>
              <ChevronRightIcon />
            </Button>
          )}
        </SLayoutNav>
        <SLayoutSwitch onClick={onSwitchClick}>
          <Switch />
        </SLayoutSwitch>
          <SLayoutContent maxWidth={maxWidth}>{children}</SLayoutContent>
      </SLayout>
    </SLayoutWrapper>
  )
}
