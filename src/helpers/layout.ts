export function getContainerWidth() {
  const blockSize = parseInt(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size'),
    10,
  )

  const screenWidth = window.innerWidth
  const sparePixelsInWidth = (screenWidth + (2 * blockSize)) % (blockSize * 2)
  let containerWidth = screenWidth - sparePixelsInWidth

  if (sparePixelsInWidth < blockSize * 1.5) {
    containerWidth -= blockSize
  } else {
    containerWidth += blockSize
  }

  console.log(containerWidth)

  return containerWidth
}

export function getContainerHeight() {
  const blockSize = parseInt(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size'),
    10,
  )

  const screenHeight = window.innerHeight
  const sparePixelsInHeight = screenHeight % (blockSize * 2)
  let containerHeight = screenHeight - sparePixelsInHeight

  if (sparePixelsInHeight < blockSize * 1.5) {
    containerHeight -= blockSize
  } else {
    containerHeight += blockSize
  }

  return containerHeight
}
