import React from 'react'

export const PROJECTS: any = [
  {
    title: 'SkateDice',
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
          pick. The idea is based on The Berrics's{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=zMad6sMxzko"
          >
            Skate Or Dice
          </a>
          .
        </p>
      </>
    ),
    demo: 'https://skate-or-dice.netlify.app/',
    repos: {
      frontend: 'https://github.com/3askaal/skatedice-client',
      backend: 'https://github.com/3askaal/skatedice-server',
    },
  },
  {
    title: 'Undercoverage',
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
    demo: 'https://undercoverage.netlify.app/',
    demoBroken: true,
    private: true,
    repos: {
      frontend: 'https://github.com/3askaal/undercoverage-client',
      backend: 'https://github.com/3askaal/undercoverage-server',
    },
  },
  {
    title: '3oilerplate',
    description: (
      <>
        <p>
          Extremely customizable React Component Library and Toolkit. With a
          wrapper around{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://styled-components.com/"
          >
            Styled Components
          </a>{' '}
          that brings{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://styled-system.com/"
          >
            Styled System
          </a>
          's theming magic into components.
        </p>
      </>
    ),
    demo: 'https://3oilerplate.netlify.app/',
    demoBroken: true,
    repos: {
      code: 'https://github.com/3askaal/3oilerplate',
    },
  },
]
