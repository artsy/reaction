import { LayerFixture, LayersFixture } from "./RelatedWorksArtworkGrid.fixture"

export const ArtworkContextAuctionFixture = {
  artwork: {
    ...LayerFixture,
    ...LayersFixture,

    artist: {
      name: "Allison Baker",
      href: "/artist/foo",
    },
    sale: {
      href: "/auction/shared-live-mocktion-k8s",
      is_closed: false,
      __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
      artworksConnection: {
        edges: [
          {
            node: {
              __id: "QXJ0d29yazphbGxpc29uLWJha2VyLWVubnVp",
              image: {
                aspect_ratio: 0.86,
                placeholder: "116.76168757126568%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/iuOlXB2czAI76b0llHHReA/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/allison-baker-ennui",
              title: "Ennui",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0OmFsbGlzb24tYmFrZXI=",
                  href: "/artist/allison-baker",
                  name: "Allison Baker",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 18,000" },
                __id: "U2FsZUFydHdvcms6YWxsaXNvbi1iYWtlci1lbm51aQ==",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f6b94a94d0007afe818",
              is_inquireable: true,
              id: "allison-baker-ennui",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazpyZWJlY2NhLWxldml0YW4taW5zZWN0cw==",
              image: {
                aspect_ratio: 0.86,
                placeholder: "116.76168757126568%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/1WoD7EcVlpp4vJnt2ZlGsw/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/rebecca-levitan-insects",
              title: "Insects",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0OnJlYmVjY2EtbGV2aXRhbg==",
                  href: "/artist/rebecca-levitan",
                  name: "Rebecca Levitan",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 40,000" },
                __id: "U2FsZUFydHdvcms6cmViZWNjYS1sZXZpdGFuLWluc2VjdHM=",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f6d94a94d0007afe828",
              is_inquireable: true,
              id: "rebecca-levitan-insects",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazphcm5vdXQtbWVpamVyLWNsb3du",
              image: {
                aspect_ratio: 0.64,
                placeholder: "155.8599695585997%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/ThC9BqVtqU9QsG1GAagdtQ/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/arnout-meijer-clown",
              title: "Clown",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0OmFybm91dC1tZWlqZXI=",
                  href: "/artist/arnout-meijer",
                  name: "Arnout Meijer",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 1,300" },
                __id: "U2FsZUFydHdvcms6YXJub3V0LW1laWplci1jbG93bg==",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f6e94a94d0007afe830",
              is_inquireable: true,
              id: "arnout-meijer-clown",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazphZGwtc3VycmVhbGlzbQ==",
              image: {
                aspect_ratio: 1.2,
                placeholder: "83.203125%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/eyVKPZQ37URXKmzNxS43ug/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/adl-surrealism",
              title: "Surrealism",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                { __id: "QXJ0aXN0OmFkbA==", href: "/artist/adl", name: "ADL" },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 45,000" },
                __id: "U2FsZUFydHdvcms6YWRsLXN1cnJlYWxpc20=",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f6f94a94d0007afe838",
              is_inquireable: true,
              id: "adl-surrealism",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazp0b20tYmxhY2hmb3JkLXBhaW50aW5n",
              image: {
                aspect_ratio: 1.36,
                placeholder: "73.33984375%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/36cIisheO4ajh5CsWxpjSg/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/tom-blachford-painting",
              title: "Painting",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0OnRvbS1ibGFjaGZvcmQ=",
                  href: "/artist/tom-blachford",
                  name: "Tom Blachford",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 120,000" },
                __id: "U2FsZUFydHdvcms6dG9tLWJsYWNoZm9yZC1wYWludGluZw==",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f6f94a94d0007afe840",
              is_inquireable: true,
              id: "tom-blachford-painting",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazptYXJpZS1qYWNvdGV5LXNlbGYtcG9ydHJhaXQ=",
              image: {
                aspect_ratio: 1.2,
                placeholder: "83.203125%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/xuPmzirKy5XEv_E7J3Jq0w/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/marie-jacotey-self-portrait",
              title: "Self-Portrait",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0Om1hcmllLWphY290ZXk=",
                  href: "/artist/marie-jacotey",
                  name: "Marie Jacotey",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 700" },
                __id: "U2FsZUFydHdvcms6bWFyaWUtamFjb3RleS1zZWxmLXBvcnRyYWl0",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f7094a94d0007afe848",
              is_inquireable: true,
              id: "marie-jacotey-self-portrait",
              is_saved: false,
            },
          },
          {
            node: {
              __id:
                "QXJ0d29yazphcm5hdWQtbWFndWV0LWFuZC1vbGl2aWVyLW1pbGxhZ291LWVubnVp",
              image: {
                aspect_ratio: 0.86,
                placeholder: "116.76168757126568%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/JDsZEIBhTRKYllrctbXGKw/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/arnaud-maguet-and-olivier-millagou-ennui",
              title: "Ennui",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id:
                    "QXJ0aXN0OmFybmF1ZC1tYWd1ZXQtYW5kLW9saXZpZXItbWlsbGFnb3U=",
                  href: "/artist/arnaud-maguet-and-olivier-millagou",
                  name: "Arnaud Maguet & Olivier Millagou",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 6,500" },
                __id:
                  "U2FsZUFydHdvcms6YXJuYXVkLW1hZ3VldC1hbmQtb2xpdmllci1taWxsYWdvdS1lbm51aQ==",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f7194a94d0007afe850",
              is_inquireable: true,
              id: "arnaud-maguet-and-olivier-millagou-ennui",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazpzdXNhbm5haC1tYXJ0aW4tZW5udWk=",
              image: {
                aspect_ratio: 0.67,
                placeholder: "149.9267935578331%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/Mzc4jY741_S1M9uQRwLgLg/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/susannah-martin-ennui",
              title: "Ennui",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0OnN1c2FubmFoLW1hcnRpbg==",
                  href: "/artist/susannah-martin",
                  name: "Susannah Martin",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 4,500" },
                __id: "U2FsZUFydHdvcms6c3VzYW5uYWgtbWFydGluLWVubnVp",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f7194a94d0007afe858",
              is_inquireable: true,
              id: "susannah-martin-ennui",
              is_saved: false,
            },
          },
          {
            node: {
              __id: "QXJ0d29yazp0aG9tYXMtcGFxdWV0dGUtZW5udWk=",
              image: {
                aspect_ratio: 1.36,
                placeholder: "73.33984375%",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/cRxCO6RTmOU9PUL6ONOwig/large.jpg",
              },
              is_biddable: true,
              sale: {
                is_preview: false,
                __id: "U2FsZTpzaGFyZWQtbGl2ZS1tb2NrdGlvbi1rOHM=",
                is_auction: true,
                is_live_open: false,
                is_open: true,
                is_closed: false,
                display_timely_at: "live in 3Y",
              },
              is_acquireable: false,
              href: "/artwork/thomas-paquette-ennui",
              title: "Ennui",
              date: "",
              sale_message: "Contact For Price",
              cultural_maker: null,
              artists: [
                {
                  __id: "QXJ0aXN0OnRob21hcy1wYXF1ZXR0ZQ==",
                  href: "/artist/thomas-paquette",
                  name: "Thomas Paquette",
                },
              ],
              collecting_institution: null,
              partner: {
                name: "Mocktion Demo Partner Shared Live Mocktion K8S",
                href: "/auction/mocktion-demo-partner-shared-live-mocktion-k8s",
                __id:
                  "UGFydG5lcjptb2NrdGlvbi1kZW1vLXBhcnRuZXItc2hhcmVkLWxpdmUtbW9ja3Rpb24tazhz",
                type: "Auction House",
              },
              sale_artwork: {
                highest_bid: { display: null, __id: null },
                opening_bid: { display: "CHF 16,000" },
                __id: "U2FsZUFydHdvcms6dGhvbWFzLXBhcXVldHRlLWVubnVp",
                counts: { bidder_positions: 0 },
              },
              _id: "5bfb5f7294a94d0007afe860",
              is_inquireable: true,
              id: "thomas-paquette-ennui",
              is_saved: false,
            },
          },
        ],
      },
    },
    __id: "QXJ0d29yazp5YXZ1ei10YW55ZWxpLXNlbGYtcG9ydHJhaXQ=",
  },
}
