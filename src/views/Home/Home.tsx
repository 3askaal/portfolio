import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { Avatar, Layout, Body, Space, Button, Social } from '../../components'

export const HomeView = () => {
  useEffect(() => {
    ReactGA.pageview('/')
  }, [])

  return (
    <Layout paddingTop={['0rem', '0rem', '1rem']}>
      <Avatar />
      <Space />
      <Body>
        <p>Hello, I'm Bas.</p>
        <p>
          I'm a Full-stack developer living in Amsterdam, Netherlands.
          Specialized in Front-end but also likes doing Back-end and UX in{' '}
          <Link to="/projects">side projects</Link>.
        </p>
        <p>
          Tools I'm loving at the moment: NodeJS, Typescript, GraphQL, React,
          Vue, Apollo, Styled Components, lodash
        </p>
        <p>
          Currently not working for a company. Wanna talk about opportunities?
        </p>
      </Body>
      <Button href="mailto:3askaal@gmail.com">Shoot me an email</Button>
      <Space blocks={2} />
      <Social />
    </Layout>
  )
}
