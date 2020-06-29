import React from 'react'
import styled from 'styled-components'
import { rgba } from '3oilerplate'
import { Outline, Fill } from '..'

export const SSwitch = styled.div<any>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '2rem',
  height: '1rem',
  padding: '0.225rem',
  borderRadius: '2px',
  zIndex: 100,
  cursor: 'pointer',
  backgroundColor: theme.colors.elementBackground,
  transition: theme.transition,

  ...(theme.isSketched && {
    backgroundColor: 'transparent',
  }),
}))

export const SSwitchToggle = styled.div<any>(({ theme }) => ({
  position: 'relative',
  width: '48%',
  height: '100%',
  display: 'inline-block',
  borderRadius: '2px',
  transform: 'translateX(0%)',
  backgroundColor: rgba(theme.colors.primary, 0.75),
  transition: theme.transition,

  ...(theme.isSketched && {
    backgroundColor: theme.colors.sketch.paperWhite,
    transform: 'translateX(107%)',
  }),
}))

export const Switch = (props: any) => {
  return (
    <SSwitch {...props}>
      <Outline />
      <Fill />
      <SSwitchToggle>
        <Outline />
      </SSwitchToggle>
    </SSwitch>
  )
}
