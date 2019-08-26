import { Box, Image, Serif, SerifProps } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"
import React, { FC } from "react"
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
    .title {
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

interface ImageLinkProps {
  src: string
  href: string
  alt: string
  title: React.ReactElement<SerifProps & { className?: string }>
  subtitle?: React.ReactElement<SerifProps>
}

export const ImageLink: FC<ImageLinkProps> = ({
  href,
  src,
  alt,
  title,
  subtitle,
}) => {
  return (
    <OuterLink to={href}>
      <ImageContainer>
        <ImageOverlay>
          <HubImage src={src} width="100%" alt={alt} />
        </ImageOverlay>
      </ImageContainer>
      {React.cloneElement(title, {
        // kind of like "default props" for a cloned element.
        element: title.props.element || "h3",
        p: title.props.p || "1",
        textAlign: "center",
        className: "title",
      })}

      {subtitle &&
        React.cloneElement(subtitle, {
          // kind of like "default props" for a cloned element.
          element: title.props.element || "h4",
          p: title.props.p || "1",
          textAlign: "center",
        })}
    </OuterLink>
  )
}
