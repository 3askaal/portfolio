import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { findIndex } from 'lodash'
import ReactGA from 'react-ga'
import { Row, Col } from '3oilerplate'
import { Layout, ProjectPreview, ProjectDescription } from '../../components'
import { PROJECTS } from '../../constants'
import { MiscContext } from '../../context'

export const ProjectsView = () => {
  const { currentProjectIndex, setCurrentProjectIndex, currentPageIndex }: any = useContext(MiscContext)
  const location: any = useLocation()
  const history: any = useHistory()

  useEffect(() => {
    if (!location.hash) {
      setCurrentProjectIndex(0)
    } else {
      const locationProjectIndex = findIndex(PROJECTS, {
        tag: location.hash.substring(1),
      })

      if (
        locationProjectIndex !== -1 &&
        locationProjectIndex !== currentProjectIndex
      ) {
        if (currentPageIndex === 1) {
          setCurrentProjectIndex(locationProjectIndex)
          history.push(`#${PROJECTS[locationProjectIndex].tag}`)
        }
      }
    }
  }, [currentProjectIndex, location.hash])

  useEffect(() => {
    ReactGA.pageview('/projects')
  }, [])

  return currentProjectIndex !== null ? (
    <Layout maxWidth="31rem" button="left" pageIndex={1}>
      <Row
        s={{
          flexDirection: ['column', 'column', 'row'],
          flexWrap: 'nowrap',
        }}
      >
        <Col s={{ flexShrink: 0, flexGrow: 1 }}>
          <ProjectPreview
            currentProjectIndex={currentProjectIndex}
            setCurrentProjectIndex={setCurrentProjectIndex}
          />
        </Col>
        <Col s={{ flexShrink: 1, paddingTop: ['2rem', null, '4rem'] }}>
          <ProjectDescription currentProjectIndex={currentProjectIndex} />
        </Col>
      </Row>
    </Layout>
  ) : null
}
