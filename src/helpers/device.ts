import { times } from 'lodash'
import {
  DEVICE_ANGLE,
  DEVICE_CORNER_PIECE_AMOUNT,
  DEVICE_DIMENSIONS,
} from '../constants'

function toDegrees(angle: number) {
  return (angle / (180 * Math.PI)) * 10
}

export const calcCornerPieces = () => {
  const a = DEVICE_ANGLE / DEVICE_CORNER_PIECE_AMOUNT
  const k = DEVICE_DIMENSIONS.radius * Math.cos(toDegrees(a / 2))
  const w = 2 * DEVICE_DIMENSIONS.radius * Math.sin(toDegrees(a / 2))

  const pieces: any = []

  times(DEVICE_CORNER_PIECE_AMOUNT, (i: number) => {
    const b = a * i + a / 2
    const x = k * Math.cos(toDegrees(b))
    const z = k * Math.sin(toDegrees(b))
    const rotate = 90 - b
    pieces.push({ width: w, height: DEVICE_DIMENSIONS.depth, x, z, rotate })
  })

  return pieces
}

export const calcCornerWidth = () => {
  return (
    2 *
    DEVICE_DIMENSIONS.radius *
    Math.sin(toDegrees(DEVICE_ANGLE / DEVICE_CORNER_PIECE_AMOUNT / 2))
  )
}
