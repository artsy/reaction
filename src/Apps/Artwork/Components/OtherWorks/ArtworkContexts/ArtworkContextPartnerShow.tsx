import React from "react"
import { Header } from "../Header"
import {
  // ArtistArtworkGrid,
  PartnerArtworkGrid,
  RelatedWorksArtworkGrid,
  ShowArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextPartnerShow = () => {
  return (
    <>
      <Header
        title="Other works from the gallery"
        buttonHref="http://fixme.net/show/the-gallery-show-id"
      />
      <ShowArtworkGrid />
      {/* <ArtistArtworkGrid /> */}
      <PartnerArtworkGrid />
      <RelatedWorksArtworkGrid />
    </>
  )
}
