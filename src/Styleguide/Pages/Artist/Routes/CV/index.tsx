import { Sans, Serif } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

export const CV = () => {
  return (
    <Responsive>
      {({ xs }) => {
        return (
          <React.Fragment>
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
          </React.Fragment>
        )
      }}
    </Responsive>
  )
}

/* <Item>
              <Row>
                <Col sm={2}>
                  <Category size='2' weight='medium'>Group shows</Category>
                </Col>
                <Col sm={10}>
                  <YearGroup>
                    <Year>2017</Year>
                    <GroupItems>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </YearGroup>
                  <YearGroup>
                    <Year>2016</Year>
                    <GroupItems>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady? Mickalene
                        Thomas: Do I Look Like a Lady? Mickalene Thomas: Do I
                        Look Like a Lady?, MOCA, Los Angeles, Los Angeles,
                      </GroupItem>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </YearGroup>
                  <YearGroup>
                    <Year>2015</Year>
                    <GroupItems>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady? Mickalene
                        Thomas: Do I Look Like a Lady? Mickalene Thomas: Do I
                        Look Like a Lady?, MOCA, Los Angeles, Los Angeles,
                      </GroupItem>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </YearGroup>
                </Col>
              </Row>
            </Item> */
/* <Item>
              <Row>
                <Col sm={2}>
                  <Category>Fair History</Category>
                </Col>
                <Col sm={10}>
                  <Group>
                    <Year>2017</Year>
                    <GroupItems>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </Group>
                </Col>
              </Row>
            </Item> */

// const Content = styled.div``
const CVItems = styled.div``
const CVItem = Box
const Category = Sans
const YearGroup = styled(Flex)``
const Year = Serif
const ShowGroup = styled.div``
const Show = Serif
const Disclaimer = Serif
