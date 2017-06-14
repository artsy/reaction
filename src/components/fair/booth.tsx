import * as React from "react"
import * as Relay from "react-relay"

interface Props extends RelayProps, React.HTMLProps<FairBooth> {
  show: any
}

export class FairBooth extends React.Component<Props, null> {
  render() {
    const { show } = this.props
    return (
      <div>
        {show.name}
      </div>
    )
  }
}

export default Relay.createContainer(FairBooth, {
  fragments: {
    show: () => Relay.QL`
      fragment on Show {
        name
      }
    `,
  },
})

interface RelayProps {
  show: {
    name: string | null,
  } | any
}
