import React from "react"
import { Step, Wizard } from "../../Wizard"
import Button from "../../Buttons/Default"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import Title from "../../Title"

export const BasicSlideshow = () => {
  const pages: Step[] = [
    {
      label: "Start",
      component: makePage(colors.greenRegular, "Beginning."),
      stepName: "step1",
    },
    {
      label: "Middle.",
      component: makePage(colors.yellowBold, "Middle."),
      stepName: "step2",
    },
    {
      label: "End",
      component: makePage(colors.purpleRegular, "End.", "white"),
      stepName: "step3",
    },
  ]
  return <Wizard pages={pages} />
}

const makePage: (bg, t, c?) => React.SFC<any> = (
  bgColor,
  text,
  textColor = "black"
) => props => {
  return (
    <Page color={bgColor}>
      <Title color={textColor}>{text}</Title>
      <Button onClick={props.wizard.previous}>Back</Button>
      <Button onClick={props.wizard.next}>Next</Button>
    </Page>
  )
}

const Page = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${p => p.color};
  text-align: center;
`
