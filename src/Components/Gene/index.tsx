import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import history from "../History"

import { configureUrlQuery } from "react-url-query"
import Contents from "./Contents"

interface Props extends RelayProps, React.HTMLProps<GenePage> {
  gene: any
}

export class GenePage extends React.Component<Props, null> {
  componentWillMount() {
    configureUrlQuery({ history })
  }

  render() {
    const { gene } = this.props
    return <Contents gene={gene} />
  }
}

export default createFragmentContainer(
  GenePage,
  graphql`
    fragment Gene_gene on Gene {
      ...Contents_gene
    }
  `
)

interface RelayProps {
  gene: {
    mode: string | null
  }
}
