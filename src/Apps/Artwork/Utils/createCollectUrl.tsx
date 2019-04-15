import * as qs from "qs"
import { data as sd } from "sharify"

export const createCollectUrl = ({
  minCents,
  maxCents,
  category,
  widthCm,
  heightCm,
  artistId,
}) => {
  const area = heightCm * widthCm

  let min
  let max

  min = Math.round(70 / 2.54)
  max = "*"
  if (area < 40 * 40) {
    min = 0
    max = Math.round(40 / 2.54)
  } else if (area < 70 * 70) {
    min = Math.round(40 / 2.54)
    max = Math.round(70 / 2.54)
  }

  const minDollars = Math.round(minCents / 100)
  const maxDollars = Math.round(maxCents / 100)
  const query = qs.stringify({
    page: 1,
    sort: "-decayed_merch",
    acquireable: "true",
    offerable: "true",
    inquireable_only: "true",
    height: `${min}-${max}`,
    width: `${min}-${max}`,
    priceRange: `${minDollars}-${maxDollars}`,
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
