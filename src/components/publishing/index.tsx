import Article from "./article"
import FeatureHeader from "./header/feature_header"
import Header from "./header/header"
import Artwork from "./sections/artwork"
import Authors from "./sections/authors"
import Caption from "./sections/caption"
import Embed from "./sections/embed"
import FullscreenViewer from "./sections/fullscreen_viewer/fullscreen_viewer"
import Image from "./sections/image"
import ImageCollection from "./sections/image_collection"
import ImageSetPreview from "./sections/imageset_preview"
import ImageSetPreviewClassic from "./sections/imageset_preview_classic"
import Text from "./sections/text"
import Video from "./sections/video"

// Icon SVGs
import ImageSet from "./icon/image_set"
import Remove from "./icon/remove"

export default {
  Article,
  Artwork,
  Authors,
  Embed,
  Caption,
  FeatureHeader,
  FullscreenViewer,
  Header,
  Image,
  ImageCollection,
  ImageSetPreview,
  ImageSetPreviewClassic,
  Text,
  Video,
  Icon: {
    ImageSet,
    Remove,
  },
}
