import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import ReactGA from 'react-ga'
import { debounce } from 'lodash'
import { width, space } from 'styled-system'
import { css } from '@styled-system/css'
import { getContainerWidth } from '../../helpers'
import { Holes, Switch } from '..'
import { MiscContext } from '../../context'

export const SLayout = styled.div<any>(
  ({ theme, isSketched }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  }),
  width,
  space,
)

export const SLayoutHoles = styled.div<any>(({ theme }) =>
  css({
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

export const SLayoutSwitch = styled.div<any>(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  marginRight: '1rem',
  zIndex: 1,
  transition: theme.transition,
}))

export const SLayoutContent = styled.div<any>(({ maxWidth }) =>
  css({
    position: 'relative',
    width: '100%',
    maxWidth: maxWidth || '23rem',
    paddingLeft: ['1rem', '2rem'],
    paddingRight: ['1rem', '2rem'],
    paddingBottom: '3rem',
  }),
)

export const Layout = ({ children, maxWidth, ...props }: any) => {
  const { isSketched, setIsSketched }: any = useContext(MiscContext)
  const [containerWidth, setContainerWidth] = useState(getContainerWidth())

  function updateDimensions() {
    setContainerWidth(getContainerWidth())
  }

  function onSwitchClick() {
    ReactGA.event({
      category: 'Theme',
      action: 'Clicked Toggle Sketch Mode',
    })
    setIsSketched(!isSketched)
  }

  useEffect(() => {
    window.addEventListener('resize', debounce(updateDimensions, 200))

    return () => {
      window.removeEventListener('resize', debounce(updateDimensions, 200))
    }
  }, [])

  return (
    <SLayout width={containerWidth} {...props}>
      <SLayoutHoles>
        <Holes />
      </SLayoutHoles>
      <SLayoutSwitch onClick={onSwitchClick}>
        <Switch />
      </SLayoutSwitch>
      <SLayoutContent maxWidth={maxWidth}>{children}</SLayoutContent>
    </SLayout>
  )
}
