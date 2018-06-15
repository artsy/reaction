import React from "react"
import { ReadMore } from "./ReadMore"
import { Responsive } from "Styleguide/Utils/Responsive"

export class ArtistBio extends React.Component {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <ReadMore>{this.props.children}</ReadMore>
          return <ReadMore maxLineCount={7}>{this.props.children}</ReadMore>
        }}
      </Responsive>
    )
  }
}
