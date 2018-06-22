import { isNull } from "lodash"
import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import * as RelayRuntimeTypes from "relay-runtime"

import styled from "styled-components"
import colors from "../../Assets/Colors"
import * as Artsy from "../../Components/Artsy"
import Icon from "../Icon"

const SIZE = 40

export interface Props
  extends RelayProps,
    Artsy.ContextProps,
    React.HTMLProps<React.ComponentType> {
  style?: any
  relay?: RelayProp
  relayEnvironment?: RelayRuntimeTypes.Environment
  useRelay?: boolean
}

// TODO: This will be refactored out once Artworks / Grids are full Relay in Force
// and intermediate local state becomes unnecessary
interface State {
  is_saved: boolean
}

export const SaveButtonContainer = Artsy.ContextConsumer(
  class extends React.Component<Props, State> {
    static defaultProps = {
      useRelay: true,
    }

    state = {
      is_saved: null,
    }

    get isSaved() {
      const isSaved = isNull(this.state.is_saved)
        ? this.props.artwork.is_saved
        : this.state.is_saved

      return isSaved
    }

    handleSave() {
      const {
        currentUser,
        artwork,
        relay,
        relayEnvironment,
        useRelay,
      } = this.props
      const environment = (relay && relay.environment) || relayEnvironment

      if (environment && currentUser && currentUser.id) {
        // Optimistic update for environments that don't have typical access to
        // Relay, e.g., where new ArtworkGrids are used in old code via Stitch. Note
        // that the prop `useRelay` refers to outer HOC wrappers. In cases where
        // Save UI components are used it is possible to piggyback on ContextProvider
        // environment for mutations, but since the component exists outside of a
        // Relay HOC props are not updated when successful mutations occur -- hence
        // the need for setState.
        //
        // TODO:
        // Refactor out `useRelay` prop when Force artwork Grids have been moved
        // completely over to Relay

        if (!useRelay) {
          this.setState({
            is_saved: !this.isSaved,
          })
        }

        commitMutation(environment, {
          mutation: graphql`
            mutation SaveArtworkMutation($input: SaveArtworkInput!) {
              saveArtwork(input: $input) {
                artwork {
                  id
                  is_saved
                }
              }
            }
          `,
          variables: {
            input: {
              artwork_id: artwork.id,
              remove: this.isSaved,
            },
          },
          optimisticResponse: {
            saveArtwork: {
              artwork: {
                __id: artwork.__id,
                is_saved: !this.isSaved,
              },
            },
          },
          onError: error => {
            // Revert optimistic update
            if (!useRelay) {
              this.setState({
                is_saved: this.isSaved,
              })
            }

            console.error("Artwork/Save Error saving artwork: ", error)
          },
          onCompleted: ({ saveArtwork }) => {
            if (!useRelay) {
              this.setState({
                is_saved: saveArtwork.artwork.is_saved,
              })
            }
          },
        })
      } else {
        window.location.href = "/login"
      }
    }

    render() {
      const { style } = this.props

      return (
        <div
          className={this.props.className}
          style={style}
          onClick={() => this.handleSave()}
          data-saved={this.isSaved}
        >
          <Icon
            name="heart"
            height={SIZE}
            color="white"
            style={{ verticalAlign: "middle" }}
          />
        </div>
      )
    }
  }
)

export const SaveButton = styled(SaveButtonContainer)`
  display: block;
  width: ${SIZE}px;
  height: ${SIZE}px;
  text-align: center;
  cursor: pointer;
  color: white;
  background-color: ${colors.gray};
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  font-size: 16px;
  line-height: ${SIZE}px;
  &:hover {
    background-color: black;
  }
  &[data-saved="true"] {
    background-color: ${colors.purpleRegular};
    &:hover {
      background-color: ${colors.redBold};
    }
  }
`

export default createFragmentContainer(
  Artsy.ContextConsumer(SaveButton),
  graphql`
    fragment Save_artwork on Artwork {
      __id
      id
      is_saved
    }
  `
)

interface RelayProps {
  artwork: {
    __id: string
    id: string
    is_saved: boolean | null
  }
}
