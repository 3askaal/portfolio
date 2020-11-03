import React, { useState } from 'react'
import { ArrowLeft as PrevIcon, ArrowRight as NextIcon } from 'react-feather'
import { Spacer } from '3oilerplate'
import ReactGA from 'react-ga'
import { Button, Text, Space, Link, Body, Device } from '../..'
import { PROJECTS } from '../../../constants'

export const ProjectPreview = ({
  currentProjectIndex,
  setCurrentProjectIndex,
}: any) => {
  const [isNavigating, setIsNavigating]: any = useState<any>(false)

  function onNext() {
    setIsNavigating(true)
    setTimeout(() => setIsNavigating(false), 1000)

    if (currentProjectIndex < PROJECTS.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1)
      ReactGA.event({
        category: 'Projects',
        action: 'Clicked Next Project',
      })
    }
  }

  function onPrevious() {
    setIsNavigating(true)
    setTimeout(() => setIsNavigating(false), 1000)

    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1)
      ReactGA.event({
        category: 'Projects',
        action: 'Clicked Previous Project',
      })
    }
  }

  return (
    <>
      <Space blocks={3} />
      <Device currentProjectIndex={currentProjectIndex} />
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
          disabled={currentProjectIndex === 0 || isNavigating}
        >
          <PrevIcon />
        </Button>
        <Text>
          {currentProjectIndex + 1} / {PROJECTS.length}
        </Text>
        <Button
          onClick={onNext}
          square
          disabled={currentProjectIndex === PROJECTS.length - 1 || isNavigating}
        >
          <NextIcon />
        </Button>
      </Spacer>
    </>
  )
}
