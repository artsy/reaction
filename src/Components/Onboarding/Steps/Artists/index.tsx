import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import colors from "../../../../Assets/Colors"
import Icon from "../../../Icon"
import Input from "../../../Input"

import SelectableItemContainer from "./SelectableItemContainer"

import { StepProps } from "../../Types"
import { Layout } from "../Layout"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid #e5e5e5;
`

export interface RelayProps {
  popular_artists: {
    artists: any[]
  }
}

class Artists extends React.Component<StepProps & RelayProps, null> {
  // onInputChange = e => {
  //   this.props.onStateChange({ nextButtonEnabled: true })
  // }

  searchTextChanged(e) {
    return null
  }

  render() {
    return (
      <Layout
        title="Follow a few artists that interest you most"
        subtitle="Follow one or more"
        onNextButtonPressed={null}
      >
        <OnboardingSearchBox>
          <Input
            placeholder={"Search artists..."}
            leftView={<Icon name="search" color={colors.graySemibold} />}
            block
            onInput={this.searchTextChanged.bind(this)}
            onPaste={this.searchTextChanged.bind(this)}
            onCut={this.searchTextChanged.bind(this)}
          />
          <div style={{ marginBottom: "35px" }} />
          {/* <ArtistList /> */}
          <SelectableItemContainer artists={this.props.popular_artists.artists} />
        </OnboardingSearchBox>
      </Layout>
    )
  }
}

export default Relay.createContainer(Artists, {
  fragments: {
    popular_artists: () => Relay.QL`
      fragment on PopularArtists {
        artists {
          ${SelectableItemContainer.getFragment("artists")}
        }
      }
    `,
  },
})
