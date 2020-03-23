import React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "Utils/getENV"

interface ArtistConsignMeta {
  artistName: string
  artistHref: string
  imageURL: string
}

export const ArtistConsignMeta: React.FC<ArtistConsignMeta> = props => {
  const { artistName, artistHref, imageURL } = props
  const appURL = getENV("APP_URL")
  const title = `Sell Works by ${artistName}`
  const description = `Learn more about the market for ${artistName} works and receive a price estimate. Submit a work from ${artistName} for consignment, and our experts will guide you through selling with an auction house, gallery, or private collector.`

  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      {imageURL && <Meta name="thumbnail" content={imageURL} />}
      <Link rel="canonical" href={`${appURL}${artistHref}/consign`} />
      <Meta property="twitter:description" content={description} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:url" content={`${appURL}${artistHref}/consign`} />
      <Meta
        property="og:type"
        content={`${getENV("FACEBOOK_APP_NAMESPACE")}:artwork`}
      />
    </>
  )
}
