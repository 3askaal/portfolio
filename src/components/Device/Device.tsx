import React, { useEffect, useState, useContext } from 'react'
import styled, { CSSObject, css, keyframes } from 'styled-components'
import { times, random } from 'lodash'
import { motion } from 'framer-motion'
import { Box, rgba } from '3oilerplate'
import { useHistory } from 'react-router-dom'
import ReactGA from 'react-ga'
import {
  Circle as ExternalLinkIcon,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
} from 'react-feather'
import { Fill, Outline } from '..'
import {
  PROJECTS,
  DEVICE_FACES,
  DEVICE_CORNERS,
  DEVICE_DIMENSIONS,
} from '../../constants'
import { calcCornerPieces, calcCornerWidth } from '../../helpers'
import { MiscContext } from '../../context'
import { fadeIn } from '../../style'

const SDeviceWrapper = styled.div<any>(
  ({ theme }) =>
    ({
      display: 'flex',
      justifyContent: 'center',
      width: '100%',

      ...(!theme.isSketched && {
        perspective: '1500px',
      }),
    } as CSSObject),
)

const SDevice = styled.div<any>(({ width, height }) => ({
  position: 'relative',
  width: `${width}rem`,
  height: `${height}rem`,
}))

const SDeviceScreen = styled.div<any>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  borderRadius: '0.25rem',

  ...(!theme.isSketched && {
    border: `1px solid ${rgba('white', 0.6)}`,
    backgroundColor: rgba('black', 0.9),
  }),
}))

// const SDeviceScreenBack = styled.div<any>(({ theme }) => ({
//   position: 'absolute',
//   display: 'block',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'black',
//   transform: 'translate3d(0, 0, -1px)',
//   pointerEvents: 'none',
// }))

const SDeviceScreenContent = styled.div<any>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
  overflow: 'hidden',
  borderRadius: '0.25rem 0.25rem 0 0',
  zIndex: 1,

  iframe: {
    width: '100%',
    height: '100%',

    ...(theme.isSketched && {
      display: 'none',
    }),
  },
}))

const noise = keyframes`
  0% { transform: translateX(0px,0px); }
  10% { transform: translate(-100px, 100px); }
  20% { transform: translate(150px, -100px); }
  30% { transform: translate(-100px,100px); }
  40% { transform: translate(100px, -150px); }
  50% { transform: translate(-100px, 200px); }
  60% { transform: translate(-200px, -100px); }
  70% { transform: translateY(50px, 100px); }
  80% { transform: translate(100px, -150px); }
  90% { transform: translate(0px, 200px); }
  100% { transform: translate(-100px, 100px); }
`

const SDeviceScreenContentNoise = styled.div<any>(
  ({ visible }) => ({
    position: 'absolute',
    top: '-500px',
    right: '-500px',
    bottom: '-500px',
    left: '-500px',
    background:
      'transparent url(https://www.dropbox.com/s/h7ab1c82ctzy83n/noise.png?raw=1) 0 0',
    backgroundSize: '320px 320px',
    opacity: 0.35,
    display: 'none',

    ...(visible && {
      display: 'block',
    }),
  }),
  css`
    animation: ${noise} 1s steps(8, end) infinite both;
  `,
)

const SDeviceScreenButtons = styled.div<any>(
  ({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0.5rem',
    height: '2rem',
    width: '100%',
    zIndex: 1,
  }),
  ({ theme }) =>
    theme.isSketched &&
    css`
      opacity: 0;
      animation: ${fadeIn} 0.5s ease-in-out 2s forwards;
    `,
)

const SDeviceScreenButton = styled.button<any>(({ disabled }) => ({
  ...(disabled && {
    opacity: 0.25,
    pointerEvents: 'none',
  }),
}))

const SDeviceFace = styled.div<any>(
  ({ theme, type, width, height, depth, radius }) => ({
    position: 'absolute',
    display: 'none',

    ...(theme.isSketched && {
      backgroundColor: 'transparent',
    }),

    ...(type === 'front' && {
      width: `${width}rem`,
      height: `${height}rem`,
      borderRadius: `${radius}rem`,
      transform: `translateZ(${depth / 2}rem)`,
      padding: '2rem 1rem',
      display: 'block',
    }),

    ...(!theme.isSketched && {
      display: 'block',
      backgroundColor: rgba(theme.colors.primary, 0.3),
      border: `1px solid ${rgba('white', 0.3)}`,

      ...(type === 'back' && {
        width: `${width}rem`,
        height: `${height}rem`,
        borderRadius: `${radius}rem`,
        transform: `rotateY(180deg) translateZ(${depth / 2}rem)`,
      }),

      ...(type === 'top' && {
        top: 0,
        height: `${depth}rem`,
        width: `${width - radius * 2}rem`,
        marginLeft: `${radius}rem`,
        transform: `rotateX(90deg) translateZ(${depth / 2}rem)`,
      }),

      ...(type === 'bottom' && {
        bottom: 0,
        height: `${depth}rem`,
        width: `${width - radius * 2}rem`,
        marginLeft: `${radius}rem`,
        transform: `rotateX(-90deg) translateZ(${depth / 2}rem)`,
      }),

      ...(type === 'left' && {
        left: 0,
        width: `${depth}rem`,
        height: `${height - radius * 2}rem`,
        marginTop: `${radius}rem`,
        transform: `rotateY(-90deg) translateZ(${depth / 2}rem)`,
      }),

      ...(type === 'right' && {
        right: 0,
        width: `${depth}rem`,
        height: `${height - radius * 2}rem`,
        marginTop: `${radius}rem`,
        transform: `rotateY(90deg) translateZ(${depth / 2}rem)`,
      }),
    }),
  }),
)

const SDeviceCorner = styled.div<any>(
  ({ theme, type, width, radius, depth }) => ({
    position: 'absolute',
    transformStyle: 'preserve-3d',
    transform: `rotateX(90deg) translateY(-${depth / 2}rem)`,

    ...(type === 'topRight' && {
      top: `${radius}rem`,
      right: `${radius + width / 2}rem`,
    }),

    ...(type === 'topLeft' && {
      top: `${radius}rem`,
      left: `${radius - width / 2}rem`,
    }),

    ...(type === 'bottomLeft' && {
      bottom: `calc(${radius}rem + 2px)`,
      left: `${radius - width / 2}rem`,
    }),

    ...(type === 'bottomRight' && {
      bottom: `${radius}rem`,
      right: `calc(${radius + width / 2}rem + 2px)`,
    }),

    ...(theme.isSketched && {
      display: 'none',
    }),
  }),
)

const SDeviceCornerPiece = styled.div<any>(
  ({ theme, width, height, x, z, rotate }) => ({
    position: 'absolute',
    width: `${width}rem`,
    height: `${height}rem`,
    transform: `translateX(${x}rem) translateZ(${z}rem) rotateY(${rotate}deg)`,
    backgroundColor: rgba(theme.colors.primary, 0.3),

    ...(theme.isSketched && {
      display: 'none',
    }),
  }),
)

export const Device = ({ currentProjectIndex }: any) => {
  const history: any = useHistory()
  const { isSketched }: any = useContext<any>(MiscContext)
  const [cornerPieces, setCornerPieces]: any = useState<any>([])
  const [previousDeviceTransition, setPreviousDeviceTransition]: any = useState<any>({})
  const [deviceTransition, setDeviceTransition]: any = useState<any>({})
  const [deviceTransitionInterval, setDeviceTransitionInterval]: any = useState<any>(null)
  const cornerWidth = calcCornerWidth()

  useEffect(() => {
    setCornerPieces(calcCornerPieces())
  }, [])

  const tilt = (direction: string): void => {

    let rotateY = currentProjectIndex * 360

    if (direction === 'left') rotateY -= random(5, 15)
    if (direction === 'right') rotateY += random(5, 15)

    setPreviousDeviceTransition(deviceTransition)
    setDeviceTransition({
      type: 'tilt',
      direction,
      style: { rotateY },
      duration: 4,
    })
  }

  const flip = (): void => {
    setPreviousDeviceTransition(deviceTransition)
    setDeviceTransition({
      type: 'flip',
      style: {
        rotateY: currentProjectIndex * 360 + random(-5, 5),
      },
      duration: 1,
    })
  }

  function onNext() {
    history.goForward()
    ReactGA.event({
      category: 'Device',
      action: 'Clicked Go Forward',
    })
  }

  function onPrevious() {
    history.goBack()
    ReactGA.event({
      category: 'Device',
      action: 'Clicked Go Back',
    })
  }

  function onExternalLink() {
    window.open(PROJECTS[currentProjectIndex].demo, '_blank')
    ReactGA.event({
      category: 'Device',
      action: 'Clicked Go To Demo',
    })
  }

  function startTilt() {
    tilt('right')

    setDeviceTransitionInterval(
      setInterval(() => {
        if (deviceTransition.direction === 'left') tilt('right')
        if (deviceTransition.direction === 'right') tilt('left')
      }, 4050)
    )
  }

  useEffect(() => {
    if (isSketched) return;

    if (deviceTransitionInterval) {
      clearInterval(deviceTransitionInterval)
      setDeviceTransitionInterval(null)
    }

    flip()
  }, [currentProjectIndex])

  useEffect(() => {
    if (deviceTransition.type === 'flip') {
      setTimeout(startTilt, (deviceTransition.duration * 1000) + 50)
    }

    return () => {
      clearInterval(deviceTransitionInterval)
      setDeviceTransitionInterval(null)
    }
  }, [deviceTransition])

  return (
    <SDeviceWrapper>
      <motion.div
          // initial={previousDeviceTransition.style}
          animate={deviceTransition.style}
          transition={{ duration: deviceTransition.duration }}
          style={{
            transformStyle: 'preserve-3d',
            transitionProperty: 'all',
          }}
        >
        <SDevice
          width={DEVICE_DIMENSIONS.width}
          height={DEVICE_DIMENSIONS.height}
          depth={DEVICE_DIMENSIONS.depth}
        >
          {DEVICE_FACES.map((type: string) => (
            <SDeviceFace
              key={type}
              type={type}
              width={DEVICE_DIMENSIONS.width}
              height={DEVICE_DIMENSIONS.height}
              depth={DEVICE_DIMENSIONS.depth}
              radius={DEVICE_DIMENSIONS.radius}
            >
              {type === 'front' && (
                <>
                  <Outline radius="1rem" />
                  <SDeviceScreen>
                    <Outline radius="0.5rem" />
                    <SDeviceScreenContent>
                      <Outline />
                      <Fill />
                      {deviceTransition?.type !== 'flip' ? (
                        <iframe
                          key={PROJECTS[currentProjectIndex].name}
                          src={PROJECTS[currentProjectIndex].demo}
                          title={PROJECTS[currentProjectIndex].name}
                          frameBorder="0"
                        />
                      ) : null}
                      <SDeviceScreenContentNoise
                        visible={deviceTransition.type === 'flip'}
                      />
                    </SDeviceScreenContent>
                    <SDeviceScreenButtons>
                      <SDeviceScreenButton type="button" onClick={onPrevious}>
                        <PrevIcon width={20} />
                      </SDeviceScreenButton>
                      <SDeviceScreenButton type="button" onClick={onExternalLink}>
                        <ExternalLinkIcon width={16} />
                      </SDeviceScreenButton>
                      <Box s={{ opacity: 0, pointerEvents: 'none' }}>
                        <SDeviceScreenButton type="button" onClick={onNext}>
                          <NextIcon width={20} />
                        </SDeviceScreenButton>
                      </Box>
                    </SDeviceScreenButtons>
                    {/* <SDeviceScreenBack /> */}
                  </SDeviceScreen>
                </>
              )}
            </SDeviceFace>
          ))}
          {DEVICE_CORNERS.map((type: string, cornerIndex: number) => (
            <SDeviceCorner
              key={type}
              type={type}
              width={cornerWidth}
              radius={DEVICE_DIMENSIONS.radius}
              depth={DEVICE_DIMENSIONS.depth}
            >
              {times(4, (cornerPieceIndex: number) => {
                return (
                  <SDeviceCornerPiece
                    key={cornerPieceIndex}
                    {...cornerPieces[
                      DEVICE_CORNERS.length * cornerIndex + cornerPieceIndex
                    ]}
                  />
                )
              })}
            </SDeviceCorner>
          ))}
        </SDevice>
      </motion.div>
    </SDeviceWrapper>
  )
}
