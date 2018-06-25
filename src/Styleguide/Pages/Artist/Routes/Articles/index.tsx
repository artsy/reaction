import React from "react"
import { ArticlesRefetchContainer as Articles } from "./ArticlesRefetchContainer"

interface Props {
  artist: any
}

export class ArticlesRoute extends React.Component<Props> {
  render() {
    return <Articles artist={this.props.artist} />
  }
}
