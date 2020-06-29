import styled from 'styled-components'

export const Space = styled.div<any>(({ blocks = 1 }) => ({
  height: `${blocks}rem`,
}))
