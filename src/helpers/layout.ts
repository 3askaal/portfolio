export function getBlockSize(): number {
  return parseInt(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size'),
    10,
  )
}

export function getContainerWidth(el?: any): number {
  const blockSize: number = getBlockSize()
  const windowWidth = window.outerWidth || window.innerWidth
  const sparePixelsInWidth = windowWidth % (blockSize * 2)
  const containerWidth = windowWidth - sparePixelsInWidth + blockSize

  return containerWidth
}

export function getContainerHeight(el?: any): number {
  const blockSize: number = getBlockSize()
  const windowHeight = window.outerHeight || window.innerHeight
  const contentHeight = (el || document.documentElement).getBoundingClientRect().height
  const minHeight = contentHeight < windowHeight ? windowHeight : contentHeight
  const sparePixelsInHeight = minHeight % (blockSize * 2)
  const containerHeight = minHeight - sparePixelsInHeight + blockSize

  return containerHeight
}
