import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import { MarketingCollectionsPreview_marketingCollections } from "__generated__/MarketingCollectionsPreview_marketingCollections.graphql"
import { SearchBarState } from "Components/Search/state"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { crop } from "Utils/resizer"
import { Media } from "Utils/Responsive"

interface MarketingCollectionsPreviewProps {
  marketingCollections: MarketingCollectionsPreview_marketingCollections
  searchState?: SearchBarState
}

const CollectionBox = styled(Box)<{ imageUrl: string }>`
  width: 185px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${p => p.imageUrl}) center;

  &:hover,
  &.highlighted {
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),
      url(${p => p.imageUrl}) center;
  }
`

export const CollectionTitle = styled(Serif)`
  color: ${color("white100")};
`
CollectionTitle.displayName = "CollectionTitle"

export const CollectionTitles = ({ title }: { title: string }) => {
  const [first, ...rest] = title.split(": ")
  const showHeadline = rest.length !== 0
  const headline = showHeadline && first
  const subtitle = showHeadline ? rest.join(": ") : first

  return (
    <Flex justifyContent="flex-end" flexDirection="column" height="80px">
      {showHeadline && (
        <Box ml={1}>
          <CollectionTitle weight="semibold" size="2">
            {headline}:
          </CollectionTitle>
        </Box>
      )}
      <Box ml={1} mb={1}>
        <CollectionTitle size="2">{subtitle}</CollectionTitle>
      </Box>
    </Flex>
  )
}

export class MarketingCollectionsPreview extends React.Component<
  MarketingCollectionsPreviewProps
> {
  componentDidMount() {
    const items = this.props.marketingCollections.map(({ slug }) => {
      return { href: `${sd.APP_URL}/collection/${slug}` }
    })

    this.props.searchState.registerItems(items)
  }
  render() {
    const { marketingCollections, searchState } = this.props

    const { state } = searchState
    const items = marketingCollections.map(
      ({ headerImage, title, slug }, index) => {
        const href = `${sd.APP_URL}/collection/${slug}`
        const imageUrl = crop(headerImage, {
          width: 185,
          height: 80,
        })

        const highlighted =
          state.hasEnteredPreviews && index === state.selectedPreviewIndex

        return (
          <CollectionBox
            className={highlighted && "highlighted"}
            imageUrl={imageUrl}
            key={index}
            mr={2}
            mb={2}
          >
            <Link href={href} noUnderline>
              <CollectionTitles title={title} />
            </Link>
          </CollectionBox>
        )
      }
    )

    return (
      <>
        <Sans size="3" weight="medium" color="black100" mb={2}>
          Artist Collections
        </Sans>

        <Media lessThan="lg">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {items.slice(0, 3)}
          </Flex>
        </Media>

        <Media greaterThan="md">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {items}
          </Flex>
        </Media>
      </>
    )
  }
}

export const MarketingCollectionsPreviewFragmentContainer = createFragmentContainer(
  (props: MarketingCollectionsPreviewProps) => {
    return (
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return (
            <MarketingCollectionsPreview searchState={searchState} {...props} />
          )
        }}
      </Subscribe>
    )
  },
  graphql`
    fragment MarketingCollectionsPreview_marketingCollections on MarketingCollection
      @relay(plural: true) {
      title
      slug
      headerImage
    }
  `
)
