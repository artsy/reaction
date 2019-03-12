import { Box, color, Flex, Link, Sans, Serif, space } from "@artsy/palette"
import { MarketingCollectionsPreview_marketingCollections } from "__generated__/MarketingCollectionsPreview_marketingCollections.graphql"
import { SearchBarState } from "Components/Search/state"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { crop } from "Utils/resizer"
import { Media, Responsive } from "Utils/Responsive"

interface MarketingCollectionsPreviewProps {
  marketingCollections: MarketingCollectionsPreview_marketingCollections
  searchState?: SearchBarState
  smallScreen?: boolean
}

const CollectionBox = styled(Box)<{ imageUrl: string; itemsPerRow: 1 | 2 }>`
  width: 185px;
  height: 80px;

  &:nth-child(even) {
    margin-left: ${p => (p.itemsPerRow === 2 ? space(2) : 0)}px;
  }

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

const renderItems = (
  {
    marketingCollections,
    searchState: { state },
  }: MarketingCollectionsPreviewProps,
  itemsPerRow: 1 | 2
) => {
  const displayedItems =
    itemsPerRow === 1 ? marketingCollections.slice(0, 3) : marketingCollections

  return displayedItems.map(({ headerImage, title, slug }, index) => {
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
        mb={2}
        itemsPerRow={itemsPerRow}
      >
        <Link href={href} color="black100" noUnderline tabIndex={0}>
          <CollectionTitles title={title} />
        </Link>
      </CollectionBox>
    )
  })
}

export class MarketingCollectionsPreview extends React.Component<
  MarketingCollectionsPreviewProps
> {
  componentDidMount() {
    const { smallScreen, marketingCollections } = this.props
    const items = marketingCollections.map(({ slug }) => {
      return { href: `${sd.APP_URL}/collection/${slug}` }
    })

    this.props.searchState.registerItems(
      smallScreen ? items.slice(0, 3) : items
    )
  }

  render() {
    return (
      <>
        <Sans size="3" weight="medium" color="black100" mb={2}>
          Artist Collections
        </Sans>

        <Media lessThan="lg">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {renderItems(this.props, 1)}
          </Flex>
        </Media>

        <Media greaterThan="md">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {renderItems(this.props, 2)}
          </Flex>
        </Media>
      </>
    )
  }
}

export const MarketingCollectionsPreviewFragmentContainer = createFragmentContainer(
  (props: MarketingCollectionsPreviewProps) => {
    return (
      <Responsive>
        {({ xs, sm, md }) => {
          return (
            <Subscribe to={[SearchBarState]}>
              {(searchState: SearchBarState) => {
                return (
                  <MarketingCollectionsPreview
                    searchState={searchState}
                    {...props}
                    smallScreen={xs || sm || md}
                  />
                )
              }}
            </Subscribe>
          )
        }}
      </Responsive>
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
