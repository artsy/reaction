import { paginationProps } from "Apps/__test__/Fixtures/Pagination"
import React from "react"
import { ArtistCard } from "Styleguide/Components/ArtistCard"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Utils/Responsive"

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
          <>
            <Row>
              <Col>
                <Flex flexWrap>
                  {new Array(20).fill(0).map(item => {
                    return (
                      <Box p={1} width={width}>
                        <ArtistCard
                          currentUser={null}
                          artist={
                            {
                              id: "percy",
                              image: {
                                cropped: {
                                  url: "https://picsum.photos/110/110/?random",
                                },
                              },
                              href: "/artist/francesca-dimattio",
                              name: "Francesca DiMattio",
                              formatted_nationality_and_birthday:
                                "American, b. 1979",
                            } as any
                          }
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
                  <Pagination
                    hasNextPage
                    pageCursors={cursor as any}
                    {...callbacks}
                  />
                </Flex>
              </Col>
            </Row>
          </>
        )
      }}
    </Responsive>
  )
}
