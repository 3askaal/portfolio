export function getContainerWidth() {
  const blockSize = parseInt(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size'),
    10,
  )

  const screenWidth = document.body.scrollWidth
  const sparePixelsInWidth = screenWidth % (blockSize * 2)
  let containerWidth = screenWidth - sparePixelsInWidth

  if (sparePixelsInWidth < blockSize * 1.5) {
    containerWidth -= blockSize
  } else {
    containerWidth += blockSize
  }

  return containerWidth
}

export function getContainerHeight() {
  const blockSize = parseInt(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size'),
    10,
  )

  const screenHeight = document.body.scrollHeight
  const sparePixelsInHeight = screenHeight % (blockSize * 2)
  let containerHeight = screenHeight - sparePixelsInHeight

  if (sparePixelsInHeight < blockSize * 1.5) {
    containerHeight -= blockSize
  } else {
    containerHeight += blockSize
  }

  return containerHeight
}
