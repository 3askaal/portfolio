import React from 'react'
import styled from 'styled-components'
import { width, height } from 'styled-system'
import { Fill } from '../Sketch/Fill/Fill'
import { Outline } from '../Sketch/Outline/Outline'

const SAvatar = styled.div<any>(
  () => ({
    position: 'relative',
    width: '5rem',
    height: '5rem',
    borderRadius: '100%',
  }),
  width,
  height,
)

const SAvatarImage = styled.img<any>(({ theme, radius }) => ({
  display: 'block',
  width: '100%',
  borderRadius: `${radius}%`,

  ...(theme.isSketched && {
    display: 'none',
  }),
}))

export const Avatar = () => {
  return (
    <SAvatar width={['5rem', '5rem', '7rem']} height={['5rem', '5rem', '7rem']}>
      <SAvatarImage
        src="https://avatars3.githubusercontent.com/u/6747457"
        radius={100}
      />
      <Fill circle />
      <Outline radius={100} shouldAppearInRegularMode />
    </SAvatar>
  )
}
