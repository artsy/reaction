import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { FollowButton } from "./Button"
import * as Artsy from "../Artsy"
import { FollowGeneButton_gene } from "../../__generated__/FollowGeneButton_gene.graphql"

interface Props extends React.HTMLProps<FollowGeneButton>, Artsy.ContextProps {
  relay?: RelayProp
  gene?: FollowGeneButton_gene
}

export class FollowGeneButton extends React.Component<Props> {
  handleFollow = () => {
    const { gene, currentUser, relay } = this.props

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
            unfollow: gene.is_followed,
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
    } else {
      // TODO: trigger signup/login modal
      window.location.href = "/login"
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

export default createFragmentContainer(
  Artsy.ContextConsumer(FollowGeneButton),
  graphql`
    fragment FollowGeneButton_gene on Gene {
      __id
      id
      is_followed
    }
  `
)
