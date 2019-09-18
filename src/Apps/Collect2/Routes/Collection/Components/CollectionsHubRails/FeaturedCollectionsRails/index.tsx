import {
  Box,
  color,
  Flex,
  ReadMore,
  ResponsiveImage,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { FeaturedCollectionsRails_collectionGroup } from "__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import { RouterLink } from "Artsy/Router/RouterLink"
import { ArrowButton, Carousel } from "Components/v2"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { useMedia } from "Utils/Hooks/useMedia"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup,
}) => {
  const { members, name } = collectionGroup
  const { trackEvent } = useTracking()
  const { xs, sm, xl } = useMedia()
  const carouselHeight = xs || sm ? "430px" : "500px"

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
        height={carouselHeight}
        options={{
          groupCells: xs || sm ? 1 : 2,
          wrapAround: sd.IS_MOBILE ? true : false,
          cellAlign: "left",
          pageDots: false,
          contain: true,
        }}
        data={members}
        render={(slide, slideIndex) => {
          return (
            <FeaturedCollectionEntity member={slide} itemNumber={slideIndex} />
          )
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              <Arrow />
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          const shouldDisplayArrow = !xl && members.length > 2
          return (
            <ArrowContainer>
              {members.length > 3 ? (
                <Arrow />
              ) : (
                shouldDisplayArrow && <Arrow showArrow={true} />
              )}
            </ArrowContainer>
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
  itemNumber: number
}

export const FeaturedCollectionEntity: React.FC<
  FeaturedCollectionEntityProps
> = ({ itemNumber, member }) => {
  const { description, price_guidance, slug, thumbnail, title } = member
  const { trackEvent } = useTracking()
  const { xs, sm } = useMedia()
  const hasLongTitle = title.length > 31

  const handleClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.FeaturedCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      type: Schema.Type.Thumbnail,
      destination_path: `${sd.APP_URL}/collection/${slug}`,
      item_number: itemNumber,
    })
  }

  return (
    <Container p={2} m={1} width={["261px", "261px", "355px", "355px"]}>
      <StyledLink to={`/collection/${slug}`} onClick={handleClick}>
        <Flex height={["190px", "190px", "280px", "280px"]}>
          <FeaturedImage src={thumbnail} />
        </Flex>
        <CollectionTitle size="4" mt={1} isSmallerScreen={xs || sm || false}>
          {title}
        </CollectionTitle>
        {price_guidance && (
          <Sans size="2" color="black60">{`From $${price_guidance}`}</Sans>
        )}
        <ExtendedSerif size="3" mt={1}>
          <ReadMore
            disabled
            maxChars={hasLongTitle && (xs || sm) ? 50 : 100}
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

const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  border-radius: 2px;

  &:hover {
    text-decoration: none;
    border: 1px solid ${color("black60")};
  }
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 100%;
  }
`

const FeaturedCollectionsContainer = styled(Box)`
  border-top: 1px solid ${color("black10")};

  ${Container} {
    &:first-of-type {
      margin-left: 2px;
    }
  }
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

const CollectionTitle = styled(Serif)<{ isSmallerScreen: boolean }>`
  width: ${props => (props.isSmallerScreen ? "246px" : "max-content")};
`

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
  }
`
