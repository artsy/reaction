import React from "react"
import { resize } from "../../../Utils/resizer"
import { Layout, SectionLayout } from "../Typings"
import { Caption } from "./Caption"
import { ImageWrapper } from "./ImageWrapper"

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  image?: any
  layout?: Layout
  sectionLayout?: SectionLayout
  width?: number | string
  height?: number | string
}

export const Image: React.SFC<ImageProps> = props => {
  const {
    children,
    height,
    image,
    layout,
    sectionLayout,
    width,
  } = props

  const src = resize(image.url, { width: 1200 })
  const alt = image.caption.replace(/<[^>]*>/g, "") /* strip caption html */

  return (
    <div className="article-image">
      <ImageWrapper
        layout={layout}
        src={src}
        width={width}
        height={height}
        alt={alt}
        index={image.index}
      />

      <Caption
        caption={image.caption}
        layout={layout}
        sectionLayout={sectionLayout}
      >
        {children}
      </Caption>
    </div>
  )
}

Image.defaultProps = {
  width: "100%",
  height: "auto",
}
