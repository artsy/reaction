import { color, Flex, Serif, SerifSize } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { Media } from "Utils/Responsive"

export const ImageLink: React.SFC<ImageLinkProps> = ({
  href,
  imageUrl,
  children,
  fontSize,
  ...rest
}) => (
  <LinkWithBackground href={href} imageUrl={imageUrl} {...rest}>
    <Flex justifyContent="center" alignItems="center" position="relative">
      <LinkText size={fontSize} textAlign="center" p={1}>
        {children}
      </LinkText>
      <PlaceholderImagesForContainerHeightAndWidth />
    </Flex>
  </LinkWithBackground>
)

interface ImageLinkProps extends SpaceProps, LinkWithBackgroundProps {
  href: string
  fontSize?: SerifSize
}

ImageLink.defaultProps = {
  fontSize: "5t",
}

const LinkText = styled(Serif)`
  position: absolute;
  vertical-align: middle;
  text-align: center;
`

// These images give the container the correct height/width/aspect ratio at each breakpoint.
//   They are hidden by CSS, but they allow the background image to scale correctly
//   based on the available width.
const PlaceholderImagesForContainerHeightAndWidth = () => {
  return (
    <div>
      <Media at="xs">
        <ImagePlaceholder
          src={plainWhiteImage_346x216}
          width="100%"
          aria-hidden
        />
      </Media>
      <Media at="sm">
        <ImagePlaceholder
          src={plainWhiteImage_254x159}
          width="100%"
          aria-hidden
        />
      </Media>
      <Media greaterThanOrEqual="md">
        <ImagePlaceholder
          src={plainWhiteImage_168x105}
          width="100%"
          aria-hidden
        />
      </Media>
    </div>
  )
}

const plainWhiteImage_346x216 =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAVoAAADYCAQAAAAAV+OaAAABhklEQVR42u3SAQ0AAAgDIN8/9I3h3CADaQdeibRIC9KCtEgL0oK0SAvSgrRIC9KCtEgL0oK0SAvSgrQgLdKCtCAt0oK0IC3SgrQgLdKCtCAt0oK0IC1Ii7QgLUiLtCAtSIu0IC1Ii7QgLUiLtCAtSIu0IC1IC9IiLUgL0iItSAvSIi1IC9IiLUgL0iItSAvSgrRIC9KCtEgL0oK0SAvSgrRIC9KCtEgL0oK0SCst0oK0IC3SgrQgLdKCtCAt0oK0IC3SgrQgLdKCtCAtSIu0IC1Ii7QgLUiLtCAtSIu0IC1Ii7QgLUgL0iItSAvSIi1IC9IiLUgL0iItSAvSIi1IC9IiLUgL0oK0SAvSgrRIC9KCtEgL0oK0SAvSgrRIC9KCtCAt0oK0IC3SgrQgLdKCtCAt0oK0IC3SgrQgLdJKi7QgLUiLtCAtSIu0IC1Ii7QgLUiLtCAtSIu0IC1IC9IiLUgL0iItSAvSIi1IC9IiLUgL0iItSAvSgrRIC9KCtEgL0oK0SAvXFub8rziK4sSZAAAAAElFTkSuQmCC"
const plainWhiteImage_254x159 =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAACfCAQAAABzN6wlAAABCklEQVR42u3RAQ0AAAjDMO5f9NFB6CSsaUdPC3z4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gi/4gg8fPnzBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBF3zBh28CfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMEXfMGHL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCD1/wBV/wBV/wBV/wBV/wdbQFBLI9cVtLhjEAAAAASUVORK5CYII="
const plainWhiteImage_168x105 =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAABpCAQAAAAE9qAuAAAAmklEQVR42u3QQREAAAgDINc/9Czhy4MIpB0ORahQoUIRKlQoQoUKRahQoUIRKlQoQoUKRahQoQgVKlQoQoUKRahQoQgVKhShQoUKRahQoQgVKhShQoUiVKhQoQgVKhShQoUiVKhQoQgVKhShQoUiVKhQhAoVKhShQoUiVKhQhAoVilChQoUiVKhQhAoVilChQhEqVKhQhAp9awGlltGYUr//DQAAAABJRU5ErkJggg=="

const ImagePlaceholder = styled.img`
  visibility: hidden;

  /* vertical-align to prevent adding space for ascenders/descenders:
        https://stackoverflow.com/a/10844318 */
  vertical-align: middle;
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
