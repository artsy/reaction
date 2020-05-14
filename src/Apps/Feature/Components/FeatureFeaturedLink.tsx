import React from "react"
import styled from "styled-components"
import { SpaceProps, space } from "styled-system"
import { Box, Flex, ResponsiveImage, Sans, Serif, color } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "Artsy/Router/RouterLink"
import { FeatureFeaturedLink_featuredLink } from "__generated__/FeatureFeaturedLink_featuredLink.graphql"

const Container = styled(RouterLink)`
  ${space}
  display: flex;
  text-decoration: none;
  flex-direction: column;
`

const Figure = styled(Box)`
  position: relative;
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
  featuredLink: FeatureFeaturedLink_featuredLink
}

export const FeatureFeaturedLink: React.FC<FeatureFeaturedLinkProps> = ({
  wide,
  featuredLink,
  featuredLink: { href, title, subtitle, description, image },
  ...rest
}) => {
  return (
    <Container to={href} {...rest}>
      {image ? (
        <Figure>
          <ResponsiveImage
            maxWidth="100%"
            src={image.cropped.src}
            ratio={image.cropped.height / image.cropped.width}
            style={{ backgroundColor: color("black10") }}
          />

          <Title size="6" color="white100" p={2} pt={9}>
            {title}
          </Title>
        </Figure>
      ) : (
        <Sans size="6" color="black100" my={2}>
          {title || "—"}
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

export const FeatureFeaturedLinkFragmentContainer = createFragmentContainer(
  FeatureFeaturedLink,
  {
    featuredLink: graphql`
      fragment FeatureFeaturedLink_featuredLink on FeaturedLink {
        href
        title
        subtitle
        # TODO: Placeholder value
        description: subtitle
        image {
          cropped(width: 800, height: 600, version: ["wide"]) {
            src: url
            width
            height
          }
        }
      }
    `,
  }
)
