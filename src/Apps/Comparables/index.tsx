import { Box, Spinner } from "@artsy/palette"
import { ComparablesQuery } from "__generated__/ComparablesQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import React, { Component } from "react"
import { graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { Comparables } from "./ComparablesView"
import { CategoryToMediumGeneMap } from "./Filter/MediumFilter"

export interface Props extends ContextProps {
  artworkID: string
}

export class ComparablesContainer extends Component<Props> {
  render() {
    const { artworkID } = this.props

    return (
      <ContextConsumer>
        {({ relayEnvironment }) => {
          return (
            <>
              <QueryRenderer<ComparablesQuery>
                environment={relayEnvironment}
                query={graphql`
                  query ComparablesQuery($artworkID: String!) {
                    artwork(id: $artworkID) {
                      artist {
                        id
                      }
                      category
                      attribution_class {
                        id
                        name
                      }
                      price
                    }
                  }
                `}
                variables={{ artworkID }}
                render={({ props }) => {
                  if (props) {
                    const {
                      category,
                      artist,
                      attribution_class,
                    } = props.artwork
                    const medium = CategoryToMediumGeneMap[category]
                    return (
                      <Box pt={3} pb={3}>
                        <Comparables
                          attributionClass={
                            attribution_class && [attribution_class.id]
                          }
                          artistID={artist.id}
                          medium={medium}
                        />
                      </Box>
                    )
                  } else {
                    return (
                      <SpinnerContainer>
                        <Spinner />
                      </SpinnerContainer>
                    )
                  }
                }}
              />
            </>
          )
        }}
      </ContextConsumer>
    )
  }
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
