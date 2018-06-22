import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ArtistCard } from "Styleguide/Components/ArtistCard"
import { Pagination } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Container, PAGE_SIZE } from "./RelatedArtistsContents"

interface Props extends ContextProps {
  artistID: string
  kind: string
}

export const RelayRelatedArtistsContent = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment, kind } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query RelatedArtistsArtistQuery(
              $artistID: String!
              $first: Int!
              $kind: RelatedArtistsKind!
            ) {
              artist(id: $artistID) {
                ...RelatedArtistsContents_artist
                  @arguments(kind: $kind, first: $first)
              }
            }
          `}
          variables={{ artistID, first: PAGE_SIZE, kind }}
          render={({ props }) => {
            if (props) {
              return <Container kind={kind} artist={props.artist} />
            } else {
              return null
            }
          }}
        />
      )
    }
  }
)

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
