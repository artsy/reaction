import { Sans } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"
import { Section } from "Styleguide/Utils/Section"
import { ReadMore } from "../ReadMore"

storiesOf("Styleguide/Components", module).add("ReadMore", () => {
  return (
    <React.Fragment>
      <Section title="Max lines">
        <Item>
          <Sans size="3">
            <ReadMore maxLineCount={2}>
              Donald Judd, widely regarded as one of the most significant
              American artists of the post-war period, is perhaps best-known for
              the large-scale outdoor installations and long, spacious interiors
              he designed in Marfa. Donald Judd, widely regarded as one of the
              most significant American artists of the post-war period, is
              perhaps best-known for the large-scale outdoor installations and
              long, spacious interiors he designed in Marfa.
            </ReadMore>
          </Sans>
        </Item>
        <Item>
          <ReadMore maxLineCount={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor <a href="#">incididunt ut labore et dolore</a> magna
            aliqua. Ut enim ad minim veniam, <a href="#">quis nostrud</a>{" "}
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. <a href="#">Duis aute</a> irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor <a href="#">incididunt ut labore et dolore</a> magna aliqua.
            Ut enim ad minim veniam, <a href="#">quis nostrud</a> exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
            <a href="#">Duis aute</a> irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor{" "}
            <a href="#">incididunt ut labore et dolore</a> magna aliqua. Ut enim
            ad minim veniam, <a href="#">quis nostrud</a> exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.{" "}
            <a href="#">Duis aute</a> irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor{" "}
            <a href="#">incididunt ut labore et dolore</a> magna aliqua. Ut enim
            ad minim veniam, <a href="#">quis nostrud</a> exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.{" "}
            <a href="#">Duis aute</a> irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
          </ReadMore>
        </Item>
      </Section>
      <Section title="Character cap">
        <Sans size="3">
          <ReadMore maxLineCount={2}>TODO</ReadMore>
        </Sans>
      </Section>
    </React.Fragment>
  )
})

const Item = styled.div`
  padding-bottom: 20px;
`
