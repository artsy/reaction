import { Box, Image, Serif, SerifProps } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"
import React, { FC } from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

interface CollectionsHubsNavItemProps extends SpaceProps {
  href: string
  imageUrl: string
  title: string
  subtitle?: string
}

export const CollectionsHubsNavItem: React.FC<CollectionsHubsNavItemProps> = ({
  href,
  imageUrl,
  title,
  subtitle,
}) => {
  return (
    <ImageLink
      href={href}
      src={imageUrl}
      alt={title}
      title={<Serif size="4t">{title}</Serif>}
      subtitle={<Serif size="2">{subtitle}</Serif>}
    />
  )
}

const ImageContainer = styled(Box)`
  position: relative;
`

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
        mt: "1",
        mb: "0.5",
        textAlign: "center",
        className: "title",
      })}

      {subtitle &&
        React.cloneElement(subtitle, {
          // kind of like "default props" for a cloned element.
          element: title.props.element || "h4",
          textAlign: "center",
        })}
    </OuterLink>
  )
}
