import { CSSGrid } from "@artsy/palette"
import { Serif } from "@artsy/palette"
import { CollectionsHubsHomepageNav_marketingCollections } from "__generated__/CollectionsHubsHomepageNav_marketingCollections.graphql"
import { placeholderImages } from "Components/v2/CollectionsHubsNav"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsHomepageNavProps {
  marketingCollections: CollectionsHubsHomepageNav_marketingCollections
}

export const CollectionsHubsHomepageNav: FC<
  CollectionsHubsHomepageNavProps
> = props => {
  return (
    <CSSGrid
      as="aside"
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gridGap={20}
    >
      {props.marketingCollections.map((hub, index) => (
        <ImageLink
          to={`/collection/${hub.slug}`}
          src={placeholderImages[index]}
          ratio={[0.49]}
          title={<Serif size={["3", "4"]}>{hub.title}</Serif>}
          subtitle={<Serif size="2">{subtitleFor(hub.title, index)}</Serif>}
          key={hub.id}
        />
      ))}
    </CSSGrid>
  )
}

export const CollectionsHubsHomepageNavFragmentContainer = createFragmentContainer(
  CollectionsHubsHomepageNav,
  {
    marketingCollections: graphql`
      fragment CollectionsHubsHomepageNav_marketingCollections on MarketingCollection
        @relay(plural: true) {
        id
        slug
        title
        thumbnail
      }
    `,
  }
)

/*
 * This is a customization just for the homepage entry-points use case.
 *
 * Valid hub collections will have a subtitle defined here, rather than in KAWS.
 * This mapping therefore will need to kept in sync as hubs are rotated
 * in/out of the entrypoint.
 *
 * TODO: remove (or replace with safer) placeholder once we have real data.
 */

const subtitlesMapping = {
  Contemporary: "Today’s leading artists and emerging talents",
  "Post-War": "From Abstract Expressionism to Pop Art",
  "Impressionist & Modern": "The birth of abstraction, Surrealism, and Dada",
  "Pre-20th Century": "Ancient Rome, the Renaissance, Baroque, and more",
  Photography: "Through the lens—from daguerreotypes to digital",
  "Street Art": "The rise of graffiti, vinyl toys, and skate culture",
}

const subtitleFor = (title: string, index: number) => {
  return (
    subtitlesMapping[title] ||
    /* placeholder */
    Object.values(subtitlesMapping)[index]
  )
}
