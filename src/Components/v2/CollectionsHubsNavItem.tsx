import { Box, Image, Serif } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

interface CollectionsHubsNavItemProps extends SpaceProps {
  href: string
  imageUrl: string
}

export const CollectionsHubsNavItem: React.FC<CollectionsHubsNavItemProps> = ({
  href,
  imageUrl,
  children,
}) => {
  return (
    <OuterLink to={href}>
      <ImageContainer>
        <ImageOverlay>
          <HubImage src={imageUrl} width="100%" alt={"todo fill in"} />
        </ImageOverlay>
      </ImageContainer>
      <Title size="3" textAlign="center" p={1}>
        {children}
      </Title>
    </OuterLink>
  )
}

const ImageContainer = styled(Box)`
  position: relative;
`

const Title = styled(Serif)``

const HubImage = styled(Image)`
  vertical-align: middle;
`

const ImageOverlay = styled(Box)`
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    color: #fff;
    content: "";
    background: rgba(0, 0, 0, 0.3);
  }
`

const OuterLink = styled(RouterLink)`
  text-decoration: none;

  &:hover {
    text-decoration: none;

    ${Title} {
      text-decoration: underline;
    }

    ${ImageOverlay} {
      &::before {
        display: block;
      }
    }
  }

  ${space}
`
