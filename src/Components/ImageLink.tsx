import { color, Serif, SerifSize } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import {
  height,
  HeightProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"

export const ImageLink: React.SFC<ImageLinkProps> = ({
  href,
  imageUrl,
  children,
  fontSize,
  ...rest
}) => (
  <LinkWithBackground href={href} imageUrl={imageUrl} {...rest}>
    <Serif size={fontSize} textAlign="center" p={1}>
      {children}
    </Serif>
  </LinkWithBackground>
)

interface ImageLinkProps
  extends WidthProps,
    HeightProps,
    SpaceProps,
    LinkWithBackgroundProps {
  fontSize?: SerifSize
}

ImageLink.defaultProps = {
  width: 160,
  height: 100,
  fontSize: "5t",
}

interface LinkWithBackgroundProps {
  href: string
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

  ${width};
  ${height};
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
