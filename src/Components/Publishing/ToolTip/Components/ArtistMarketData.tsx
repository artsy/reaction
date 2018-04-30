import styled from "styled-components"
import React from "react"
import { countBy, intersection, flatten, map } from "lodash"
import { unica } from "Assets/Fonts"
import { ArtistProps } from "../Artist"
import { ToolTipDescription } from "./Description"

const ALLOWED_CATEGORIES = ["blue-chip", "top-established", "top-emerging"]

export class ArtistMarketData extends React.Component<ArtistProps> {
  galleryCategories = () => {
    const { highlights } = this.props
    const partners = highlights.partners ? highlights.partners.edges : []

    return map(flatten(map(partners, "node.categories")), "id")
  }

  hasGalleryData = () => {
    return intersection(this.galleryCategories(), ALLOWED_CATEGORIES).length > 0
  }

  hasCollections = () => {
    const { collections } = this.props
    return collections && collections.length > 0
  }

  renderGalleryCategories = () => {
    if (this.hasGalleryData()) {
      return ALLOWED_CATEGORIES.map((category, i) => {
        return this.renderGalleryCategory(category, i)
      })
    }
  }

  renderGalleryCategory = (category, i) => {
    const records = countBy(this.galleryCategories(), x => x === category).true

    if (records) {
      let formattedCategory
      const formattedCategoryName = category.replace("-", " ")

      if (records > 1) {
        formattedCategory = `${formattedCategoryName} galleries`
      } else {
        formattedCategory = `a ${formattedCategoryName} gallery`
      }
      return <div key={i}>Represented by {formattedCategory}</div>
    } else {
      return null
    }
  }

  renderMarketData = () => {
    return (
      <div>
        {this.renderGalleryCategories()}
        {this.hasCollections() && <div>Collected by major museums</div>}
      </div>
    )
  }

  renderArtistCategories = () => {
    // TODO: Artist genes
    return <ToolTipDescription text={this.props.blurb} />
  }

  render() {
    // TODO: Auction results
    const hasMarketData = this.hasCollections() || this.hasGalleryData()

    return (
      <Wrapper>
        {hasMarketData
          ? this.renderMarketData()
          : this.renderArtistCategories()}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  ${unica("s12")};
  padding: 10px 0;
`

// {
//   artist(id: "andy-warhol") {
//   	name
//     image {
//       cropped(width: 240, height: 160) {
//         url
//       }
//     }
//     formatted_nationality_and_birthday
//     href
//     blurb
//     carousel {
//       images {
//         resized(height:200){
//           url
//           width
//           height
//         }
//       }
//     }
//     collections
//     highlights {
//       partners(
//         first: 5
//         display_on_partner_profile: true
//         represented_by: true
//         partner_category: ["blue-chip", "top-established", "top-emerging"]
//       ) {
//         edges {
//           node {
//             categories {
//               id
//             }
//           }
//         }
//       }
//     }
//     auctionResults(
//       recordsTrusted: true
//       first: 1
//       sort: PRICE_AND_DATE_DESC
//     ) {
//       edges {
//         node {
//           organization
//         }
//       }
//     }
//   }
// }
