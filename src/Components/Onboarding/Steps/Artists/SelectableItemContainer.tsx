import * as React from "react"
import * as Relay from "react-relay/classic"

import ItemLink from "./ItemLink"

interface Props {
  artists: any[]
}

class SelectableItemContainer extends React.Component<Props, null> {
  render() {
    const items = this.props.artists.map((artist, index) => <ItemLink href="#" artist={artist} key={index} />)

    return <div>{items}</div>
  }
}

export default Relay.createContainer(SelectableItemContainer, {
  fragments: {
    artists: () => Relay.QL`
      fragment on Artist @relay(plural: true) {
        ${ItemLink.getFragment("artist")}
      }
    `,
  },
})
