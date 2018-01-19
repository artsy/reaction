import React from "react"
import styled from "styled-components"

import Colors from "../../../../Assets/Colors"
import Icon from "../../../Icon"
import Input from "../../../Input"

import { media } from "../../../Helpers"
import { StepProps } from "../../Types"
import { Layout } from "../Layout"
import ArtistList from "./ArtistList"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid ${Colors.grayRegular};
  ${media.sm`
    width: 100%;
    margin-bottom: 20px;
  `};
`

interface State {
  inputText: string
  followCount: number
}

export default class Artists extends React.Component<StepProps, State> {
  state = {
    inputText: "",
    followCount: 0,
  }

  updateFollowCount(count: number) {
    const updatedFollowCount = this.state.followCount + count

    this.setState({ followCount: updatedFollowCount })
  }

  submit() {
    const increaseBy = this.state.followCount >= 4 ? 2 : 1

    this.props.onNextButtonPressed(increaseBy)
  }

  searchTextChanged(e) {
    const updatedInputText = e.target.value
    this.setState({ inputText: updatedInputText })
  }

  render() {
    return (
      <Layout
        title="Follow a few artists that interest you most"
        subtitle="Follow one or more"
        onNextButtonPressed={
          this.state.followCount > 0 ? this.submit.bind(this) : null
        }
      >
        <OnboardingSearchBox>
          <Input
            placeholder={"Search artists..."}
            leftView={<Icon name="search" color={Colors.graySemibold} />}
            block
            onInput={this.searchTextChanged.bind(this)}
            onPaste={this.searchTextChanged.bind(this)}
            onCut={this.searchTextChanged.bind(this)}
          />
          <div style={{ marginBottom: "35px" }} />
          <ArtistList
            searchQuery={this.state.inputText}
            updateFollowCount={this.updateFollowCount.bind(this)}
          />
        </OnboardingSearchBox>
      </Layout>
    )
  }
}
