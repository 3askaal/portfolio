import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { Avatar, Layout, Body, Space, Social } from '../../components'

export const HomeView = () => {
  useEffect(() => {
    ReactGA.pageview('/')
  }, [])


  return (
    <Layout paddingTop={['0rem', '1rem', '2rem']} button="right" pageIndex={0} hasHoles>
      <Avatar />
      <Space />
      <Body>
        <p>Hello, I'm Bas.</p>
        <p>
          I'm a Front-end developer who also loves doing Back-end and UX in side projects.
          Living in Amsterdam, Netherlands. Currently working for{' '}
          <a href="https://bloqhouse.com/" target="_blank" rel="noreferrer">
            Bloqhouse
          </a>
          .
        </p>
        <p>
          Tools I'm loving at the moment: NodeJS, Typescript, GraphQL, React,
          Vue, Apollo, Styled Components, lodash
        </p>
        <p>
          Besides building things I like{' '}
          <a
            href="https://www.youtube.com/watch?v=ZYAzo5OdqHM#t=11m6s"
            target="_blank"
            rel="noreferrer"
          >
            skateboarding
          </a>{' '}
          and{' '}
          <a
            href="https://open.spotify.com/album/7aSjaEi3OQ2aZemcJDhMb1?si=mRw5pzU9Q1-rz6cqOpuBRA"
            target="_blank"
            rel="noreferrer"
          >
            music
          </a>.
        </p>
      </Body>
      <Space />
      <Social />
    </Layout>
  )
}
