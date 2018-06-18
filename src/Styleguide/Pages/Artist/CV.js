import React from "react"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"

export const CV = () => {
  return (
    <Content>
      <Row>
        <Col>
          <CVItems>
            <Item>
              <Row>
                <Col sm={2}>
                  <Category>Solo shows</Category>
                </Col>
                <Col sm={10}>
                  <Group>
                    <Year>2017</Year>
                    <GroupItems>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </Group>
                  <Group>
                    <Year>2016</Year>
                    <GroupItems>
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </Group>
                </Col>
              </Row>
            </Item>
            <Item>
              <Row>
                <Col sm={2}>
                  <Category>Group shows</Category>
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
                      <GroupItem>
                        Mickalene Thomas: Do I Look Like a Lady?, MOCA, Los
                        Angeles
                      </GroupItem>
                    </GroupItems>
                  </Group>
                  <Group>
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
                  </Group>
                  <Group>
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
                  </Group>
                </Col>
              </Row>
            </Item>
            <Item>
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
            </Item>
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
    </Content>
  )
}

const Content = styled.div``
const CVItems = styled.div``
const Category = styled.div``
const Item = styled.div``
const Group = styled.div``
const Year = styled.div``
const GroupItems = styled.div``
const GroupItem = styled.div``
const Disclaimer = styled.div``
