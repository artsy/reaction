import React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureMeta_feature } from "__generated__/FeatureMeta_feature.graphql"

interface FeatureMetaProps {
  feature: FeatureMeta_feature
}

const FeatureMeta: React.FC<FeatureMetaProps> = ({ feature: { name } }) => {
  const TODO_description = "description text"

  return (
    <>
      <Title>{name}</Title>
      <Meta name="description" content={TODO_description} />
    </>
  )
}

export const FeatureMetaFragmentContainer = createFragmentContainer(
  FeatureMeta,
  {
    feature: graphql`
      fragment FeatureMeta_feature on Feature {
        name
      }
    `,
  }
)
