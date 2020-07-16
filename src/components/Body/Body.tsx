import styled, { css } from 'styled-components'
import { fadeIn } from '../../style'

export const Body = styled.div<any>(
  ({ theme }) => ({
    display: 'block',
    width: '100%',

    p: {
      lineHeight: '1rem',
    },

    '> * + *': {
      marginTop: '1rem',
    },

    ...(theme.isSketched && {
      paddingTop: '0.35rem',
      marginBottom: '0.65rem',
    }),

    ...(!theme.isSketched && {
      paddingTop: '0.25rem',
      marginBottom: '0.75rem',
    }),
  }),
  ({ theme }) =>
    theme.isSketched &&
    css`
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        opacity: 0;
        animation: ${fadeIn} 0.5s ease-in-out 2s forwards;
      }
    `,
)
