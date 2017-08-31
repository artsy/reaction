import React from "react"
import Caption from "./caption"
import ImageWrapper from "./image_wrapper"

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  image?: any
  layout?: string
  width?: number | string
  height?: number | string
}

const Image: React.SFC<ImageProps> = props => {
  const { image, layout, width, height, children } = props
  const child = children && children
  return (
    <div className="article-image">
      <ImageWrapper
        layout={layout}
        src={image.url}
        width={width}
        height={height}
        alt={image.caption.replace(/<[^>]*>/g, "") /* strip caption html */}
        index={image.index}
      />
      <Caption caption={image.caption} layout={layout}>
        {child}
      </Caption>
    </div>
  )
}

Image.defaultProps = {
  width: "100%",
  height: "auto",
}

export default Image
