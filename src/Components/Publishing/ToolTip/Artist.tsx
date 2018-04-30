import styled from "styled-components"
import React from "react"
import { map } from "lodash"
import { garamond, unica } from "Assets/Fonts"
import Markdown from "react-markdown"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { Truncator } from "../Sections/Truncator"
import { FollowButton } from "./Components/FollowButton"
import { NewFeature } from "./Components/NewFeature"

export interface ArtistProps {
  blurb?: string
  formatted_nationality_and_birthday?: string
  href?: string
  carousel?: {
    images: [
      {
        resized: {
          url: string
        }
      }
    ]
  }
  name?: string
}

export const ArtistToolTip: React.SFC<ArtistProps> = props => {
  const {
    blurb,
    carousel,
    formatted_nationality_and_birthday,
    href,
    name,
  } = props
  const displayImages = map(carousel.images.slice(0, 2), "resized")
  const images = fillwidthDimensions(displayImages, 320, 15, 150)

  return (
    <Wrapper>
      <ArtistContainer href={href}>
        {images && (
          <Images>
            {images.map((img, i) => (
              <img
                key={i}
                src={img.__id}
                width={img.width}
                height={img.height}
              />
            ))}
          </Images>
        )}
        <Header>
          <TitleDate>
            <Title>{name}</Title>
            {formatted_nationality_and_birthday && (
              <Date>{formatted_nationality_and_birthday}</Date>
            )}
          </TitleDate>
          <FollowButton /> {/* TODO: Replace with relay follow */}
        </Header>

        {blurb && (
          <Description>
            <Truncator maxLineCount={3}>
              <Markdown
                source={blurb}
                containerTagName="span"
                disallowedTypes={["Link"]}
              />
            </Truncator>
          </Description>
        )}
      </ArtistContainer>

      <NewFeature />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 320px;
`

export const ArtistContainer = styled.a`
  position: relative;
  text-decoration: none;
  color: black;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleDate = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Date = styled.div`
  ${unica("s14", "medium")};
`

const Description = styled.div`
  ${garamond("s15")};
`

const Images = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`

// {
//   artist(id: "andy-warhol") {
//   	name
//     image {
//       cropped(width: 240, height: 160) {
//         url
//       }
//     }
//     formatted_nationality_and_birthday
//     href
//     blurb
//     carousel {
//       images {
//         resized(height:200){
//           url
//           width
//           height
//         }
//       }
//     }
//     collections
//     highlights {
//       partners(
//         first: 3
//         display_on_partner_profile: true
//         represented_by: true
//         partner_category: ["blue-chip", "top-established", "top-emerging"]
//       ) {
//         edges {
//           node {
//             categories {
//               name
//             }
//           }
//         }
//       }
//     }
//     auctionResults(
//       recordsTrusted: true
//       first: 1
//       sort: PRICE_AND_DATE_DESC
//     ) {
//       edges {
//         node {
//           organization
//         }
//       }
//     }
//   }
// }
