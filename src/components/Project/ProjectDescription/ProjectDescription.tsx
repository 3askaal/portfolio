import React, { useContext } from 'react'
import {
  Code as CodeIcon,
  ExternalLink as ExternalLinkIcon,
} from 'react-feather'
import ReactGA from 'react-ga'
import { startCase } from 'lodash'
import { Title, Spacer, Box } from '3oilerplate'
import { Text, Space, Label, Link, Body } from '../..'
import { PROJECTS } from '../../../constants'
import { MiscContext } from '../../../context'

export const ProjectDescription = () => {
  const { currentProjectIndex }: any = useContext(MiscContext)

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

  return PROJECTS[currentProjectIndex] ? (
    <>
      <Body>
        <Title level={4}>{PROJECTS[currentProjectIndex].title}</Title>
        {PROJECTS[currentProjectIndex].description}
      </Body>
      <Space />
      <Label>Work in progress</Label>
      <Space />
      {PROJECTS[currentProjectIndex].demo ? (
        <Box s={{ display: 'flex' }}>
          <Spacer size="xxs" s={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  key={key}
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
        <Spacer size="xxs" s={{ flexDirection: 'row', alignItems: 'center' }}>
          <Label circle>
            <CodeIcon height={12} width={12} />
          </Label>
          <Text>
            <p>Code is private</p>
          </Text>
        </Spacer>
      )}
    </>
  ) : null
}
