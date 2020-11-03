import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga'
import { GlobalStyle, FormResetStyle, theme } from '3oilerplate'
import { SApp } from './App.styled'
import { MiscProvider, MiscContext } from '../context'
import { theme as localTheme, LocalGlobalStyle } from '../style'
import { AnimationContainer } from './AnimationContainer'

ReactGA.initialize('UA-119845723-1')

export const App = () => {
  return (
    <BrowserRouter>
      <MiscProvider>
        <MiscContext.Consumer>
          {({ isSketched }: any) => (
            <ThemeProvider
              theme={{
                ...theme,
                ...localTheme,
                isSketched,
              }}
            >
            <LocalGlobalStyle />
            <FormResetStyle />
            <GlobalStyle />
              <SApp>
                <AnimationContainer />
              </SApp>
            </ThemeProvider>
          )}
        </MiscContext.Consumer>
      </MiscProvider>
    </BrowserRouter>
  )
}
