import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft as PrevIcon,
  ArrowRight as NextIcon,
  Code as CodeIcon,
  ExternalLink as ExternalLinkIcon,
} from 'react-feather'
import ReactGA from 'react-ga'
import { Row, Col, Title, Spacer, Box } from '3oilerplate'
import { Layout, Text, Device, Space, Label, Button } from '../../components'
import { PROJECTS } from '../../constants'

export const ProjectsView = () => {
  useEffect(() => {
    ReactGA.pageview('/projects')
  }, [])

  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0)

  function onNext() {
    if (currentProjectIndex < PROJECTS.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1)
      ReactGA.event({
        category: 'Projects',
        action: 'Clicked Next Project',
      })
    }
  }

  function onPrevious() {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1)
      ReactGA.event({
        category: 'Projects',
        action: 'Clicked Previous Project',
      })
    }
  }

  function onDemoLinkClick(url: string) {
    ReactGA.event({
      category: 'Projects',
      action: 'Clicked Demo Link',
      label: url,
    })
  }

  function onSourceCodeLinkClick(url: string) {
    ReactGA.event({
      category: 'Projects',
      action: 'Clicked Source Code Link',
      label: url,
    })
  }

  return (
    <Layout maxWidth="31rem">
      <Row
        style={{
          flexDirection: ['column', 'column', 'row'],
          flexWrap: 'nowrap',
        }}
      >
        <Col style={{ flexGrow: 0 }}>
          <Text>
            <p>
              <Link to="/">&#x3c; Back</Link>
            </p>
          </Text>
          <Space />
          <Device
            currentProjectIndex={currentProjectIndex}
            currentProject={PROJECTS[currentProjectIndex]}
          />
          <Space blocks={2} />
          <Spacer
            size="s"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPrevious}
              square
              disabled={currentProjectIndex === 0}
            >
              <PrevIcon />
            </Button>
            <p>
              {currentProjectIndex + 1} / {PROJECTS.length}
            </p>
            <Button
              onClick={onNext}
              square
              disabled={currentProjectIndex === PROJECTS.length - 1}
            >
              <NextIcon />
            </Button>
          </Spacer>
        </Col>
        <Col style={{ flexShrink: 1, paddingTop: ['0', '0', '4rem'] }}>
          <Text>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '2rem',
                alignItems: 'flex-end',
              }}
            >
              <Title level={4}>{PROJECTS[currentProjectIndex].title}</Title>
              <Label marginBottom="8px" transform="translateY(-10px);">
                Work in progress
              </Label>
            </Box>
            {PROJECTS[currentProjectIndex].description}
          </Text>
          <Space />
          {PROJECTS[currentProjectIndex].demo ? (
            <Box style={{ display: 'flex' }}>
              <Spacer
                size="xxs"
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Label circle>
                  <ExternalLinkIcon height={12} width={12} />
                </Label>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={PROJECTS[currentProjectIndex].demo}
                  onClick={() =>
                    onDemoLinkClick(PROJECTS[currentProjectIndex].demo)
                  }
                >
                  Go to demo
                </a>
              </Spacer>
            </Box>
          ) : null}
          <Space />
          {!PROJECTS[currentProjectIndex].private ? (
            <Box style={{ display: 'flex' }}>
              <Spacer
                size="xxs"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '5rem',
                }}
              >
                <Label circle>
                  <CodeIcon height={12} width={12} />
                </Label>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={PROJECTS[currentProjectIndex].repos.frontend}
                  onClick={() =>
                    onSourceCodeLinkClick(
                      PROJECTS[currentProjectIndex].repos.frontend,
                    )
                  }
                >
                  Front-end
                </a>
              </Spacer>
              <Spacer
                size="xxs"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '5rem',
                }}
              >
                <Label circle>
                  <CodeIcon height={12} width={12} />
                </Label>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={PROJECTS[currentProjectIndex].repos.backend}
                  onClick={() =>
                    onSourceCodeLinkClick(
                      PROJECTS[currentProjectIndex].repos.backend,
                    )
                  }
                >
                  Back-end
                </a>
              </Spacer>
            </Box>
          ) : (
            <Spacer
              size="xxs"
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Label circle>
                <CodeIcon height={12} width={12} />
              </Label>
              <p>Code is private</p>
            </Spacer>
          )}
        </Col>
      </Row>
    </Layout>
  )
}
