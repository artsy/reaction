import * as qs from "qs"
import { data as sd } from "sharify"

export const createCollectUrl = ({
  dimension,
  category,
  artistId,
}: {
  dimension: "SMALL" | "MEDIUM" | "LARGE" | null
  category: FilterCategory
  artistId: string
}) => {
  let dimensionRange

  if (dimension === "SMALL") {
    dimensionRange = "0-1600"
  } else if (dimension === "MEDIUM") {
    dimensionRange = "1600-4900"
  } else if (dimension === "LARGE") {
    dimensionRange = "4900-*"
  } else {
    dimensionRange = "*-*"
  }

  const query = qs.stringify({
    page: 1,
    sort: "-decayed_merch",
    acquireable: "true",
    offerable: "true",
    inquireable_only: "true",
    dimension_range: dimensionRange,
    artist_id: artistId,
  })

  const path = [sd.APP_URL, "collect", filterCategories[category]]
    .filter(Boolean)
    .join("/")

  return `${path}?${query}`
}

export type FilterCategory = keyof typeof filterCategories

// these come from MediumFilter.tsx
const filterCategories = {
  Architecture: "architecture",
  "Books and Portfolios": "books-and-portfolios",
  "Design/Decorative Art": "design",
  "Drawing, Collage or other Work on Paper": "work-on-paper",
  "Fashion Design and Wearable Art": "fashion-design-and-wearable-art",
  Installation: "installation",
  Jewelry: "jewelry",
  "Mixed Media": "mixed-media",
  Other: "",
  Painting: "painting",
  "Performance Art": "performance-art",
  Photography: "photography",
  Posters: "poster",
  Print: "prints",
  Sculpture: "sculpture",
  Sound: "",
  "Textile Arts": "textiles",
  "Video/Film/Animation": "film-slash-video",
  "Work on Paper": "work-on-paper",
}
