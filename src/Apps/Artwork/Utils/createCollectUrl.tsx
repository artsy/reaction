import * as qs from "qs"
import { data as sd } from "sharify"

export const createCollectUrl = (
  dimension: string,
  category: string,
  artistId: string
) => {
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

// these come from MediumFilter.tsx
const filterCategories = {
  Architecture: "",
  "Books and Portfolios": "",
  "Design/Decorative Art": "design",
  "Drawing, Collage or other Work on Paper": "drawing",
  "Fashion Design and Wearable Art": "wearable art",
  Installation: "installation",
  Jewelry: "jewelry",
  "Mixed Media": "",
  Other: "",
  Painting: "painting",
  "Performance Art": "performance-art",
  Photography: "photography",
  Posters: "",
  Print: "prints",
  Sculpture: "sculpture",
  Sound: "",
  "Textile Arts": "",
  "Video/Film/Animation": "film-slash-video",
  "Work on Paper": "work-on-paper",
}
