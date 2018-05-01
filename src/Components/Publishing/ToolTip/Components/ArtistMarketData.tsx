import styled from "styled-components"
import React from "react"
import { countBy, intersection, flatten, map } from "lodash"
import { unica } from "Assets/Fonts"
import { ArtistProps } from "../Artist"
import { ToolTipDescription } from "./Description"
import { Truncator } from "../../Sections/Truncator"

const ALLOWED_CATEGORIES = ["blue-chip", "top-established", "top-emerging"]

export class ArtistMarketData extends React.Component<ArtistProps> {
  hasGalleryData = () => {
    return intersection(this.galleryCategories(), ALLOWED_CATEGORIES).length > 0
  }

  hasCollections = () => {
    const { collections } = this.props
    return collections && collections.length > 0
  }

  hasAuctionRecord = () => {
    const { auctionResults } = this.props
    return auctionResults && auctionResults.edges.length > 0
  }

  galleryCategories = () => {
    const { highlights } = this.props
    const partners = highlights.partners ? highlights.partners.edges : []

    return map(flatten(map(partners, "node.categories")), "id")
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

  renderCollections = () => {
    if (this.hasCollections()) {
      const { collections } = this.props
      let text

      if (collections.length > 1) {
        text = `In the collections of ${collections.join(", ")}`
      } else {
        text = `In the collection of ${collections[0]}`
      }
      return <div>{text}</div>
    }
  }

  renderAuctionRecord = () => {
    if (this.hasAuctionRecord()) {
      const auctionRecord = this.props.auctionResults.edges[0].node
        .price_realized.display

      return <div>{auctionRecord} auction record</div>
    }
  }

  renderArtistGenes = () => {
    // TODO: Artist genes
    return <ToolTipDescription text={this.props.blurb} />
  }

  render() {
    const hasMarketData =
      this.hasCollections() || this.hasGalleryData() || this.hasAuctionRecord()

    return (
      <Wrapper>
        {hasMarketData ? (
          <Truncator maxLineCount={3}>
            {this.renderGalleryCategories()}
            {this.renderCollections()}
            {this.renderAuctionRecord()}
          </Truncator>
        ) : (
          this.renderArtistGenes()
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  ${unica("s12")};
  padding: 10px 0;
`
