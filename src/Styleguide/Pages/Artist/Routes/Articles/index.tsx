import React from "react"
import { ArticlesRefetchContainer } from "./ArticlesRefetchContainer"

interface Props {
  artist: any
}

export class ArticlesRoute extends React.Component<Props> {
  render() {
    return <ArticlesRefetchContainer artist={this.props.artist} />
  }
}
