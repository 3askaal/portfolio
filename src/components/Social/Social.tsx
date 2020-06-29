import React from 'react'
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
  return (
    <SSocial>
      {SOCIAL.map(({ icon, url }: any) => (
        <Button key={keyGen()} circle href={url}>
          {icon}
        </Button>
      ))}
    </SSocial>
  )
}
