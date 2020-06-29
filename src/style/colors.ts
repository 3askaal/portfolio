import { brighten, darken, mix, rgba } from '3oilerplate'

const white = darken('white', 0.2)
const black = brighten('black', 0.02)

const primary: any = darken('#7ea6f4', 0.5)
const primaryLight: any = brighten(primary, 0.6)
const primaryDark: any = darken(primary, 0.6)

const paperWhite = darken('white', 0.3)
const paperLines = rgba(brighten('#31aec9', 0.1), 0.8)
const fineliner = darken('white', 4.25)
const pen = mix('blue', fineliner, 0.4)
const penDark = darken(pen, 1)
const fill = rgba(darken('white', 1.2), 0.8)
const outline = rgba(darken('white', 2.5), 0.95)

export const Colors = {
  white,
  black,
  primary,
  primaryLight,
  primaryDark,
  sketch: {
    paperWhite,
    paperLines,
    fineliner,
    pen,
    penDark,
    fill,
    outline,
  },
  elementBackground: darken('white', 5.8),
  elementBackgroundHover: darken('white', 6.2),
  background: darken('white', 5.25),
}
