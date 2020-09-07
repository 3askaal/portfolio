import React, { useState, useEffect, useContext } from 'react'
import { times, debounce } from 'lodash'
import { useLocation } from 'react-router-dom'
import { rgba } from '3oilerplate'
import styled, { keyframes, css } from 'styled-components'
import { getContainerWidth } from '../../../helpers'
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
}))

const SLines = styled.svg<any>(({ isVertical }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  ...(isVertical && {
    marginLeft: 'auto',
    marginRight: 'auto',
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

export const Lines = ({ duration = 1, delay = 0.5 }: any) => {
  const location: any = useLocation()
  const { isSketched } = useContext<any>(MiscContext)
  const [values, setValues] = useState<any>({})
  const [shouldAnimate, setShouldAnimate] = useState<any>(false)

  function updateValues() {
    const newValues = {
      maxWidth: Math.round(document.body.getBoundingClientRect().width),
      maxHeight: Math.round(document.body.getBoundingClientRect().height),
      blockSize: parseInt(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('font-size'),
        10,
      ),
      containerWidth: getContainerWidth(),
    }

    setValues(newValues)
  }

  useEffect(() => {
    setShouldAnimate(false)
    updateValues()
    window.addEventListener('resize', debounce(updateValues, 50))

    return () => {
      window.removeEventListener('resize', debounce(updateValues, 50))
    }
  }, [location])

  useEffect(() => {
    if (isSketched) {
      setShouldAnimate(true)
      setTimeout(() => setShouldAnimate(false), 5000)
    }
  }, [isSketched])

  return (
    <SLinesWrapper>
      <SLines
        width={values.maxWidth}
        height={values.maxHeight}
        viewBox={`0 0 ${values.maxWidth || 0} ${values.maxHeight || 0}`}
      >
        {times(
          Math.floor(values.maxHeight / values.blockSize) + 2,
          (index: number) => (
            <SLinesLine
              key={`horizontal${index - 1}`}
              x1={values.maxWidth}
              y1={(index - 1) * values.blockSize}
              y2={(index - 1) * values.blockSize}
              strokeDasharray={values.maxWidth}
              strokeDashoffset={values.maxWidth}
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
        width={values.containerWidth}
        height={values.maxHeight}
        viewBox={`0 0 ${values.containerWidth || 0} ${values.maxHeight || 0}`}
        isVertical
      >
        {times(
          Math.floor(values.maxWidth / values.blockSize) + 1,
          (index: number) => (
            <SLinesLine
              key={`vertical${index}`}
              y1={values.maxHeight}
              x1={index * values.blockSize}
              x2={index * values.blockSize}
              strokeDasharray={values.maxHeight}
              strokeDashoffset={values.maxHeight}
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
