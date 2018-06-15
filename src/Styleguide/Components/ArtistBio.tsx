import React from "react"
import { ReadMore } from "./ReadMore"
import { Responsive } from "Styleguide/Utils/Responsive"

export class ArtistBio extends React.Component {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <ReadMore>{this.props.children}</ReadMore>
          return <ReadMore maxLineCount={10}>{this.props.children}</ReadMore>
        }}
      </Responsive>
    )
  }
}
