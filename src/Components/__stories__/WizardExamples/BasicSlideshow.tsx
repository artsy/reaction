import React from "react"
import { WizardSchema, Wizard, RenderProps } from "../../Wizard"
import Button from "../../Buttons/Default"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import Title from "../../Title"

export const BasicSlideshow = () => {
  const pages: WizardSchema = [
    {
      label: "Start",
      component: page(colors.greenRegular, "Beginning."),
      stepName: "step1",
    },
    {
      label: "Middle.",
      component: page(colors.yellowBold, "Middle."),
      stepName: "step2",
    },
    {
      label: "End",
      component: page(colors.purpleRegular, "End."),
      stepName: "step3",
    },
  ]
  return (
    <Wizard pages={pages}>
      {(wizardBag: RenderProps) => <BasicWizardContainer {...wizardBag} />}
    </Wizard>
  )
}

class BasicWizardContainer extends React.Component<RenderProps, any> {
  render() {
    const { pages, pageIndex } = this.props
    const Component = pages[pageIndex].component
    return (
      <Container>
        <Component next={this.props.next} previous={this.props.previous} />
      </Container>
    )
  }
}

const Container = styled.div`
  width: 500px;
  height: 500px;
`

const page: (c, t) => React.SFC<any> = (color, text) => props => (
  <Page color={color}>
    <Title>{text}</Title>
    <Button onClick={props.previous}>Back</Button>
    <Button onClick={props.next}>Next</Button>
  </Page>
)

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${p => p.color};
  text-align: center;
`
