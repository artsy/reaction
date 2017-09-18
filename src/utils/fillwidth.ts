import { reduce } from "lodash"

const MAX_ITERATIONS = 1000

const fillwidthDimensions = (items, containerWidth, gutter = 10, targetHeight) => {
  /**
   * Scales an image object proportionally based on a direction (either -1 or 1)
   * @param img a dimension object that references an artwork image
   * @param dir the direction we need to scale an image, either -1 or 1
   */
  const resizeHeight = (img, dir) => {
    img.width += img.width / img.height * dir
    img.height += dir
  }

  const totalWhitespace = () => {
    return (items.length - 1) * gutter
  }

  const widthDiff = dimensions => {
    const currentWidth = reduce(
      dimensions,
      (sum, img) => {
        return sum + img.width
      },
      0
    )
    return containerWidth - currentWidth - totalWhitespace()
  }

  // Get initial dimensions based on the targetHeight
  let dimensions = items.map(item => {
    let id
    let aspectRatio

    // Set id and aspectRatio for Relay or publishing
    if (item.node) {
      id = item.node.__id
      aspectRatio = item.node.image.aspect_ratio
    } else {
      id = item.url ? item.url : item.image
      aspectRatio = item.width / item.height
    }

    return {
      __id: id,
      width: targetHeight * aspectRatio,
      height: targetHeight,
    }
  })

  // If the total width difference is too small or negative we need to scale down. If not, scale up.
  let dir = widthDiff(dimensions) < 1 ? -1 : 1

  // Keep looping until we get an acceptable width difference
  let count = 0
  while (widthDiff(dimensions) <= 1) {
    for (let img of dimensions) {
      resizeHeight(img, dir)
      if (widthDiff(dimensions) > 1) {
        break
      }
    }
    // Seeing as there have been a couple of bugs in this code and there are no proper tests yet, let’s at least make
    // sure to no longer run into infinite loops.
    count++
    if (count === MAX_ITERATIONS) {
      const data = { items, containerWidth, gutter, targetHeight, dir, dimensions }
      console.error(`Was unable to calculate a filling width for data: ${JSON.stringify(data)}`)
      break
    }
  }

  // Round image dimensions to whole numbers
  for (let img of dimensions) {
    img.width = Math.floor(img.width)
    img.height = Math.floor(img.height)
    if (widthDiff(dimensions) === 0) {
      break
    }
  }

  // Voila, sizes for our images
  return dimensions
}

export default fillwidthDimensions
