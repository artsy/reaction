import Article from "./article"
import Header from "./header/header"
import RelatedArticlesCanvas from "./related_articles/related_articles_canvas"
import RelatedArticlesPanel from "./related_articles/related_articles_panel"
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
import LayoutFullscreen from "./icon/layout_fullscreen"
import LayoutSplit from "./icon/layout_split"
import LayoutText from "./icon/layout_text"
import Remove from "./icon/remove"

export default {
  Article,
  Artwork,
  Authors,
  Embed,
  Caption,
  FullscreenViewer,
  Header,
  Image,
  ImageCollection,
  ImageSetPreview,
  ImageSetPreviewClassic,
  RelatedArticlesCanvas,
  RelatedArticlesPanel,
  Text,
  Video,
  Icon: {
    ImageSet,
    LayoutFullscreen,
    LayoutSplit,
    LayoutText,
    Remove,
  },
}
