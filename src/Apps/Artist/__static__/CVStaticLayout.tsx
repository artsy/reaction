import { Sans, Serif } from "@artsy/palette"
import { Box } from "@artsy/palette"
import { Flex } from "@artsy/palette"
import { Spacer } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Responsive } from "Utils/Responsive"

export const CV = () => {
  return (
    <Responsive>
      {({ xs }) => {
        return (
          <>
            <Row>
              <Col>
                <CVItems>
                  <CVItem>
                    <Row>
                      <Col sm={2}>
                        <Box mb={xs ? 1 : 1}>
                          <Category size="3" weight="medium">
                            Solo shows
                          </Category>
                        </Box>
                      </Col>
                      <Col sm={10}>
                        <YearGroup mb={1}>
                          <Year size="3">2017</Year>
                          <Spacer mr={xs ? 1 : 4} />
                          <ShowGroup>
                            <Show size="3">
                              <Serif size="3" display="inline" italic>
                                <a href="#" className="noUnderline">
                                  Mickalene Thomas: Do I Look Like a Lady?
                                </a>
                              </Serif>,{" "}
                              <a href="#" className="noUnderline">
                                MOCA
                              </a>, Los Angeles
                            </Show>
                            <Show size="3">
                              <Serif size="3" display="inline" italic>
                                <a href="#" className="noUnderline">
                                  Mickalene Thomas: Do I Look Like a Lady?
                                </a>
                              </Serif>,{" "}
                              <a href="#" className="noUnderline">
                                MOCA
                              </a>, Los Angeles
                            </Show>
                            <Show size="3">
                              <Serif size="3" display="inline" italic>
                                <a href="#" className="noUnderline">
                                  Mickalene Thomas: Do I Look Like a Lady?
                                </a>
                              </Serif>,{" "}
                              <a href="#" className="noUnderline">
                                MOCA
                              </a>, Los Angeles
                            </Show>
                          </ShowGroup>
                        </YearGroup>
                        <YearGroup mb={1}>
                          <Year size="3">2016</Year>
                          <Spacer mr={xs ? 1 : 4} />
                          <ShowGroup>
                            <Show size="3">
                              Mickalene Thomas: Do I Look Like a Lady?, MOCA,
                              Los Angeles
                            </Show>
                          </ShowGroup>
                        </YearGroup>
                      </Col>
                    </Row>
                  </CVItem>
                </CVItems>
              </Col>
            </Row>

            <Spacer my={1} />

            <Row>
              <Col smOffset={2}>
                <Disclaimer size="2" color="black60">
                  Artist CVs are assembled using only exhibition data available
                  on Artsy.
                </Disclaimer>
              </Col>
            </Row>
          </>
        )
      }}
    </Responsive>
  )
}

const CVItems = styled.div``
const CVItem = Box
const Category = Sans
const YearGroup = styled(Flex)``
const Year = Serif
const ShowGroup = styled.div``
const Show = Serif
const Disclaimer = Serif
