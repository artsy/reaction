import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "Artsy/Relay/RootQueryRenderer"
import RelayArtworkGrid, { ArtworkGrid } from "../ArtworkGrid"

export function ArtworkGridExample(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtworkGridQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworks_connection(first: 10) {
              ...ArtworkGrid_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && (
            <RelayArtworkGrid {...readyState.props.artist as any} {...props} />
          )
        )
      }}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module)
  .add("A typical grid", () => {
    return <ArtworkGridExample artistID="banksy" />
  })
  .add("Without Relay", () => {
    return <ArtworkGrid artworks={artworks as any} useRelay={false} />
  })

const artworks = {
  edges: [
    {
      node: {
        __id: "QXJ0d29yazpiYW5rc3ktd2UtbG92ZS15b3Utc28tbG92ZS11cw==",
        image: {
          aspect_ratio: 1,
          placeholder: "100%",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/hoFocUdpgF4mazPIgekpZA/large.jpg",
        },
        href: "/artwork/banksy-we-love-you-so-love-us",
        title: "We Love You So Love Us",
        date: "2000",
        sale_message: "Contact For Price",
        cultural_maker: null,
        artists: [
          {
            __id: "QXJ0aXN0OmJhbmtzeQ==",
            href: "/artist/banksy",
            name: "Banksy",
          },
        ],
        collecting_institution: null,
        partner: {
          name: "EHC Fine Art",
          href: "/ehc-fine-art",
          __id: "UGFydG5lcjplaGMtZmluZS1hcnQ=",
          type: "Gallery",
        },
        sale: null,
        _id: "58e1a19d275b247d353ff0d9",
        is_inquireable: true,
        sale_artwork: null,
        id: "banksy-we-love-you-so-love-us",
        is_saved: null,
      },
    },
    {
      node: {
        __id: "QXJ0d29yazpiYW5rc3ktcmFkYXItcmF0LWRpcnR5LWZ1bmtlci1scA==",
        image: {
          aspect_ratio: 1,
          placeholder: "100%",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/NQvnb87U8oGDm6kpdJ9jLA/large.jpg",
        },
        href: "/artwork/banksy-radar-rat-dirty-funker-lp",
        title: "Radar Rat (Dirty Funker LP)",
        date: "2008",
        sale_message: "$950",
        cultural_maker: null,
        artists: [
          {
            __id: "QXJ0aXN0OmJhbmtzeQ==",
            href: "/artist/banksy",
            name: "Banksy",
          },
        ],
        collecting_institution: null,
        partner: {
          name: "EHC Fine Art",
          href: "/ehc-fine-art",
          __id: "UGFydG5lcjplaGMtZmluZS1hcnQ=",
          type: "Gallery",
        },
        sale: null,
        _id: "58e1a19ecd530e4d612cb07f",
        is_inquireable: true,
        sale_artwork: null,
        id: "banksy-radar-rat-dirty-funker-lp",
        is_saved: null,
      },
    },
    {
      node: {
        __id: "QXJ0d29yazpiYW5rc3ktZmxvd2VyLWJvbWJlci1ieS1icmFuZGFsaXNt",
        image: {
          aspect_ratio: 1.5,
          placeholder: "66.66666666666666%",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/large.jpg",
        },
        href: "/artwork/banksy-flower-bomber-by-brandalism",
        title: "Flower Bomber (by Brandalism)",
        date: "ca. 2017",
        sale_message: "Contact For Price",
        cultural_maker: null,
        artists: [
          {
            __id: "QXJ0aXN0OmJhbmtzeQ==",
            href: "/artist/banksy",
            name: "Banksy",
          },
        ],
        collecting_institution: null,
        partner: {
          name: "EHC Fine Art",
          href: "/ehc-fine-art",
          __id: "UGFydG5lcjplaGMtZmluZS1hcnQ=",
          type: "Gallery",
        },
        sale: null,
        _id: "58e1a19f275b247d353ff0e2",
        is_inquireable: true,
        sale_artwork: null,
        id: "banksy-flower-bomber-by-brandalism",
        is_saved: null,
      },
    },
    {
      node: {
        __id: "QXJ0d29yazpiYW5rc3ktZ2lybC13aXRoLWJhbGxvb24tMTQ=",
        image: {
          aspect_ratio: 0.75,
          placeholder: "132.9%",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/RRGE9Ild18_IPghZXT6wuQ/large.jpg",
        },
        href: "/artwork/banksy-girl-with-balloon-14",
        title: "Girl With Balloon",
        date: "2004",
        sale_message: "Contact For Price",
        cultural_maker: null,
        artists: [
          {
            __id: "QXJ0aXN0OmJhbmtzeQ==",
            href: "/artist/banksy",
            name: "Banksy",
          },
        ],
        collecting_institution: null,
        partner: {
          name: "Graffik Gallery / Banksy Editions",
          href: "/graffik-gallery-slash-banksy-editions",
          __id: "UGFydG5lcjpncmFmZmlrLWdhbGxlcnktc2xhc2gtYmFua3N5LWVkaXRpb25z",
          type: "Gallery",
        },
        sale: null,
        _id: "58e370659c18db774f25ed5b",
        is_inquireable: true,
        sale_artwork: null,
        id: "banksy-girl-with-balloon-14",
        is_saved: null,
      },
    },
  ],
}
