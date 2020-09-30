import {
  AuthContextModule,
  Intent,
  followedGene,
  unfollowedGene,
} from "@artsy/cohesion"
import { FollowGeneButtonMutation } from "__generated__/FollowGeneButtonMutation.graphql"
import * as Artsy from "Artsy"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import track, { TrackingProp } from "react-tracking"
import { FollowGeneButton_gene } from "../../__generated__/FollowGeneButton_gene.graphql"
import { FollowButton } from "./FollowButton"
import { openAuthToFollow } from "Utils/openAuthModal"
import {
  AnalyticsContextProps,
  withAnalyticsContext,
} from "Artsy/Analytics/AnalyticsContext"

interface Props
  extends React.HTMLProps<FollowGeneButton>,
    Artsy.SystemContextProps,
    AnalyticsContextProps {
  relay?: RelayProp
  gene?: FollowGeneButton_gene
  tracking?: TrackingProp
  contextModule?: AuthContextModule
}

export class FollowGeneButton extends React.Component<Props> {
  trackFollow = () => {
    const {
      tracking,
      gene: { is_followed, internalID, slug },
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
    } = this.props

    const trackingData = {
      contextModule,
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      contextOwnerType: contextPageOwnerType,
      ownerId: internalID,
      ownerSlug: slug,
    }

    const analyticsData = is_followed
      ? unfollowedGene(trackingData)
      : followedGene(trackingData)

    tracking.trackEvent(analyticsData)
  }

  handleFollow = () => {
    const { contextModule, gene, user, relay, mediator } = this.props

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
      openAuthToFollow(mediator, {
        entity: gene,
        contextModule,
        intent: Intent.followGene,
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

export const FollowGeneButtonFragmentContainer = track({})(
  createFragmentContainer(
    Artsy.withSystemContext(withAnalyticsContext(FollowGeneButton)),
    {
      gene: graphql`
        fragment FollowGeneButton_gene on Gene {
          id
          internalID
          slug
          name
          is_followed: isFollowed
        }
      `,
    }
  )
)
