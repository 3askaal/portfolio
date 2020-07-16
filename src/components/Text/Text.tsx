import styled, { css } from 'styled-components'
import { fadeIn } from '../../style'

export const Text = styled.p<any>(
  {
    display: 'inline-block',
  },
  ({ theme }) =>
    theme.isSketched &&
    css`
      opacity: 0;
      animation: ${fadeIn} 0.5s ease-in-out 2s forwards;
    `,
)
