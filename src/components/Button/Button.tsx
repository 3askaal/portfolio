import React from 'react'
import styled, { css } from 'styled-components'
import { Outline, Fill } from '..'
import { fadeIn } from '../../style'

export const ButtonStyles = ({
  theme,
  circle,
  square,
  disabled,
}: any): any => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  height: '2rem',
  width: '7rem',
  padding: 0,
  overflow: 'visible !important',
  border: 0,
  cursor: 'pointer',
  borderRadius: '3px',
  transition: theme.transition,
  textDecoration: 'none',
  color: 'inherit',

  ':hover': {
    color: 'inherit',
  },

  ...(square && {
    height: '2rem',
    width: '2rem',
  }),

  ...(circle && {
    height: '2rem',
    width: '2rem',
    borderRadius: '100%',
  }),

  ...(theme.isSketched && {}),

  ...(!theme.isSketched && {
    backgroundColor: theme.colors.elementBackground,

    '&:hover': {
      backgroundColor: theme.colors.elementBackgroundHover,
    },
  }),

  ...(disabled && {
    opacity: 0.4,
    pointerEvents: 'none',

    '*': {
      pointerEvents: 'none',
    },
  }),
})

export const SButton = styled.button<any>(ButtonStyles)
export const SButtonLink = styled.a<any>(ButtonStyles)

export const SButtonContent = styled.div<any>(
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

export const Button = ({ children, circle, block, href, disabled, ...props }: any) => {
  const ButtonComp: any = href ? SButtonLink : SButton

  return (
    <ButtonComp href={href} circle={circle} disabled={disabled} {...props}>
      <Fill circle={circle} />
      <Outline
        radius={circle && 100}
        disabled={disabled}
        shouldAppearInRegularMode
      />
      <SButtonContent>{children}</SButtonContent>
    </ButtonComp>
  )
}
