import qs from "qs"
const GEMINI_CLOUDFRONT_URL = "https://d7hftxdivxxvm.cloudfront.net"
const GEMINI_DISPLAY_CLOUDFRONT_URL = "https://de5y2r7wr8mpb.cloudfront.net"

const warn = message => {
  if (process.env.NODE_ENV === "development") {
    console.warn(message)
  }
}

export const crop = (
  src: string,
  options: {
    width: number
    height: number
    quality?: number
    isDisplayAd?: boolean
  }
) => {
  const { width, height, quality, isDisplayAd } = options

  // dont call gemini with empty src
  if (!src) return null

  if (!width && !height) {
    warn("requires width and height")
    return src
  } else if (width === 0) {
    warn("width must be non-zero")
    return src
  } else if (height === 0) {
    warn("height must be non-zero")
    return src
  }

  const config = {
    resize_to: "fill",
    src,
    width,
    height,
    quality: quality || 95,
  }

  const url = isDisplayAd
    ? GEMINI_DISPLAY_CLOUDFRONT_URL
    : GEMINI_CLOUDFRONT_URL
  return [url, qs.stringify(config)].join("?")
}

export const resize = (
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
    isDisplayAd?: boolean
  }
) => {
  const { width, height, quality, isDisplayAd } = options

  // dont call gemini with empty src
  if (!src) return null

  let resizeTo
  if (width && !height) {
    resizeTo = "width"
  } else if (height && !width) {
    resizeTo = "height"
  } else {
    resizeTo = "fit"
  }

  const config = {
    resize_to: resizeTo,
    src,
    width,
    height,
    quality: quality || 80,
  }

  const url = isDisplayAd
    ? GEMINI_DISPLAY_CLOUDFRONT_URL
    : GEMINI_CLOUDFRONT_URL
  return [url, qs.stringify(config)].join("?")
}
