import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { findIndex } from 'lodash'
import ReactGA from 'react-ga'
import { Row, Col } from '3oilerplate'
import { Layout, ProjectPreview, ProjectDescription } from '../../components'
import { PROJECTS } from '../../constants'

export const ProjectsView = () => {
  const history: any = useHistory()
  const location: any = useLocation()

  useEffect(() => {
    ReactGA.pageview('/projects')
  }, [])

  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0)

  useEffect(() => {
    if (currentProjectIndex !== undefined && PROJECTS[currentProjectIndex]) {
      history.push(`#${PROJECTS[currentProjectIndex].tag}`)
    }
  }, [currentProjectIndex])

  useEffect(() => {
    const locationProjectIndex = findIndex(PROJECTS, {
      tag: location.hash.substring(1),
    })

    if (currentProjectIndex !== locationProjectIndex) {
      setCurrentProjectIndex(locationProjectIndex)
    }
  }, [location])

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
