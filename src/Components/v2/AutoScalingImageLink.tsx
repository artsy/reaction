import { color, Flex, Serif, SerifSize } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

export const AutoScalingImageLink: React.FC<AutoScalingImageLinkProps> = ({
  href,
  imageUrl,
  children,
  fontSize,
  maxWidth,
  maxHeight,
  ...rest
}) => {
  return (
    <LinkWithBackground href={href} imageUrl={imageUrl} {...rest}>
      <Flex
        justifyContent="center"
        alignItems="center"
        position="relative"
        width="100%"
      >
        <LinkText size={fontSize} textAlign="center" p={1}>
          {children}
        </LinkText>
        <PlaceholderImagesForContainerHeightAndWidth
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      </Flex>
    </LinkWithBackground>
  )
}

interface AutoScalingImageLinkProps
  extends SpaceProps,
    LinkWithBackgroundProps,
    PlaceholderImagesForContainerHeightAndWidthProps {
  href: string
  fontSize?: SerifSize
}

AutoScalingImageLink.defaultProps = {
  fontSize: "5t",
}

const LinkText = styled(Serif)`
  position: absolute;
  vertical-align: middle;
  text-align: center;
`

// This placeholder gives the container the correct height/width/aspect ratio at each breakpoint.
//   It is hidden by CSS, but it allows the background image to scale correctly
//   based on the available width.
const PlaceholderImagesForContainerHeightAndWidth: React.FC<
  PlaceholderImagesForContainerHeightAndWidthProps
> = ({ maxWidth, maxHeight }) => {
  return <SVGPlaceholder width={maxWidth} height={maxHeight} aria-hidden />
}

interface PlaceholderImagesForContainerHeightAndWidthProps {
  maxWidth: number
  maxHeight: number
}

const SVGPlaceholder = props => {
  const { width, height } = props
  return (
    <HiddenSVG
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="gray"
        strokeWidth="0"
      />
    </HiddenSVG>
  )
}

const HiddenSVG = styled.svg`
  visibility: hidden;
`

interface LinkWithBackgroundProps {
  imageUrl: string
}

const LinkWithBackground = styled.a<LinkWithBackgroundProps>`
  align-items: center;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    url(${p => p.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: ${color("white100")};
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 100%;

  ${space}

  &:hover {
    color: ${color("white100")};
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.8)
      ),
      url(${p => p.imageUrl});
  }
`
