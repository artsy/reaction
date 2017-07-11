import * as React from "react"
import * as Relay from "react-relay"
import history from "../history"

import { configureUrlQuery } from "react-url-query"
import GeneContents from "./contents"

interface Props extends RelayProps, React.HTMLProps<GenePage> {
  gene: any
}

export class GenePage extends React.Component<Props, null> {
  componentWillMount() {
    configureUrlQuery({ history })
  }

  render() {
    const { gene } = this.props
    return <GeneContents gene={gene} />
  }
}

export default Relay.createContainer(GenePage, {
  fragments: {
    gene: () => Relay.QL`
      fragment on Gene {
        mode
        ${GeneContents.getFragment("gene")}
      }
    `,
  },
})

interface RelayProps {
  gene:
    | {
        mode: string | null
      }
    | any
}
