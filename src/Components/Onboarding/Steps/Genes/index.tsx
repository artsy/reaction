import * as React from "react"
import styled from "styled-components"

import colors from "../../../../Assets/Colors"
import Icon from "../../../Icon"
import Input from "../../../Input"

import { media } from "../../../Helpers"
import { StepProps } from "../../Types"
import { Layout } from "../Layout"
import GeneList from "./GeneList"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid #e5e5e5;
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

  render() {
    return (
      <Layout
        title="Follow art categories that interest you most"
        subtitle="Follow one or more"
        onNextButtonPressed={null}
      >
        <OnboardingSearchBox>
          <Input
            placeholder={"Search artists..."}
            leftView={<Icon name="search" color={colors.graySemibold} />}
            rightView={
              this.state.inputText.length ? (
                <Icon name="close" color={colors.graySemibold} onClick={this.clearSearch.bind(this)} />
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
