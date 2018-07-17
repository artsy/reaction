import { Sans } from "@artsy/palette"
import { paginationProps } from "Apps/__test__/Fixtures/Pagination"
import { showBlockProps, showListProps } from "Apps/__test__/Fixtures/Show"
import { ArtistShowBlockItem } from "Apps/Artist/Routes/Shows/ArtistShowBlockItem"
import { ArtistShowListItem } from "Apps/Artist/Routes/Shows/ArtistShowListItem"
import React from "react"
import { PaginationFragmentContainer } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

const ShowBlocks = Flex
const ShowList = Box
const Category = Sans

export const Shows = () => {
  const { cursor, callbacks } = paginationProps

  return (
    <Responsive>
      {({ xs }) => {
        const blockWidth = xs ? "100%" : "50%"
        const blockDirection = xs ? "column" : "row"

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
                    <ShowBlocks
                      flexDirection={blockDirection}
                      flexWrap={"true" as any}
                    >
                      <ArtistShowBlockItem
                        blockWidth={blockWidth}
                        {...showBlockProps}
                      />
                      <ArtistShowBlockItem
                        blockWidth={blockWidth}
                        {...showBlockProps}
                      />
                      <ArtistShowBlockItem
                        blockWidth={blockWidth}
                        {...showBlockProps}
                      />
                      <ArtistShowBlockItem
                        blockWidth={blockWidth}
                        {...showBlockProps}
                      />
                    </ShowBlocks>
                  </Col>
                </Row>

                <Box py={2}>
                  <Separator />
                </Box>

                <Row>
                  <Col>
                    <Flex justifyContent="flex-end">
                      <PaginationFragmentContainer
                        hasNextPage
                        pageCursors={cursor}
                        {...callbacks}
                      />
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
                      <ArtistShowListItem {...showListProps} />
                      <ArtistShowListItem {...showListProps} />
                      <ArtistShowListItem {...showListProps} />
                    </ShowList>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Flex mb={2} justifyContent="flex-end">
                      <PaginationFragmentContainer
                        hasNextPage
                        pageCursors={cursor}
                        {...callbacks}
                      />
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
                      <ArtistShowListItem {...showListProps} />
                      <ArtistShowListItem {...showListProps} />
                      <ArtistShowListItem {...showListProps} />
                    </ShowList>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Flex mb={3} justifyContent="flex-end">
                      <PaginationFragmentContainer
                        hasNextPage
                        pageCursors={cursor}
                        {...callbacks}
                      />
                    </Flex>
                  </Col>
                </Row>
              </Col>
            </Row>
          </React.Fragment>
        )
      }}
    </Responsive>
  )
}
