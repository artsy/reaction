import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import SaveButton from "./save"
import ArtworkMetadata from "./metadata"

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  background-color: ${colors.grayMedium};
  position: relative;
  width 100%;
`

interface Props extends RelayProps, React.HTMLProps<ArtworkGridItem> {
  style?: any
}

export class ArtworkGridItem extends React.Component<Props, null> {
  render() {
    const { style, artwork } = this.props
    return (
      <div style={style}>
        <Placeholder style={{ paddingBottom:  artwork.image.placeholder }}>
          <Image src={artwork.image.url} />
          <SaveButton
            artwork={artwork}
            style={{position: "absolute", right: "10px", bottom: "10px"}}
          />
        </Placeholder>
      
        <ArtworkMetadata artwork={artwork} />
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkGridItem, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        image {
          placeholder
          url(version: "large")
          aspect_ratio
        }
       ${ArtworkMetadata.getFragment("artwork")}
       ${SaveButton.getFragment("artwork")}
      }
    `,
  },
})

interface RelayProps {
  artwork: {
    image: {
      placeholder: number | null,
      url: string | null,
      aspect_ratio: number | null,
    } | null,
  },
}
