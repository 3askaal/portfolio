import React, { useState, useEffect, useContext } from 'react'
import { times } from 'lodash'
import { rgba } from '3oilerplate'
import styled, { keyframes, css } from 'styled-components'
import { width, height } from 'styled-system'
import { MiscContext } from '../../../context'

const SLinesWrapper = styled.div<any>(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',

    svg: {
      overflow: 'visible',
    },
  }),
  width,
  height
)

const SLines = styled.svg<any>(({ isVertical }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  ...(isVertical && {
    // marginLeft: '0.5rem',
    // marginRight: 'auto',
  }),
}))

const slideOutLeft = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -${strokeDashoffset}; }
`

const slideOutRight = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: ${strokeDashoffset}; }
`

const slideOutUp = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -${strokeDashoffset}; }
`

const slideOutDown = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: ${strokeDashoffset}; }
`

const slideInLeft = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: ${strokeDashoffset}; }
  to { stroke-dashoffset: 0; }
`

const slideInUp = ({ strokeDashoffset }: any) => keyframes`
  from { stroke-dashoffset: ${strokeDashoffset}; }
  to { stroke-dashoffset: 0; }
`

const SLinesLine = styled.line<any>(
  ({ theme, isVertical, strokeDashoffset }) => ({
    stroke: theme.colors.sketch.paperLines,
    strokeWidth: 1,
    shapeRendering: 'crispEdges',

    ...(theme.isSketched && {
      strokeDashoffset: 0,
    }),

    ...(!theme.isSketched && {
      stroke: rgba(theme.colors.primary, 0.5),
      strokeDashoffset,
    }),

    ...(isVertical && {
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
  }),
  ({
    theme,
    isEven,
    isOdd,
    isHorizontal,
    isVertical,
    duration,
    delay,
    strokeDashoffset,
    shouldAnimate,
  }) => {
    if (shouldAnimate) {
      if (theme.isSketched) {
        if (isVertical) {
          return css`
            stroke-dashoffset: ${strokeDashoffset};
            animation: ${slideInUp({ strokeDashoffset })} ${duration}s ease-out
              ${delay}s forwards;
          `
        }
        if (isHorizontal) {
          return css`
            stroke-dashoffset: ${strokeDashoffset};
            animation: ${slideInLeft({ strokeDashoffset })} ${duration}s
              ease-out ${delay}s forwards;
          `
        }
      }

      if (!theme.isSketched) {
        if (isVertical && isEven) {
          return css`
            stroke-dashoffset: 0;
            animation: ${slideOutUp({ strokeDashoffset })} ${duration}s ease-out
              ${delay}s forwards;
          `
        }
        if (isVertical && isOdd) {
          return css`
            stroke-dashoffset: 0;
            animation: ${slideOutDown({ strokeDashoffset })} ${duration}s
              ease-out ${delay}s forwards;
          `
        }
        if (isHorizontal && isEven) {
          return css`
            stroke-dashoffset: 0;
            animation: ${slideOutLeft({ strokeDashoffset })} ${duration}s
              ease-out ${delay}s forwards;
          `
        }
        if (isHorizontal && isOdd) {
          return css`
            stroke-dashoffset: 0;
            animation: ${slideOutRight({ strokeDashoffset })} ${duration}s
              ease-out ${delay}s forwards;
          `
        }
      }
    }

    return null
  },
)

export const Lines = ({ duration = 1, delay = 0.5, amountPages }: any) => {
  const { isSketched, paperDimensions } = useContext<any>(MiscContext)
  const [values, setValues] = useState<any>({})
  const [shouldAnimate, setShouldAnimate] = useState<any>(false)
  const { currentPageIndex }: any = useContext<any>(MiscContext)

  // function updateValues() {
  //   const newValues = {
  //     maxWidth: Math.round(document.body.clientWidth * amountPages),
  //     maxHeight: Math.round(document.body.clientHeight),
  //     blockSize: parseInt(
  //       window
  //         .getComputedStyle(document.documentElement)
  //         .getPropertyValue('font-size'),
  //       10,
  //     ),
  //     containerWidth: getContainerWidth(),
  //   }
    
  //   console.log('Lines:')
  //   console.log(newValues)

  //   setValues(newValues)
  // }

  useEffect(() => {
    setShouldAnimate(false)
    // updateValues()
    // window.addEventListener('resize', debounce(updateValues, 50))

    // return () => {
    //   window.removeEventListener('resize', debounce(updateValues, 50))
    // }
  }, [currentPageIndex])

  useEffect(() => {
    if (isSketched) {
      setShouldAnimate(true)
      setTimeout(() => setShouldAnimate(false), 5000)
    }
  }, [isSketched])

  return (
    <SLinesWrapper width={paperDimensions.width} height={paperDimensions.height}>
      <SLines
        width={paperDimensions.width}
        height={paperDimensions.height}
        viewBox={`0 0 ${paperDimensions.width || 0} ${paperDimensions.height || 0}`}
        >
        {times(
          Math.floor(paperDimensions.height / paperDimensions.blockSize) + 2,
          (index: number) => (
            <SLinesLine
            key={`horizontal${index - 1}`}
            x1={paperDimensions.width}
            y1={(index - 1) * paperDimensions.blockSize}
            y2={(index - 1) * paperDimensions.blockSize}
            strokeDasharray={paperDimensions.width}
            strokeDashoffset={paperDimensions.width}
            duration={duration}
            delay={delay}
            isHorizontal
            isEven={index % 2 === 0}
            isOdd={index % 2 !== 0}
            shouldAnimate={shouldAnimate}
            />
            ),
            )}
      </SLines>
      <SLines
        width={paperDimensions.width}
        height={paperDimensions.height}
        viewBox={`0 0 ${paperDimensions.width || 0} ${paperDimensions.height || 0}`}
        isVertical
        >
        {times(
          Math.floor(paperDimensions.width / paperDimensions.blockSize) + 1,
          (index: number) => (
            <SLinesLine
            key={`vertical${index}`}
            y1={paperDimensions.height}
            x1={index * paperDimensions.blockSize}
            x2={index * paperDimensions.blockSize}
            strokeDasharray={paperDimensions.height}
            strokeDashoffset={paperDimensions.height}
            duration={duration}
            delay={delay}
            isVertical
            isEven={index % 2 === 0}
            isOdd={index % 2 !== 0}
            shouldAnimate={shouldAnimate}
            />
            ),
            )}
      </SLines>
    </SLinesWrapper>
  )
}
