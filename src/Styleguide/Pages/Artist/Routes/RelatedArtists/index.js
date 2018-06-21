import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Flex } from "Styleguide/Elements/Flex"
import { Box } from "Styleguide/Elements/Box"
import { ArtistCard } from "Styleguide/Components/ArtistCard"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Pagination } from "Styleguide/Components/Pagination"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"
import { Separator } from "Styleguide/Elements/Separator"

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
                <Flex wrap>
                  {new Array(20).fill(0).map(item => {
                    return (
                      <Box p={1} width={width}>
                        <ArtistCard
                          src="https://picsum.photos/110/110/?random"
                          headline="Francesca DiMattio"
                          subHeadline="American, b. 1979"
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
                  <Pagination {...cursor} {...callbacks} />
                </Flex>
              </Col>
            </Row>
          </React.Fragment>
        )
      }}
    </Responsive>
  )
}
