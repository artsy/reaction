import React from "react"
import { ArtistCard } from "Styleguide/Components/ArtistCard"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"
import { Responsive } from "Styleguide/Utils/Responsive"

export const RelatedArtists = () => {
  const { cursor, callbacks } = paginationProps

  return (
    <Responsive>
      {({ xs, sm, md }) => {
        let width
        if (xs) {
          width = "100%"
        } else if (sm || md) {
          width = "33%"
        } else {
          width = "25%"
        }

        return (
          <React.Fragment>
            <Row>
              <Col>
                <Flex flexWrap>
                  {new Array(20).fill(0).map(item => {
                    return (
                      <Box p={1} width={width}>
                        <ArtistCard
                          artist={{
                            id: "percy",
                            image: {
                              cropped: {
                                url: "https://picsum.photos/110/110/?random",
                              },
                            },
                            name: "Francesca DiMattio",
                            formatted_nationality_and_birthday:
                              "American, b. 1979",
                          }}
                        />
                      </Box>
                    )
                  })}
                </Flex>
              </Col>
            </Row>

            <Box py={2}>
              <Separator />
            </Box>

            <Row>
              <Col>
                <Flex justifyContent="flex-end">
                  <Pagination pageCursors={cursor} {...callbacks} />
                </Flex>
              </Col>
            </Row>
          </React.Fragment>
        )
      }}
    </Responsive>
  )
}
