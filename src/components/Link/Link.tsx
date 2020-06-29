import React from 'react'
import styled from 'styled-components'

export const SLink = styled.a(({ theme }) => ({
  display: 'inline-block',
  position: 'relative',
  textDecoration: 'underline',

  ...(!theme.isSketched && {
    color: theme.colors.primary,

    '&:hover': {
      color: theme.colors.primaryLight,
    },
  }),

  ...(theme.isSketched && {
    color: theme.colors.sketch.pen,
    border: 0,
    fontWeight: 400,
    paddingBottom: 0,
  }),
}))

export const Link = (props: any) => {
  return <SLink {...props} />
}
