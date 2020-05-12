import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { Box, Sans, Serif, Image, Flex } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"

const Container = styled(RouterLink)`
  ${space}
  display: flex;
  text-decoration: none;
  flex-direction: column;
`

const Figure = styled(Box)`
  position: relative;
`

const Cover = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
`

const Title = styled(Sans)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.25) 100%
  );
`

const Meta = styled(Flex).attrs({ mt: 1 })``

const MetaCell = styled(Flex)`
  flex-basis: 50%;
`

export interface FeatureFeaturedLinkProps extends SpaceProps {
  wide?: boolean
  featuredLink: {
    title: string
    href: string
    subtitle?: string
    description?: string
    image: {
      width: number
      height: number
      url: string
    }
  }
}

export const FeatureFeaturedLink: React.FC<FeatureFeaturedLinkProps> = ({
  wide,
  featuredLink: { title, href, subtitle, description, image },
  ...rest
}) => {
  return (
    <Container to={href} {...rest}>
      {image ? (
        <Figure>
          <Cover src={image.url} />

          <Title size="6" color="white100" p={2} pt={9}>
            {title}
          </Title>
        </Figure>
      ) : (
        <Sans size="6" color="black100" my={2}>
          {title}
        </Sans>
      )}

      <Meta flexDirection={wide ? ["column", "row"] : "column"}>
        {subtitle && (
          <MetaCell>
            <Serif size="3">{subtitle}</Serif>
          </MetaCell>
        )}

        {description && (
          <MetaCell>
            <Serif size="4">{description}</Serif>
          </MetaCell>
        )}
      </Meta>
    </Container>
  )
}
