import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Outline, Fill } from '..'

export const SLabel = styled.div<any>(
  ({ theme, circle }: any): any => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1rem',
    width: '4rem',
    borderRadius: '3px',
    transition: theme.transition,
    color: 'inherit',
    fontSize: '.8em',

    ...(!theme.isSketched && {
      backgroundColor: theme.colors.elementBackground,

      '&:hover': {
        backgroundColor: theme.colors.elementBackgroundHover,
      },
    }),

    ...(circle && {
      width: '1rem',
      borderRadius: '100%',
    }),
  }),
  space,
)

export const Label = ({ children, circle, href, ...props }: any) => {
  return (
    <SLabel circle={circle} {...props}>
      <Fill circle={circle} />
      <Outline radius={circle && 100} />
      {children}
    </SLabel>
  )
}
