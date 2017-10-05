import React from "react"
import { resize } from "../../../utils/resizer"
import { Layout, SectionLayout } from "../typings"
import Caption from "./caption"
import ImageWrapper from "./image_wrapper"

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  image?: any
  layout?: Layout
  sectionLayout?: SectionLayout
  width?: number | string
  height?: number | string
}

const Image: React.SFC<ImageProps> = props => {
  const { image, layout, width, height, sectionLayout, children } = props
  const child = children && children
  const src = resize(image.url, { width: 1200 })
  return (
    <div className="article-image">
      <ImageWrapper
        layout={layout}
        src={src}
        width={width}
        height={height}
        alt={image.caption.replace(/<[^>]*>/g, "") /* strip caption html */}
        index={image.index}
      />
      <Caption caption={image.caption} layout={layout} sectionLayout={sectionLayout}>
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
