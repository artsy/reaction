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
import { ImageSetPreview } from "./Sections/ImagesetPreview"
import { ImageSetPreviewClassic } from "./Sections/ImagesetPreviewClassic"
import { Text } from "./Sections/Text"
import { Video } from "./Sections/Video"

// Icon SVGs
import { EditEmbed } from "./Icon/EditEmbed"
import { EditImages } from "./Icon/EditImages"
import { EditSection } from "./Icon/EditSection"
import { EditText } from "./Icon/EditText"
import { EditVideo } from "./Icon/EditVideo"
import { HeroImage } from "./Icon/HeroImage"
import { HeroVideo } from "./Icon/HeroVideo"
import { ImageFullscreen } from "./Icon/ImageFullscreen"
import { ImageSet } from "./Icon/ImageSet"
import { LayoutFullscreen } from "./Icon/LayoutFullscreen"
import { LayoutSplit } from "./Icon/LayoutSplit"
import { LayoutText } from "./Icon/LayoutText"
import { Remove } from "./Icon/Remove"

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
    EditEmbed,
    EditImages,
    EditSection,
    EditText,
    EditVideo,
    HeroImage,
    HeroVideo,
    ImageFullscreen,
    ImageSet,
    LayoutFullscreen,
    LayoutSplit,
    LayoutText,
    Remove,
  },
  Fixtures: {
    ClassicArticle,
    FeatureArticle,
    ImageHeavyStandardArticle,
    ShortStandardArticle,
    StandardArticle,
  },
}
