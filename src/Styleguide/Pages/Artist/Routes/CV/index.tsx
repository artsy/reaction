import { Sans, Serif } from "@artsy/palette"
import { ContextConsumer, ContextProps } from "Components/Artsy"
import { graphql, QueryRenderer } from "react-relay"

import React from "react"
import styled from "styled-components"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

import { Container, PAGE_SIZE } from "./CVContents"

interface ShowFilter {
  at_a_fair: boolean
  solo_show?: boolean
  sort: string
  is_reference?: boolean
  visible_to_public?: boolean
}

interface Props extends ContextProps {
  artistID: string
  filters: ShowFilter
  category: string
}

export const RelayCVContent = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment, filters, category } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query CVArtistQuery(
              $artistID: String!
              $first: Int!
              $sort: PartnerShowSorts
              $at_a_fair: Boolean
              $solo_show: Boolean
              $is_reference: Boolean
              $visible_to_public: Boolean
            ) {
              artist(id: $artistID) {
                ...CVContents_artist
                  @arguments(
                    sort: $sort

                    first: $first
                    at_a_fair: $at_a_fair
                    solo_show: $solo_show
                    is_reference: $is_reference
                    visible_to_public: $visible_to_public
                  )
              }
            }
          `}
          variables={{ artistID, first: PAGE_SIZE, ...filters }}
          render={({ props }) => {
            if (props) {
              return <Container category={category} artist={props.artist} />
            } else {
              return null
            }
          }}
        />
      )
    }
  }
)
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

const CVItems = styled.div``
const CVItem = Box
const Category = Sans
const YearGroup = styled(Flex)``
const Year = Serif
const ShowGroup = styled.div``
const Show = Serif
const Disclaimer = Serif
