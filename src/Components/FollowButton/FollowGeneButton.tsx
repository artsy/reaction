import { FollowGeneButtonMutation } from "__generated__/FollowGeneButtonMutation.graphql"
import * as Artsy from "Artsy/SystemContext"
import { extend } from "lodash"
import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import track, { TrackingProp } from "react-tracking"
import { FollowGeneButton_gene } from "../../__generated__/FollowGeneButton_gene.graphql"
import { FollowButtonDeprecated } from "./ButtonDeprecated"
import { FollowTrackingData } from "./Typings"

interface Props extends React.HTMLProps<FollowGeneButton>, Artsy.ContextProps {
  relay?: RelayProp
  gene?: FollowGeneButton_gene
  tracking?: TrackingProp
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: "register" | "login", config?: object) => void
}

export class FollowGeneButton extends React.Component<Props> {
  trackFollow = () => {
    const {
      tracking,
      gene: { is_followed },
    } = this.props
    const trackingData: FollowTrackingData = this.props.trackingData || {}
    const action = is_followed ? "Unfollowed Gene" : "Followed Gene"

    tracking.trackEvent(extend({ action }, trackingData))
  }

  handleFollow = () => {
    const { gene, user, relay, onOpenAuthModal } = this.props

    if (user && user.id) {
      commitMutation<FollowGeneButtonMutation>(relay.environment, {
        mutation: graphql`
          mutation FollowGeneButtonMutation($input: FollowGeneInput!) {
            followGene(input: $input) {
              gene {
                __id
                is_followed
              }
            }
          }
        `,
        variables: {
          input: {
            gene_id: gene.id,
          },
        },
        optimisticResponse: {
          followGene: {
            gene: {
              __id: gene.__id,
              is_followed: !gene.is_followed,
            },
          },
        },
      })
      this.trackFollow()
    } else {
      onOpenAuthModal &&
        onOpenAuthModal("register", {
          contextModule: "intext tooltip",
          intent: "follow gene",
          copy: "Sign up to follow categories",
        })
    }
  }

  render() {
    const { gene } = this.props

    return (
      <FollowButtonDeprecated
        isFollowed={gene && gene.is_followed}
        handleFollow={this.handleFollow}
      />
    )
  }
}

export const FollowGeneButtonFragmentContainer = track({})(
  createFragmentContainer(Artsy.withContext(FollowGeneButton), {
    gene: graphql`
      fragment FollowGeneButton_gene on Gene {
        __id
        id
        is_followed
      }
    `,
  })
)
