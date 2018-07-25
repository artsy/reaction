import Colors from "Assets/Colors"
import { unica } from "Assets/Fonts"
import React, { Component } from "react"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"

import styled from "styled-components"

export interface SummaryProps {}

export class Summary extends Component<SummaryProps> {
  render() {
    return (
      <>
        <Placeholder height="390px" name="Sidebar" />
        <Helper />
      </>
    )
  }
}

const Link = styled.a``

const Text = styled.text`
  ${unica("s12")};
  color: ${Colors.graySemibold};
`

const Helper = () => (
  <>
    <Spacer mt={2} mb={2} />
    <Text>
      Have a question? <Link href="#">Read our FAQ</Link> or{" "}
      <Link href="#">ask an Artsy Specialist</Link>.
    </Text>
  </>
)
