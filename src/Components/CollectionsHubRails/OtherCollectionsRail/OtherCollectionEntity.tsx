import { Box, color, Flex, Link, ResponsiveImage, Serif } from "@artsy/palette"
import { OtherCollectionEntity_member } from "__generated__/OtherCollectionEntity_member.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"

export interface CollectionProps {
  member: OtherCollectionEntity_member
}

export const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: 1px solid ${color("black10")};
  margin-right: 10px;
`

export const ImageContainer = styled(Box)`
  height: 60px;
  width: 60px;
`

export const ThumbnailImage = styled(ResponsiveImage)`
  background-size: cover;
`

const TitleContainer = styled(Serif)`
  width: max-content;
`

export const OtherCollectionEntity: React.FC<CollectionProps> = ({
  member,
}) => {
  const { slug, thumbnail, title } = member
  const { trackEvent } = useTracking()

  const onClickLink = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.OtherCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      type: Schema.Type.Link,
      destination_path: `${sd.APP_URL}/collection/${slug}`,
    })
  }

  return (
    <StyledLink href={`${sd.APP_URL}/collection/${slug}`} onClick={onClickLink}>
      <Flex alignItems="center">
        {thumbnail && (
          <ImageContainer>
            <ThumbnailImage src={thumbnail} />
          </ImageContainer>
        )}
        <Box>
          <TitleContainer size="3" px={2}>
            {title}
          </TitleContainer>
        </Box>
      </Flex>
    </StyledLink>
  )
}

export const OtherCollectionsRailsContainer = createFragmentContainer(
  OtherCollectionEntity,
  {
    member: graphql`
      fragment OtherCollectionEntity_member on MarketingCollection {
        slug
        thumbnail
        title
      }
    `,
  }
)
