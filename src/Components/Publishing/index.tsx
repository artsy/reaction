// Components
export { Article } from "./Article"
export { Header } from "./Header/Header"
export { RelatedArticlesCanvas } from "./RelatedArticles/RelatedArticlesCanvas"
export { RelatedArticlesPanel } from "./RelatedArticles/RelatedArticlesPanel"
export { Artwork } from "./Sections/Artwork"
export { Authors } from "./Sections/Authors"
export { Caption } from "./Sections/Caption"
export { Embed } from "./Sections/Embed"
export { FullscreenViewer } from "./Sections/FullscreenViewer/FullscreenViewer"
export { Image } from "./Sections/Image"
export { ImageCollection } from "./Sections/ImageCollection"
export { ImageSetPreview } from "./Sections/ImageSetPreview"
export { ImageSetPreviewClassic } from "./Sections/ImageSetPreviewClassic"
export { Text } from "./Sections/Text"
export { Video } from "./Sections/Video"

// Icon SVGs
export { IconEditEmbed } from "./Icon/IconEditEmbed"
export { IconEditImages } from "./Icon/IconEditImages"
export { IconEditSection } from "./Icon/IconEditSection"
export { IconEditText } from "./Icon/IconEditText"
export { IconEditVideo } from "./Icon/IconEditVideo"
export { IconHeroImage } from "./Icon/IconHeroImage"
export { IconHeroVideo } from "./Icon/IconHeroVideo"
export { IconImageFullscreen } from "./Icon/IconImageFullscreen"
export { IconImageSet } from "./Icon/IconImageSet"
export { IconLayoutFullscreen } from "./Icon/IconLayoutFullscreen"
export { IconLayoutSplit } from "./Icon/IconLayoutSplit"
export { IconLayoutText } from "./Icon/IconLayoutText"
export { IconRemove } from "./Icon/IconRemove"

// Test Fixtures
import {
  ClassicArticle,
  FeatureArticle,
  ImageHeavyStandardArticle,
  ShortStandardArticle,
  StandardArticle,
} from "./Fixtures/Articles"

// FIXME: Refactor out SizeMe; see https://github.com/ctrlplusb/react-sizeme#server-side-rendering
import sizeMe from "react-sizeme"
sizeMe.noPlaceholders = true

export const Fixtures = {
  ClassicArticle,
  FeatureArticle,
  ImageHeavyStandardArticle,
  ShortStandardArticle,
  StandardArticle,
}


// Constants
import * as AllConstants from "./Constants"
export const Constants = AllConstants
