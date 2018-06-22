import React from "react"
import { ArticlesQueryRenderer } from "./ArticlesQueryRenderer"

export class ArticlesRoute extends React.Component {
  render() {
    return <ArticlesQueryRenderer artistID="pablo-picasso" />
  }
}
