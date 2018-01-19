import { storiesOf } from "@storybook/react"
import React from "react"
import { SponsoredArticle } from "../Fixtures/Articles"
import { Nav } from "../Nav/Nav"

storiesOf("Publishing/Nav", module)
  .add("Regular", () => {
    return (
      <div>
        Regular:
        <Nav />
        <br />
        Sponsored:
        <Nav sponsor={SponsoredArticle.sponsor} />
      </div>
    )
  })
  .add("Transparent", () => {
    return (
      <div>
        Regular:
        <div style={backgroundStyle}>
          <Nav transparent />
        </div>
        Sponsored:
        <div style={backgroundStyle}>
          <Nav sponsor={SponsoredArticle.sponsor} transparent />
        </div>
      </div>
    )
  })

const backgroundStyle: React.CSSProperties = {
  background:
    "url(https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg)",
  color: "white",
  position: "relative",
  height: "50px",
}
