import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { styled } from '3oilerplate'
import { MiscContext } from '../context'
import { Lines } from '../components'

const SPagesWrapper = styled.div({
  display: 'flex',
  width: '100vw',
  overflow: 'hidden'
})

const SPages = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
})

export const Pages = ({ children }: any) => {
  const { currentPageIndex, previousPageIndex, layoutDimensions }: any = useContext<any>(MiscContext)
  const [initial, setInitial] = useState({})
  const [animate, setAnimate] = useState({})
  // const [exit, setExit] = useState({})


  useEffect(() => {
    setInitial({
      x: -Math.abs((layoutDimensions.width ? layoutDimensions.width + layoutDimensions.blockSize : 0) * previousPageIndex),
    })
    setAnimate({
      x: -Math.abs((layoutDimensions.width ? layoutDimensions.width + layoutDimensions.blockSize : 0) * currentPageIndex),
    })
    // setExit({
    //   transform: `translateX(-${100 * currentPageIndex}vw)`,
    // })
  }, [currentPageIndex])

  return (
    <SPagesWrapper>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ duration: 0.5, type: "tween" }}
        // exit={exit}
      >
        <Lines amountPages={children.length} />
        <SPages>
          { children }
        </SPages>
      </motion.div>
    </SPagesWrapper>
  )
}
