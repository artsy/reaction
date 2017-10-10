import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"

import * as fonts from "../../assets/fonts"
import Button from "../buttons/ghost"
import Icon from "../icon"
import Title from "../title"

const IconContainer = styled.div`
width: 15px;
height: 15px;
background-color: black;
display: none;
border-radius: 50%;
float: right;
margin-right: 15px;
`

const Link = styled.a`
  display: block;
  font-size: 14px;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-family: ${fonts.primary.fontFamily};
  padding: 30px 0 30px 15px;
  border-top: 1px solid #e5e5e5;
  &:hover {
    background-color: #f8f8f8;
  }
  &:hover .collector-intent-checked {
    display: inline;
  }
`

storiesOf("Onboarding").add("Collector Intent", () => {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "100px" }}>
        <Title titleSize="xlarge">Get started on Artsy, what are you most interested in doing?</Title>
        <Title titleSize="xlarge" style={{ color: "#999999" }}>Select all that apply</Title>
      </div>
      <div style={{ width: "450px", margin: "0 auto 100px" }}>
        <Link href="#">
          Buy Art & Design
          <IconContainer className="collector-intent-checked">
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
        <Link href="#">
          Sell Art & Design
          <IconContainer className="collector-intent-checked">
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
        <Link href="#">
          Research Art Prices
          <IconContainer className="collector-intent-checked">
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
        <Link href="#">
          Learn About Art
          <IconContainer className="collector-intent-checked">
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
        <Link href="#">
          Find Out About New Exhibitions
          <IconContainer className="collector-intent-checked">
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
        <Link href="#" style={{ borderBottom: "1px solid #e5e5e5", marginBottom: "100px" }}>
          Read Art Market News
          <IconContainer className="collector-intent-checked">
            <Icon name="check" color="white" fontSize="8px" />
          </IconContainer>
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button>Next</Button>
      </div>
    </div>
  )
})
