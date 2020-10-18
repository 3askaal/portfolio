import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { styled } from '3oilerplate'
import { MiscContext } from '../context'
import { Lines } from '../components'

const SPages = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  left: '0',
  height: '100vh',
  // flexBasis: '100vw',
})

const SWrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  // flexBasis: '100vw',
})

export const Pages = ({ children }: any) => {
  const { currentPageIndex }: any = useContext<any>(MiscContext)
  const [initial, setInitial] = useState({})
  const [animate, setAnimate] = useState({})
  const [exit, setExit] = useState({})


  useEffect(() => {
    setInitial({
      transform: `translateX(-${50 * currentPageIndex}%)`,
    })
    setAnimate({
      transform: `translateX(-${50 * currentPageIndex}%)`,
    })
    setExit({
      transform: `translateX(-${50 * currentPageIndex}%)`,
    })
  }, [currentPageIndex])

  return <SWrapper s={{display: 'flex', justifyContent: 'flex-start'}}>
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        maxHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
     >
       <Lines amountPages={children.length}/>
        <SPages>
          { children }
        </SPages>
     </motion.div>
  </SWrapper>
}
