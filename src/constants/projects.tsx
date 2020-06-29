import React from 'react'

export const PROJECTS: any = [
  {
    title: 'SkateDice',
    description: (
      <>
        <p>
          App made for skateboarders to play games of skate with. These games
          are played at the skatepark. Rules and information can be found{' '}
          <a href="https://en.wikipedia.org/wiki/Game_of_Skate">over here</a>.
        </p>
        <p>
          This app gives you random tricks based on a difficulty level you can
          pick. The idea is based on The Berrics's{' '}
          <a href="https://www.youtube.com/watch?v=zMad6sMxzko">
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
    title: 'ThugLive',
    description: (
      <>
        <p>
          Little non-visual strategy game where you play criminal online. The
          goal is to get as much money possible and rank in different skill
          levels.
        </p>
        <p>
          You can steal cars, rob other users or property, make/sell drugs,
          gamble, assasinate other users, buy/sell anything on the dark web
        </p>
        <p>
          This game is inspired by games like Mafia Wars, I wanted to create a
          modern location-based version.
        </p>
      </>
    ),
    demo: 'https://thuglive.netlify.app/',
    private: true,
    repos: {
      frontend: 'https://github.com/3askaal/thuglive-client',
      backend: 'https://github.com/3askaal/thuglive-server',
    },
  },
]
