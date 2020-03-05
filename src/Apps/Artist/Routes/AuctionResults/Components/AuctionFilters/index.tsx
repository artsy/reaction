import React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { MediumFilter } from "./MediumFilter"
import { SizeFilter } from "./SizeFilter"

export const AuctionFilters: React.FC = () => {
  return (
    <>
      <MediumFilter />
      <SizeFilter />
      <AuctionHouseFilter />
    </>
  )
}
