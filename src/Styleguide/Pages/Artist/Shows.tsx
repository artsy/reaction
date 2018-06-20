import React from "react"
import styled from "styled-components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Sans, Serif } from "@artsy/palette"
import { ResponsiveImage } from "Styleguide/Elements/Image"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Pagination } from "Styleguide/Components/Pagination"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"

export const Shows = () => {
  const { cursor, callbacks } = paginationProps

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Row>
            <Col>
              <Category size="3" weight="medium">
                Currently on view
              </Category>
            </Col>
          </Row>
          <Row>
            <Col>
              <ShowBlocks wrap>
                <Show>
                  <ResponsiveImage src="https://picsum.photos/460/400/?random" />
                  <Serif size="3t">Room With Its Own Rules</Serif>
                  <Serif size="2" color="black60">
                    Toth Gallery
                  </Serif>
                  <Serif size="1" color="black60">
                    Miami, May 30 – Jun 21
                  </Serif>
                </Show>
                <Show>
                  <ResponsiveImage src="https://picsum.photos/460/400/?random" />
                  <Serif size="3t">Room With Its Own Rules</Serif>
                  <Serif size="2" color="black60">
                    Toth Gallery
                  </Serif>
                  <Serif size="1" color="black60">
                    Miami, May 30 – Jun 21
                  </Serif>
                </Show>
                <Show>
                  <ResponsiveImage src="https://picsum.photos/460/400/?random" />
                  <Serif size="3t">Room With Its Own Rules</Serif>
                  <Serif size="2" color="black60">
                    Toth Gallery
                  </Serif>
                  <Serif size="1" color="black60">
                    Miami, May 30 – Jun 21
                  </Serif>
                </Show>
                <Box maxWidth="460px" width="50%" height="auto" p={1}>
                  <ResponsiveImage src="https://picsum.photos/460/400/?random" />
                  <Serif size="3t">Room With Its Own Rules</Serif>
                  <Serif size="2" color="black60">
                    Toth Gallery
                  </Serif>
                  <Serif size="1" color="black60">
                    Miami, May 30 – Jun 21
                  </Serif>
                </Box>
              </ShowBlocks>
            </Col>
          </Row>

          <Box py={2}>
            <Separator />
          </Box>
          <Row>
            <Col>
              <Flex justifyContent="flex-end">
                <Pagination {...cursor} {...callbacks} />
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>

      <Spacer mb={6} />

      <Row>
        <Col>
          <Row>
            <Col>
              <Category size="3" weight="medium">
                Upcoming
              </Category>
            </Col>
          </Row>

          <Box py={1}>
            <Separator />
          </Box>

          <Row>
            <Col>
              <ShowList>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>
                      <Serif size="2">May 22-29, 2018</Serif>
                    </Col>
                    <Col sm={6}>
                      <Serif size="4">
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Serif>
                      <Serif size="2" color="black60">
                        Toth Gallery
                      </Serif>
                    </Col>
                    <Col sm={3}>
                      <Serif size="2">London</Serif>
                    </Col>
                  </Row>

                  <Box pt={3} pb={1}>
                    <Separator />
                  </Box>
                </ShowListItem>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>
                      <Serif size="2">May 22-29, 2018</Serif>
                    </Col>
                    <Col sm={6}>
                      <Serif size="4">
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Serif>
                      <Serif size="2" color="black60">
                        Toth Gallery
                      </Serif>
                    </Col>
                    <Col sm={3}>
                      <Serif size="2">London</Serif>
                    </Col>
                  </Row>

                  <Box pt={3} pb={1}>
                    <Separator />
                  </Box>
                </ShowListItem>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>
                      <Serif size="2">May 22-29, 2018</Serif>
                    </Col>
                    <Col sm={6}>
                      <Serif size="4">
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Serif>
                      <Serif size="2" color="black60">
                        Toth Gallery
                      </Serif>
                    </Col>
                    <Col sm={3}>
                      <Serif size="2">London</Serif>
                    </Col>
                  </Row>

                  <Box pt={3} pb={1}>
                    <Separator />
                  </Box>
                </ShowListItem>
              </ShowList>
            </Col>
          </Row>
          <Row>
            <Col>
              <Flex mb={2} justifyContent="flex-end">
                <Pagination {...cursor} {...callbacks} />
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>

      <Spacer mb={6} />

      <Row>
        <Col>
          <Row>
            <Col>
              <Category size="3" weight="medium">
                Past
              </Category>
            </Col>
          </Row>

          <Box py={1}>
            <Separator />
          </Box>

          <Row>
            <Col>
              <ShowList>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>
                      <Serif size="2">May 22-29, 2018</Serif>
                    </Col>
                    <Col sm={6}>
                      <Serif size="4">
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Serif>
                      <Serif size="2" color="black60">
                        Toth Gallery
                      </Serif>
                    </Col>
                    <Col sm={3}>
                      <Serif size="2">London</Serif>
                    </Col>
                  </Row>

                  <Box pt={3} pb={1}>
                    <Separator />
                  </Box>
                </ShowListItem>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>
                      <Serif size="2">May 22-29, 2018</Serif>
                    </Col>
                    <Col sm={6}>
                      <Serif size="4">
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Serif>
                      <Serif size="2" color="black60">
                        Toth Gallery
                      </Serif>
                    </Col>
                    <Col sm={3}>
                      <Serif size="2">London</Serif>
                    </Col>
                  </Row>

                  <Box pt={3} pb={1}>
                    <Separator />
                  </Box>
                </ShowListItem>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>
                      <Serif size="2">May 22-29, 2018</Serif>
                    </Col>
                    <Col sm={6}>
                      <Serif size="4">
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Serif>
                      <Serif size="2" color="black60">
                        Toth Gallery
                      </Serif>
                    </Col>
                    <Col sm={3}>
                      <Serif size="2">London</Serif>
                    </Col>
                  </Row>

                  <Box pt={3} pb={1}>
                    <Separator />
                  </Box>
                </ShowListItem>
              </ShowList>
            </Col>
          </Row>
          <Row>
            <Col>
              <Flex mb={3} justifyContent="flex-end">
                <Pagination {...cursor} {...callbacks} />
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const ShowBlocks = Flex
const Show = props => {
  return (
    <Box maxWidth="460px" width="50%" height="auto" p={1}>
      {props.children}
    </Box>
  )
}

const ShowList = styled.div``
const Category = Sans
const ShowListItem = Box
