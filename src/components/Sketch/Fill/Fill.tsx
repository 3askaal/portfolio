import React, { useState, useEffect, useRef, useContext } from 'react'
import { times, values, pick, max, debounce } from 'lodash'
import styled, { keyframes, css } from 'styled-components'
import { MiscContext } from '../../../context'

export const SFillWrapper = styled.div<any>(({ theme, radius }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: -1,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'none',
  pointerEvents: 'none',
  borderRadius: radius,

  ...(theme.isSketched && {
    display: 'flex',
  }),
}))

export const SFill = styled.svg<any>(() => ({
  display: 'block',
  position: 'absolute',
  transform: 'rotate(135deg)',
}))

const fillAnimation = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: ${strokeDashoffset} }
  to { stroke-dashoffset: 0; }
`

export const SFillLine = styled.line<any>(
  ({ theme }) => ({
    stroke: theme.colors.sketch.fill,
    strokeWidth: 2,
    shapeRendering: 'geometricPrecision',
  }),
  ({ theme, duration, delay, strokeDashoffset }) => css`
    animation: ${fillAnimation({ strokeDashoffset })} ${duration || '1s'}
      ease-out ${delay || '1.5s'} forwards;
  `,
)

export const Fill = ({ duration, delay, circle }: any) => {
  const { isSketched }: any = useContext(MiscContext)
  const [size, setSize] = useState<number>(0)
  const fillWrapperRef: any = useRef()

  function updateValues() {
    if (fillWrapperRef && fillWrapperRef.current) {
      const dimensions = fillWrapperRef.current.getBoundingClientRect()
      const sides = values(pick(dimensions, ['height', 'width']))
      const highestSide = max(sides)
      setSize(Math.ceil((highestSide * 1.25) / 5) * 5)
    }
  }

  useEffect(() => {
    updateValues()
    window.addEventListener('resize', debounce(updateValues, 50), true)

    return () => {
      window.removeEventListener('resize', debounce(updateValues, 50), true)
    }
  }, [isSketched])

  return (
    <SFillWrapper ref={fillWrapperRef} radius={circle ? 100 : 3}>
      <SFill height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {size
          ? times(size / 5, (index: number) => (
              <SFillLine
                key={index}
                x1={size}
                y1={index * 5}
                y2={index * 5}
                strokeDasharray={size}
                strokeDashoffset={size}
                duration={duration}
                delay={delay}
              />
            ))
          : null}
      </SFill>
    </SFillWrapper>
  )
}
