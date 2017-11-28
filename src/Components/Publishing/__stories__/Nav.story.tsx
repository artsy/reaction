import { storiesOf } from "@storybook/react"
import React from "react"
import { FeatureArticle, SponsoredArticle } from "../Fixtures/Articles"
import { Nav } from "../Nav/Nav"

storiesOf("Publishing/Nav", module).add("Regular", () => {
  return (
    <div>
      Regular:
      <Nav article={FeatureArticle} />
      <br />
      Sponsored:
      <Nav article={SponsoredArticle} />
    </div>
  )
})
.add("Transparent", () => {
  return (
    <div style={{
      background: "url(https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg)",
      color: "white"
    }}>
      Regular:
    <Nav article={FeatureArticle} transparent />
      <br />
      Sponsored:
    <Nav article={SponsoredArticle} transparent/>
    </div>
  )
})
