import React from "react"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Flex } from "Styleguide/Elements/Flex"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Sans, Serif } from "@artsy/palette"

export const CV = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <CVItems>
            <CVItem>
              <Row>
                <Col sm={2}>
                  <Category size="2" weight="medium">
                    Solo shows
                  </Category>
                </Col>
                <Col sm={10}>
                  <YearGroup>
                    <Year size="3">2017</Year>
                    <Spacer mr={3} />

                    <ShowGroup>
                      <Show size="3">
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </Show>
                    </ShowGroup>
                  </YearGroup>
                  <YearGroup>
                    <Year size="3">2016</Year>
                    <Spacer mr={5} />
                    <ShowGroup>
                      <Show size="3">
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </Show>
                    </ShowGroup>
                  </YearGroup>
                </Col>
              </Row>
            </CVItem>
            {/* <Item>
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
            </Item> */}
            {/* <Item>
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
            </Item> */}
          </CVItems>
        </Col>
      </Row>
      <Row>
        <Col>
          <Disclaimer>
            Artist CVs are assembled using only exhibition data available on
            Artsy.
          </Disclaimer>
        </Col>
      </Row>
    </React.Fragment>
  )
}

// const Content = styled.div``
const CVItems = styled.div``
const CVItem = styled.div``
const Category = Sans
const YearGroup = styled(Flex)``
const Year = Serif
const ShowGroup = styled.div``
const Show = Serif
const Disclaimer = styled.div``
