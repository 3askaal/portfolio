import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { Avatar, Layout, Body, Space, Button, Social } from '../../components'

export const HomeView = () => {
  useEffect(() => {
    ReactGA.pageview('/')
  }, [])

  return (
    <Layout paddingTop={['0rem', '1rem', '2rem']} button="right">
      <Avatar />
      <Space />
      <Body>
        <p>Hello, I'm Bas.</p>
        <p>
          I'm a Full-stack developer living in Amsterdam, Netherlands.
          Specialized in Front-end but also likes doing Back-end and UX in{' '}
          <Link to="/projects">side projects</Link>. Currently working for{' '}
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
          Besides building and designing things I love{' '}
          <a
            href="https://www.thrashermagazine.com/articles/videos/dime-s-knowing-mixtape-vol-2/"
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
          </a>
          .
        </p>
      </Body>
      <Space />
      <Social />
    </Layout>
  )
}
