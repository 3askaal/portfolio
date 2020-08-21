import React, { useState, useEffect } from 'react'

import { startCase } from 'lodash'
import {
  ArrowLeft as PrevIcon,
  ArrowRight as NextIcon,
  Code as CodeIcon,
  ExternalLink as ExternalLinkIcon,
} from 'react-feather'
import ReactGA from 'react-ga'
import { Row, Col, Title, Spacer, Box } from '3oilerplate'
import {
  Layout,
  Text,
  Device,
  Space,
  Label,
  Button,
  Link,
  Body,
} from '../../components'
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
        s={{
          flexDirection: ['column', 'column', 'row'],
          flexWrap: 'nowrap',
        }}
      >
        <Col s={{ flexShrink: 0, flexGrow: 1 }}>
          <Body>
            <Text>
              <Link href="/">&#x3c; Back</Link>
            </Text>
          </Body>
          <Space />
          <Device
            currentProjectIndex={currentProjectIndex}
            currentProject={PROJECTS[currentProjectIndex]}
          />
          <Space blocks={2} />
          <Spacer
            size="s"
            s={{
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
            <Text>
              {currentProjectIndex + 1} / {PROJECTS.length}
            </Text>
            <Button
              onClick={onNext}
              square
              disabled={currentProjectIndex === PROJECTS.length - 1}
            >
              <NextIcon />
            </Button>
          </Spacer>
        </Col>
        <Col
          s={{ flexShrink: 1, paddingTop: ['0', '0', '4rem'] }}
          data-projectid={currentProjectIndex}
        >
          <Body>
            <Box
              s={{
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
          </Body>
          <Space />
          {PROJECTS[currentProjectIndex].demo ? (
            <Box s={{ display: 'flex' }}>
              <Spacer
                size="xxs"
                s={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Label circle>
                  <ExternalLinkIcon height={12} width={12} />
                </Label>
                <Text>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={PROJECTS[currentProjectIndex].demo}
                    onClick={() =>
                      onDemoLinkClick(PROJECTS[currentProjectIndex].demo)
                    }
                  >
                    Go to demo
                  </Link>
                </Text>
              </Spacer>
            </Box>
          ) : null}
          <Space />
          {!PROJECTS[currentProjectIndex].private ? (
            <Box s={{ display: 'flex' }}>
              {PROJECTS[currentProjectIndex].repos &&
                Object.keys(PROJECTS[currentProjectIndex].repos).map(
                  (key: string) => (
                    <Spacer
                      size="xxs"
                      s={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '5rem',
                      }}
                    >
                      <Label circle>
                        <CodeIcon height={12} width={12} />
                      </Label>
                      <Text>
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={PROJECTS[currentProjectIndex].repos[key]}
                          onClick={() =>
                            onSourceCodeLinkClick(
                              PROJECTS[currentProjectIndex].repos[key],
                            )
                          }
                        >
                          {startCase(key)}
                        </Link>
                      </Text>
                    </Spacer>
                  ),
                )}
            </Box>
          ) : (
            <Spacer
              size="xxs"
              s={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Label circle>
                <CodeIcon height={12} width={12} />
              </Label>
              <Text>
                <p>Code is private</p>
              </Text>
            </Spacer>
          )}
        </Col>
      </Row>
    </Layout>
  )
}
