import React from 'react'
import { AnimatePresence } from "framer-motion"
import { HomeView, ProjectsView } from '../views'
import { Pages } from './Pages'

export const AnimationContainer = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Pages>
        <HomeView />
        <ProjectsView />
      </Pages>
    </AnimatePresence>
  )
}
