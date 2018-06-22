import { extend } from "lodash"
import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { FollowGeneButton_gene } from "../../__generated__/FollowGeneButton_gene.graphql"
import { track } from "../../Utils/track"
import * as Artsy from "../Artsy"
import { FollowButton } from "./Button"
import { FollowTrackingData } from "./Typings"

interface Props extends React.HTMLProps<FollowGeneButton>, Artsy.ContextProps {
  relay?: RelayProp
  gene?: FollowGeneButton_gene
  tracking?: any
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: "register" | "login", config?: Object) => void
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
    const { gene, currentUser, relay, onOpenAuthModal } = this.props

    if (currentUser && currentUser.id) {
      commitMutation(relay.environment, {
        mutation: graphql`
          mutation FollowGeneButtonMutation($input: FollowGeneInput!) {
            followGene(input: $input) {
              gene {
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
          context_module: "intext tooltip",
          intent: "follow gene",
          copy: "Sign up to follow categories",
        })
    }
  }

  render() {
    const { gene } = this.props

    return (
      <FollowButton
        isFollowed={gene && gene.is_followed}
        handleFollow={this.handleFollow}
      />
    )
  }
}

export default track()(
  createFragmentContainer(
    Artsy.ContextConsumer(FollowGeneButton),
    graphql`
      fragment FollowGeneButton_gene on Gene {
        __id
        id
        is_followed
      }
    `
  )
)
