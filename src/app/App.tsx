import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga'
import { GlobalStyle, FormResetStyle, theme } from '3oilerplate'
import { HomeView, ProjectsView } from '../views'
import { SApp } from './App.styled'
import { MiscProvider, MiscContext } from '../context'
import { theme as localTheme, LocalGlobalStyle } from '../style'
import { Lines } from '../components'

export const App = () => {
  useEffect(() => {
    ReactGA.initialize('UA-119845723-1')
  }, [])

  return (
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
            <BrowserRouter>
              <SApp>
                <Lines />
                <Switch>
                  <Route exact path="/">
                    <HomeView />
                  </Route>
                  <Route path="/projects">
                    <ProjectsView />
                  </Route>
                </Switch>
              </SApp>
            </BrowserRouter>
          </ThemeProvider>
        )}
      </MiscContext.Consumer>
    </MiscProvider>
  )
}
