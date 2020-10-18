import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { HomeView, ProjectsView } from '../views'
import { Lines } from '../components'
import { Pages } from './Pages'

export const AnimationContainer = () => {
  const location = useLocation()

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Pages>
          <HomeView />
          <ProjectsView />
        </Pages>
        {/* <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <motion.div
              initial={{ transform: 'translateX(-100%)' }}
              animate={{ transform: 'translateX(0%)' }}
              exit={{ transform: 'translateX(-100%)' }}
            >
              <HomeView />
            </motion.div>
          </Route>
          <Route path="/projects">
            <motion.div
              initial={{ transform: 'translateX(100%)' }}
              animate={{ transform: 'translateX(0%)' }}
              exit={{ transform: 'translateX(100%)' }}
            >
              <ProjectsView />
            </motion.div>
          </Route>
        </Switch> */}
      </AnimatePresence>
    </>
  )
}
