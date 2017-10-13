import { Article } from "./Article"
import * as Constants from "./Constants"
import { Header } from "./Header/Header"
import { RelatedArticlesCanvas } from "./RelatedArticles/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "./RelatedArticles/RelatedArticlesPanel"
import { Artwork } from "./Sections/Artwork"
import { Authors } from "./Sections/Authors"
import { Caption } from "./Sections/Caption"
import { Embed } from "./Sections/Embed"
import { FullscreenViewer } from "./Sections/FullscreenViewer/FullscreenViewer"
import { Image } from "./Sections/Image"
import { ImageCollection } from "./Sections/ImageCollection"
import { ImageSetPreview } from "./Sections/ImageSetPreview"
import { ImageSetPreviewClassic } from "./Sections/ImageSetPreviewClassic"
import { Text } from "./Sections/Text"
import { Video } from "./Sections/Video"

// Icon SVGs
import { IconEditEmbed } from "./Icon/IconEditEmbed"
import { IconEditImages } from "./Icon/IconEditImages"
import { IconEditSection } from "./Icon/IconEditSection"
import { IconEditText } from "./Icon/IconEditText"
import { IconEditVideo } from "./Icon/IconEditVideo"
import { IconHeroImage } from "./Icon/IconHeroImage"
import { IconHeroVideo } from "./Icon/IconHeroVideo"
import { IconImageFullscreen } from "./Icon/IconImageFullscreen"
import { IconImageSet } from "./Icon/IconImageSet"
import { IconLayoutFullscreen } from "./Icon/IconLayoutFullscreen"
import { IconLayoutSplit } from "./Icon/IconLayoutSplit"
import { IconLayoutText } from "./Icon/IconLayoutText"
import { IconRemove } from "./Icon/IconRemove"

// Test Fixtures
import {
  ClassicArticle,
  FeatureArticle,
  ImageHeavyStandardArticle,
  ShortStandardArticle,
  StandardArticle,
} from "./Fixtures/Articles"

export const components = {
  Article,
  Artwork,
  Authors,
  Constants,
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
    IconEditEmbed,
    IconEditImages,
    IconEditSection,
    IconEditText,
    IconEditVideo,
    IconHeroImage,
    IconHeroVideo,
    IconImageFullscreen,
    IconImageSet,
    IconLayoutFullscreen,
    IconLayoutSplit,
    IconLayoutText,
    IconRemove,
  },
  Fixtures: {
    ClassicArticle,
    FeatureArticle,
    ImageHeavyStandardArticle,
    ShortStandardArticle,
    StandardArticle,
  },
}
