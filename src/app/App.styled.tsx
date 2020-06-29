import styled from 'styled-components'

export const SApp = styled.div<any>(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: '1rem',
  transition: theme.transition,
  width: '100%',
  fontSize: '0.6rem',
  minHeight: '100%',
  height: '100%',

  ...(!theme.isSketched && {
    fontFamily: theme.fonts.main,
    background: theme.colors.background,
    color: theme.colors.white,
  }),

  ...(theme.isSketched && {
    fontFamily: theme.fonts.sketch,
    background: theme.colors.sketch.paperWhite,
    color: theme.colors.sketch.fineliner,
  }),
}))
