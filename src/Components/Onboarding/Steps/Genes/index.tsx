import * as React from "react"
import styled from "styled-components"

import Colors from "../../../../Assets/Colors"
import Icon from "../../../Icon"
import Input from "../../../Input"

import { media } from "../../../Helpers"
import { StepProps } from "../../Types"
import { Layout } from "../Layout"
import GeneList from "./GeneList"

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
}

export default class Genes extends React.Component<StepProps, State> {
  state = {
    inputText: "",
  }

  // onInputChange = e => {
  //   this.props.onStateChange({ nextButtonEnabled: true })
  // }

  searchTextChanged(e) {
    const updatedInputText = e.target.value
    this.setState({ inputText: updatedInputText })
  }

  clearSearch(e) {
    this.setState({ inputText: "" })
  }

  clickedNext() {
    this.props.onNextButtonPressed()
  }

  render() {
    return (
      <Layout
        title="Follow art categories that interest you most"
        subtitle="Follow one or more"
        onNextButtonPressed={this.clickedNext.bind(this)}
      >
        <OnboardingSearchBox>
          <Input
            placeholder={"Search artists..."}
            leftView={<Icon name="search" color={Colors.graySemibold} />}
            rightView={
              this.state.inputText.length ? (
                <Icon name="close" color={Colors.graySemibold} onClick={this.clearSearch.bind(this)} />
              ) : null
            }
            block
            onInput={this.searchTextChanged.bind(this)}
            onPaste={this.searchTextChanged.bind(this)}
            onCut={this.searchTextChanged.bind(this)}
            value={this.state.inputText}
            autoFocus
          />
          <div style={{ marginBottom: "35px" }} />
          {<GeneList searchQuery={this.state.inputText} />}
        </OnboardingSearchBox>
      </Layout>
    )
  }
}
