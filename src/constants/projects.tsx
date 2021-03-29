import React from 'react'

export const PROJECTS: any = [
  {
    title: 'SkateDice',
    tag: 'skatedice',
    description: (
      <>
        <p>
          App made for skateboarders to play games of skate with. These games
          are played at the skatepark. Rules and information can be found{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://en.wikipedia.org/wiki/Game_of_Skate"
          >
            over here
          </a>
          .
        </p>
        <p>
          This app gives you random tricks based on a difficulty level you can
          pick.
        </p>
      </>
    ),
    demo: 'https://skatedice.vercel.app/',
    repos: {
      frontend: 'https://github.com/3askaal/skatedice-client',
      backend: 'https://github.com/3askaal/skatedice-server',
    },
  },
  {
    title: '3oilerplate',
    tag: '3oilerplate',
    description: (
      <>
        <p>
          Extremely customizable Component Library and Toolkit for React.
          Combines the best of{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://styled-components.com/"
          >
            Styled Components
          </a>{' '}
          and{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://styled-system.com/"
          >
            Styled System
          </a>
          .
        </p>
      </>
    ),
    demo: 'https://3oilerplate.vercel.app/',
    repos: {
      code: 'https://github.com/3askaal/3oilerplate',
    },
  },
  {
    title: 'Undercoverage',
    tag: 'undercoverage',
    description: (
      <>
        <p>
          I worked for a Code Coverage company for some time and learned alot
          about Testing, Test Coverage, Coverage Reports and their data
          structures. So I'm making my own little Code Coverage tool as an
          experiment.
        </p>
      </>
    ),
    demo: 'https://undercoverage.vercel.app/',
    repos: {
      code: 'https://github.com/3askaal/undercoverage',
    },
  },
]
