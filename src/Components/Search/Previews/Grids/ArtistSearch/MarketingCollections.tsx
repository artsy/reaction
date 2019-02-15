import { Box, color, Flex, Link, Sans, Serif, space } from "@artsy/palette"
import { MarketingCollectionsPreview_marketingCollections } from "__generated__/MarketingCollectionsPreview_marketingCollections.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { crop } from "Utils/resizer"

interface MarketingCollectionsPreviewProps {
  marketingCollections: MarketingCollectionsPreview_marketingCollections
}

const CollectionBox = styled(Box)<{ imageUrl: string }>`
  margin-right: ${space(2)}px;
  margin-bottom: ${space(2)}px;
  width: 185px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${p => p.imageUrl}) center;

  &:hover {
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

export const MarketingCollectionsPreview: React.SFC<
  MarketingCollectionsPreviewProps
> = ({ marketingCollections }) => {
  const items = marketingCollections.map(
    ({ headerImage, title, slug }, index) => {
      const href = `collection/${slug}`
      const imageUrl = crop(headerImage, {
        width: 185,
        height: 80,
      })

      return (
        <CollectionBox imageUrl={imageUrl} key={index}>
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
      <Flex alignItems="flex-start" flexWrap="wrap">
        {items}
      </Flex>
    </>
  )
}

export const MarketingCollectionsPreviewFragmentContainer = createFragmentContainer(
  MarketingCollectionsPreview,
  graphql`
    fragment MarketingCollectionsPreview_marketingCollections on MarketingCollection
      @relay(plural: true) {
      title
      slug
      headerImage
    }
  `
)
