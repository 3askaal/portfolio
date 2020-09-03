import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { findIndex } from 'lodash'
import ReactGA from 'react-ga'
import { Row, Col } from '3oilerplate'
import { Layout, ProjectPreview, ProjectDescription } from '../../components'
import { PROJECTS } from '../../constants'

export const ProjectsView = () => {
  const [currentProjectIndex, setCurrentProjectIndexState] = useState<number>(0)
  const history: any = useHistory()
  const location: any = useLocation()

  const setCurrentProjectIndex = (value: number) => {
    setCurrentProjectIndexState(value)
    history.push(`#${PROJECTS[value].tag}`)
  }

  useEffect(() => {
    const locationProjectIndex = findIndex(PROJECTS, {
      tag: location.hash.substring(1),
    })

    setTimeout(() => {
      if (locationProjectIndex !== -1) {
        setCurrentProjectIndex(locationProjectIndex || currentProjectIndex)
      }
    }, 250)
  }, [])

  useEffect(() => {
    ReactGA.pageview('/projects')
  }, [])

  return (
    <Layout maxWidth="31rem">
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
  )
}
