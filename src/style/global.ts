import { createGlobalStyle } from 'styled-components'

export const LocalGlobalStyle = createGlobalStyle<any>(({ theme }) => ({
  a: {
    color: theme.colors.sketch.pen,

    '&:hover': {
      color: theme.colors.sketch.penDark,
    },

    ...(!theme.isSketched && {
      color: theme.colors.primary,
      transition: theme.transition,

      '&:hover': {
        color: theme.colors.primaryDark,
      },
    }),
  },

  button: {
    cursor: 'pointer',
  },

  'h1, h2, h3, h4, h5, h6': {
    ...(theme.isSketched && {
      fontWeight: 'normal !important' as 'normal',
    }),
  },
}))
