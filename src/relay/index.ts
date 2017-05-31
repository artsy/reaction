import { artsyNetworkLayer, artsyRelayEnvironment } from "./config"
import ArtistQueryConfig from "./queries/artist"
import ArtworkQueryConfig from "./queries/artwork"
import CurrentUserRoute from "./queries/current_user"
import FilterArtworksQueryConfig from "./queries/filter_artworks"
import GeneQueryConfig from "./queries/gene"

export default {
  artsyNetworkLayer,
  artsyRelayEnvironment,
  ArtistQueryConfig,
  ArtworkQueryConfig,
  CurrentUserRoute,
  FilterArtworksQueryConfig,
  GeneQueryConfig,
}
