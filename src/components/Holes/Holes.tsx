import React, { useContext } from 'react'
import styled from 'styled-components'
import { rgba } from '3oilerplate'
import { times } from 'lodash'
import { MiscContext } from '../../context'

const SHoles = styled.div(({ theme }) => ({
  height: '100%',
}))

const SHole = styled.div(({ theme }) => ({
  display: 'block',
  width: '0.78rem',
  height: '0.78rem',
  animation: 'appear linear 1.2s forwards',
  backgroundColor: theme.colors.white,
  boxShadow: `inset 1px 0px 2px ${rgba('black', 0.5)}`,
  borderRadius: '100%',
  marginBottom: '1.22rem',
}))

export const Holes = () => {
  const { layoutDimensions }: any = useContext<any>(MiscContext)

  return (
    <SHoles>
      {times((layoutDimensions.amountBlocks / 2) + 1, (index: number) => (
        <SHole key={index} />
      ))}
    </SHoles>
  )
}
