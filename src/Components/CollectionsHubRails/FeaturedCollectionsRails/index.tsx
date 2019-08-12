import {
  Box,
  color,
  Flex,
  Link,
  ReadMore,
  ResponsiveImage,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { FeaturedCollectionsRails_collectionGroup } from "__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { ArrowButton, Carousel } from "Components/v2"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup,
}) => {
  const { members, name } = collectionGroup
  const { trackEvent } = useTracking()

  useEffect(() => {
    trackEvent({
      action_type: Schema.ActionType.Impression,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.FeaturedCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
    })
  }, [])

  const trackArrowClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.FeaturedCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      context_page: Schema.PageName.CollectionPage,
      type: Schema.Type.Button,
      subject: Schema.Subject.ClickedNextButton,
    })
  }

  return (
    <FeaturedCollectionsContainer>
      <Serif size="5" mt={3}>
        {name}
      </Serif>
      <Carousel
        height="500px"
        options={{
          groupCells: 4,
          cellAlign: "left",
          wrapAround: false,
          pageDots: false,
          draggable: false,
        }}
        data={members}
        render={slide => {
          return <FeaturedCollectionEntity member={slide} />
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              <Arrow />
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          return (
            <ArrowContainer>{members.length > 4 && <Arrow />}</ArrowContainer>
          )
        }}
        onArrowClick={() => trackArrowClick()}
      />
      <Spacer pb={2} />
    </FeaturedCollectionsContainer>
  )
}

interface FeaturedCollectionEntityProps {
  member: any
}

export const FeaturedCollectionEntity: React.FC<
  FeaturedCollectionEntityProps
> = ({ member }) => {
  const { description, price_guidance, slug, thumbnail, title } = member
  const { trackEvent } = useTracking()

  const onClickLink = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.FeaturedCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      type: Schema.Type.Link,
      destination_path: `${sd.APP_URL}/collection/${slug}`,
    })
  }

  return (
    <Container p={2} m={1}>
      <StyledLink href={`/collection/${slug}`} onClick={onClickLink}>
        <ImageContainer>
          <FeaturedImage src={thumbnail} />
        </ImageContainer>
        <CollectionTitle size="5" mt={1}>
          {title}
        </CollectionTitle>
        <Sans size="2" color="black60">{`Starting at $${price_guidance}`}</Sans>
        <ExtendedSerif size="3" mt={1}>
          <ReadMore
            maxChars={100}
            content={
              <>
                {description && (
                  <span dangerouslySetInnerHTML={{ __html: description }} />
                )}
              </>
            }
          />
        </ExtendedSerif>
      </StyledLink>
    </Container>
  )
}

export const FeaturedCollectionsRailsContainer = createFragmentContainer(
  FeaturedCollectionsRails,
  {
    collectionGroup: graphql`
      fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          id
          slug
          title
          description
          price_guidance
          thumbnail
        }
      }
    `,
  }
)

const FeaturedCollectionsContainer = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  width: 365px;
`

const ImageContainer = styled(Flex)`
  height: 280px;
`

const ExtendedSerif = styled(Serif)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
    }
  }
`
export const FeaturedImage = styled(ResponsiveImage)`
  background-position: top;
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
    svg {
      height: 18px;
      width: 18px;
    }
  }
`

const CollectionTitle = styled(Serif)`
  width: max-content;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;

    ${CollectionTitle} {
      text-decoration: underline;
    }
  }
`
