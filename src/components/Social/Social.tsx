import React from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import { keyGen } from '3oilerplate'
import { Button } from '..'
import { SOCIAL } from '../../constants'

export const SSocial = styled.div(({ theme }) => ({
  '> * + *': {
    marginLeft: '1rem',
  },
}))

export const Social = () => {
  function onLinkClick(name: string) {
    ReactGA.event({
      category: 'Social',
      action: `Clicked Social ${name} Link`,
    })
  }

  return (
    <SSocial>
      {SOCIAL.map(({ icon, url, name }: any) => (
        <Button
          key={keyGen()}
          circle
          href={url}
          onClick={() => onLinkClick(name)}
        >
          {icon}
        </Button>
      ))}
    </SSocial>
  )
}
