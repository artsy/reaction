import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import colors from "../../../../Assets/Colors"
import Icon from "../../../Icon"
import Input from "../../../Input"
import ItemLink from "./ItemLink"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid #e5e5e5;
`

interface Props {
  placeholder: string
  artists: any[]
}

class SelectableItemContainer extends React.Component<Props, null> {
  searchTextChanged(e) {
    return null
  }

  render() {
    const items = this.props.artists.map((artist, index) => <ItemLink href="#" artist={artist} key={index} />)

    return (
      <OnboardingSearchBox>
        <div style={{ marginBottom: "35px" }}>
          <Input
            placeholder={this.props.placeholder}
            leftView={<Icon name="search" color={colors.graySemibold} />}
            block
            onInput={this.searchTextChanged.bind(this)}
            onPaste={this.searchTextChanged.bind(this)}
            onCut={this.searchTextChanged.bind(this)}
          />
        </div>

        {items}
      </OnboardingSearchBox>
    )
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
