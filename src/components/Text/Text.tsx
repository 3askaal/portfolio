import styled, { CSSObject } from 'styled-components'

export const Text = styled.div(
  ({ theme }: any) =>
    ({
      display: 'block',
      width: '100%',

      ...(theme.isSketched && {
        paddingTop: '0.35rem',
        marginBottom: '0.65rem',
      }),

      ...(!theme.isSketched && {
        paddingTop: '0.25rem',
        marginBottom: '0.75rem',
      }),

      // '> *': {
      //   marginTop: '1rem',
      // },

      p: {
        lineHeight: '1rem',
      },

      '> * + *': {
        marginTop: '1rem',
      },
    } as CSSObject),
)
