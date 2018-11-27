import React from "react"
import { Header } from "../Header"
import {
  // ArtistArtworkGrid,
  FairArtworkGrid,
  PartnerArtworkGrid,
  RelatedWorksArtworkGrid,
} from "./ArtworkGrids"

export const ArtworkContextFair = () => {
  return (
    <>
      <Header
        title="Other works from the fair booth"
        buttonHref="http://fixme.net/fairs/the-fair-booth-id"
      />
      <FairArtworkGrid />
      <PartnerArtworkGrid />
      {/* <ArtistArtworkGrid /> */}
      <RelatedWorksArtworkGrid />
    </>
  )
}
