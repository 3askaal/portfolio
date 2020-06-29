import React, { useState, useRef, useEffect, useContext } from 'react'
import { debounce } from 'lodash'
import styled, { keyframes, css } from 'styled-components'
import { MiscContext } from '../../../context'

export const SOutlineWrapper = styled.div<any>(
  ({ theme, shouldAppearInRegularMode }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    pointerEvents: 'none',

    ...(theme.isSketched && {
      svg: {
        display: 'block',
      },
    }),

    ...(shouldAppearInRegularMode &&
      !theme.isSketched && {
        pointerEvents: 'auto',

        '&:hover': {
          svg: {
            display: 'block',

            rect: {
              animationDelay: '0s !important',
            },
          },
        },
      }),
  }),
)

export const SOutline = styled.svg<any>(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflow: 'visible',
  display: 'none',
}))

const outlineAnimation = ({ strokeDashoffset }: any) => keyframes`
  from { opacity: 1; stroke-dashoffset: ${strokeDashoffset} }
  to { opacity: 1; stroke-dashoffset: 0; }
`

export const SOutlineRect = styled.rect<any>(
  ({ theme, strokeDashoffset, shouldAppearInRegularMode }) => ({
    width: '100%',
    height: '100%',
    fill: 'none',
    stroke: theme.colors.sketch.outline,
    strokeLinecap: 'round',
    strokeWidth: 2,
    strokeDashoffset,
    opacity: 0,

    ...(!theme.isSketched &&
      shouldAppearInRegularMode && {
        stroke: theme.colors.primary,
      }),
  }),
  ({ duration, delay, strokeDashoffset }) => css`
    animation: ${outlineAnimation({ strokeDashoffset })} ${duration}s ease-out
      ${delay}s forwards;
  `,
)

export const Outline = ({
  duration = 1,
  delay = 1.5,
  radius = 3,
  shouldAppearInRegularMode,
}: any) => {
  const { isSketched }: any = useContext(MiscContext)
  const [values, setValues] = useState<any>({})
  const outlineWrapperRef: any = useRef()

  function updateValues() {
    if (outlineWrapperRef && outlineWrapperRef.current) {
      const dimensions: any = outlineWrapperRef.current.getBoundingClientRect()

      setValues({
        width: dimensions.width,
        height: dimensions.height,
        perimeter: dimensions.width * 2 + dimensions.height * 2,
      })
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
    <SOutlineWrapper
      ref={outlineWrapperRef}
      shouldAppearInRegularMode={shouldAppearInRegularMode}
    >
      <SOutline>
        <SOutlineRect
          width={values.width}
          height={values.height}
          rx={radius}
          ry={radius}
          strokeDasharray={values.perimeter}
          strokeDashoffset={values.perimeter}
          duration={duration}
          delay={delay}
          shouldAppearInRegularMode={shouldAppearInRegularMode}
        />
      </SOutline>
    </SOutlineWrapper>
  )
}
