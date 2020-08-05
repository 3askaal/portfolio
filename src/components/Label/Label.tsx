import React from 'react'
import styled, { css } from 'styled-components'
import { space } from 'styled-system'
import { Outline, Fill } from '..'
import { fadeIn } from '../../style'

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

const SLabelContent = styled.div<any>(
  {
    display: 'inline-flex',
  },
  ({ theme }) =>
    theme.isSketched &&
    css`
      opacity: 0;
      animation: ${fadeIn} 0.5s ease-in-out 2s forwards;
    `,
)

export const Label = ({ children, circle, href, ...props }: any) => {
  return (
    <SLabel circle={circle} {...props}>
      <Fill circle={circle} />
      <Outline radius={circle && 100} />
      <SLabelContent>{children}</SLabelContent>
    </SLabel>
  )
}
