import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Header } from "../Header"

storiesOf("Apps/Artwork Page/Components/OtherWorks", module)
  .add("Header", () => (
    <Header buttonHref="http://foo.com" title="Other works by David Hockney" />
  ))
  .add("With content", () => (
    <Header buttonHref="http://foo.com" title="Other works by David Hockney">
      Some content
    </Header>
  ))
