import * as React from "react"
import * as Relay from "react-relay"

interface Props extends RelayProps, React.HTMLProps<GeneContents> {
  gene: any
}

export class GeneContents extends React.Component<Props, null> {

  render() {
    return (
      <div>
        {this.props.gene.name}
        {this.props.gene.mode}
      </div>
    )
  }
}

export default Relay.createContainer(GeneContents, {
  fragments: {
    gene: () => Relay.QL`
      fragment on Gene {
        mode
        name
      }
    `,
  },
})

interface RelayProps {
  gene: {
    mode: string | null,
    name: string | null,
  } | any
}
