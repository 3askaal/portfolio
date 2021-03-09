import React, { Ref, useContext, useEffect, useRef, useState } from 'react'
import { styled } from '3oilerplate'
import ReactGA from 'react-ga'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'react-feather'
import { Holes, Switch , Button } from '..'
import { MiscContext } from '../../context'

export const SLayoutWrapper = styled.div(
  ({ theme, isSketched }: any) => ({
    display: 'flex',

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
    width: '100%',
    zIndex: 1,
  })
)

export const SLayoutHoles = styled.div(({ theme }: any) =>
  ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
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
  [`${position}`]: 0,
  top: 0,
  bottom: 0,
  zIndex: 1,
  transition: theme.transition,
  paddingBottom: '2rem',

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
    maxWidth: maxWidth || '22rem',
    paddingTop: ['1rem', '2rem'],
    paddingBottom: '3rem',
    paddingRight: '1rem'
  }),
)

export const Layout = ({ children, maxWidth, button, pageIndex, hasHoles, ...props }: any) => {
  const {
    isSketched,
    setIsSketched,
    layoutDimensions,
    updateDimensions,
    currentPageIndex,
    nextPage,
    previousPage,
    currentProjectIndex
  }: any = useContext(MiscContext)

  const containerRef: Ref<any> = useRef()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contentWidth, setContentWidth] = useState<string>('')

  function onSwitchClick() {
    ReactGA.event({
      category: 'Theme',
      action: 'Clicked Toggle Sketch Mode',
    })
    setIsSketched(!isSketched)
  }

  useEffect(() => {
    setTimeout(() => {
      if (pageIndex === currentPageIndex) {
        setIsLoading(true)
        updateDimensions(containerRef.current)
      }
    }, 200)
  }, [currentPageIndex, currentProjectIndex])

  useEffect(() => {
    setIsLoading(false)

    if (layoutDimensions.amountBlocks) {
      setContentWidth(layoutDimensions.amountBlocks % 2 === 0 ? '22rem' : '23rem')
    }
  }, [layoutDimensions])

  return (
    <SLayoutWrapper s={{
      height: !isLoading ? layoutDimensions.height : 'auto',
      width: layoutDimensions.width,
    }}>
      <SLayout
        {...props}>
        { hasHoles ? (
          <SLayoutHoles>
            <Holes />
          </SLayoutHoles>
        ) : null }
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
        <SLayoutContent
          s={{
            paddingLeft: hasHoles ? ['3rem'] : ['2rem', '2rem'],
            maxWidth: contentWidth
          }}
          ref={containerRef}
        >{children}</SLayoutContent>
      </SLayout>
    </SLayoutWrapper>
  )
}
