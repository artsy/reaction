import { get } from "Utils/get"

export {
  ArtistArtworkGridFragmentContainer as ArtistArtworkGrid,
} from "./ArtistArtworkGrid"

export {
  AuctionArtworkGridFragmentContainer as AuctionArtworkGrid,
} from "./AuctionArtworkGrid"

export {
  FairArtworkGridFragmentContainer as FairArtworkGrid,
} from "./FairArtworkGrid"

export {
  PartnerShowArtworkGridFragmentContainer as PartnerShowArtworkGrid,
} from "./PartnerShowArtworkGrid"

export {
  PartnerArtworkGridFragmentContainer as PartnerArtworkGrid,
} from "./PartnerArtworkGrid"

export {
  RelatedWorksArtworkGridRefetchContainer as RelatedWorksArtworkGrid,
} from "./RelatedWorksArtworkGrid"

// Utils

/**
 * Check to see if a connection's edges have a length; if false hide the grid.
 */
export function hideGrid(artworksConnection): boolean {
  return Boolean(get(artworksConnection, p => !p.edges.length))
}
