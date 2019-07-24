import { BOB } from "Apps/Collect/Components/Collection/Header/DefaultHeader"

const artworks = [
  {
    href: "/artwork/kaws-kaws-x-undercover-11",
    id: "kaws-kaws-x-undercover-11",
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/uW1NTw1GoTtuViaEFwxX-A/square.jpg",
    image: { width: 2800, __id: "5b7297547c06b34b31d870d4" },
    __id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTEx",
  },
  {
    href:
      "/artwork/kaws-no-future-companion-collaboration-with-hajime-sorayama-black-chrome",
    id:
      "kaws-no-future-companion-collaboration-with-hajime-sorayama-black-chrome",
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/RFC1iwT6hq1QFwrLevkiEw/square.jpg",
    image: { width: 1199, __id: "5acc6297c9dc247dcc317da6" },
    __id:
      "QXJ0d29yazprYXdzLW5vLWZ1dHVyZS1jb21wYW5pb24tY29sbGFib3JhdGlvbi13aXRoLWhhamltZS1zb3JheWFtYS1ibGFjay1jaHJvbWU=",
  },
  {
    href: "/artwork/kaws-kaws-x-undercover-11",
    id: "kaws-kaws-x-undercover-11",
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/uW1NTw1GoTtuViaEFwxX-A/square.jpg",
    image: { width: 2800, __id: "5b7297547c06b34b31d870d4" },
    __id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTEx",
  },
  {
    href:
      "/artwork/kaws-no-future-companion-collaboration-with-hajime-sorayama-black-chrome",
    id:
      "kaws-no-future-companion-collaboration-with-hajime-sorayama-black-chrome",
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/RFC1iwT6hq1QFwrLevkiEw/square.jpg",
    image: { width: 1199, __id: "5acc6297c9dc247dcc317da6" },
    __id:
      "QXJ0d29yazprYXdzLW5vLWZ1dHVyZS1jb21wYW5pb24tY29sbGFib3JhdGlvbi13aXRoLWhhamltZS1zb3JheWFtYS1ibGFjay1jaHJvbWU=",
  },
  {
    href: "/artwork/kaws-kaws-x-undercover-11",
    id: "kaws-kaws-x-undercover-11",
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/uW1NTw1GoTtuViaEFwxX-A/square.jpg",
    image: { width: 2800, __id: "5b7297547c06b34b31d870d4" },
    __id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTEx",
  },
  {
    href:
      "/artwork/kaws-no-future-companion-collaboration-with-hajime-sorayama-black-chrome",
    id:
      "kaws-no-future-companion-collaboration-with-hajime-sorayama-black-chrome",
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/RFC1iwT6hq1QFwrLevkiEw/square.jpg",
    image: { width: 1199, __id: "5acc6297c9dc247dcc317da6" },
    __id:
      "QXJ0d29yazprYXdzLW5vLWZ1dHVyZS1jb21wYW5pb24tY29sbGFib3JhdGlvbi13aXRoLWhhamltZS1zb3JheWFtYS1ibGFjay1jaHJvbWU=",
  },
]

describe("artworks", () => {
  it("returns the same artworks when we call", () => {
    const result = BOB(artworks, 1384)

    expect(result).toHaveLength(6)
  })

  it("returns the same number of artworks passed when viewport can fit all", () => {
    const result = BOB(artworks, 1384)

    expect(result).toHaveLength(6)
  })
})
