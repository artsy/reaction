import { FollowGeneButtonMutation } from "__generated__/FollowGeneButtonMutation.graphql"
import * as Artsy from "Artsy"
import * as SchemaV2 from "Artsy/Analytics/v2/Schema"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
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

interface Props
  extends React.HTMLProps<FollowGeneButton>,
    Artsy.SystemContextProps {
  relay?: RelayProp
  gene?: FollowGeneButton_gene
  tracking?: TrackingProp
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: ModalType, config?: ModalOptions) => void
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
                id
                is_followed: isFollowed
              }
            }
          }
        `,
        variables: {
          input: {
            geneID: gene.internalID,
          },
        },
        optimisticResponse: {
          followGene: {
            gene: {
              id: gene.id,
              is_followed: !gene.is_followed,
            },
          },
        },
      })
      this.trackFollow()
    } else {
      onOpenAuthModal &&
        onOpenAuthModal(ModalType.signup, {
          contextModule: SchemaV2.ContextModule.intextTooltip,
          intent: SchemaV2.AuthIntent.followGene,
          copy: "Sign up to follow categories",
          afterSignUpAction: {
            action: "follow",
            kind: "gene",
            objectId: gene.internalID,
          },
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
  createFragmentContainer(Artsy.withSystemContext(FollowGeneButton), {
    gene: graphql`
      fragment FollowGeneButton_gene on Gene {
        id
        internalID
        is_followed: isFollowed
      }
    `,
  })
)
