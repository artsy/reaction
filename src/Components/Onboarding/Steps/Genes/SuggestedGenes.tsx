import * as React from "react"

import ItemLink from "../../ItemLink"

export interface Props {
  genes: any[]
}

export default class SuggestedGenes extends React.Component<Props, null> {
  render() {
    const items = this.props.genes.map((item, index) => {
      return <ItemLink href="#" item={item} key={index} />
    })

    return <div>{items}</div>
  }
}

// const PopularArtistContentContainer = createFragmentContainer(
//   PopularArtistsContent,
//   graphql`
//     fragment PopularArtistsContent_popular_artists on PopularArtists {
//       artists {
//         ...SelectableItemContainer_artists
//       }
//     }
//   `
// )

// export default function PopularArtistContentList() {
//   return (
//     <QueryRenderer
//       environment={(Store as any) as Environment}
//       query={graphql`
//         query PopularArtistsQuery {
//           popular_artists {
//             ...PopularArtistsContent_popular_artists
//           }
//         }
//       `}
//       variables={{}}
//       render={({ error, props }) => {
//         if (props) {
//           return <PopularArtistContentContainer popular_artists={props.popular_artists} />
//         } else {
//           return null
//         }
//       }}
//     />
//   )
// }
