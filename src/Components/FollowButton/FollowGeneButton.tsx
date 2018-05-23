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
  onOpenAuthModal?: (type: "register" | "login", config?: Object) => void
}

export class FollowGeneButton extends React.Component<Props> {
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
    } else {
      onOpenAuthModal && onOpenAuthModal("register")
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
