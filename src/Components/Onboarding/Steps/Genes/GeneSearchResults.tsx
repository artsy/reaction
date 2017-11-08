import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../../../Artsy"
import ItemLink from "../../ItemLink"

export interface RelayProps {
  viewer: {
    match_gene: any[]
  }
}

class GeneSearchResultsContent extends React.Component<RelayProps, null> {
  render() {
    const items = this.props.viewer.match_gene.map((item, index) => {
      return (
        <ItemLink
          href="#"
          item={item}
          key={index}
          id={item.id}
          _id={item._id}
          name={item.name}
          image_url={item.image.cropped.url}
        />
      )
    })

    return <div>{items}</div>
  }
}

const GeneSearchResultsContentContainer = createFragmentContainer(
  GeneSearchResultsContent,
  graphql`
    fragment GeneSearchResultsContent_viewer on Viewer {
      match_gene(term: $term) {
        name
        id
        _id
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
      }
    }
  `
)

interface Props {
  term: string
}

const GeneSearchResultsComponent: React.SFC<Props & ContextProps> = ({ term, relayEnvironment }) => {
  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={graphql`
        query GeneSearchResultsQuery($term: String!) {
          viewer {
            ...GeneSearchResultsContent_viewer
          }
        }
      `}
      variables={{ term }}
      render={({ error, props }) => {
        if (props) {
          return <GeneSearchResultsContentContainer viewer={props.viewer} />
        } else {
          return null
        }
      }}
    />
  )
}

export const GeneSearchResults = ContextConsumer(GeneSearchResultsComponent)
