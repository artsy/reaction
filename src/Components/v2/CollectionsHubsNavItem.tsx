import { Box, Image, Serif, SerifProps } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"
import React, { FC } from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

interface CollectionsHubsNavItemProps extends SpaceProps {
  href: string
  imageUrl: string
}

export const CollectionsHubsNavItem: React.FC<CollectionsHubsNavItemProps> = ({
  href,
  imageUrl,
  children,
}) => {
  return (
    <OuterLink to={href}>
      <ImageContainer>
        <ImageOverlay>
          <HubImage src={imageUrl} width="100%" alt={"todo fill in"} />
        </ImageOverlay>
      </ImageContainer>
      <Title size="3" textAlign="center" p={1}>
        {children}
      </Title>
    </OuterLink>
  )
}

const ImageContainer = styled(Box)`
  position: relative;
`

const Title = styled(Serif)``

const HubImage = styled(Image)`
  vertical-align: middle;
`

const ImageOverlay = styled(Box)`
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    color: #fff;
    content: "";
    background: rgba(0, 0, 0, 0.3);
  }
`

const OuterLink = styled(RouterLink)`
  text-decoration: none;

  &:hover {
    text-decoration: none;

    ${Title} {
      text-decoration: underline;
    }

    ${ImageOverlay} {
      &::before {
        display: block;
      }
    }
  }

  ${space}
`

// ------------------------------------
// two ways I can think of to allow the caller to specify what the
//   title and optional subtitle will look like, below. Both satisfy:
// - Caller can choose whether there is a subtitle
// - Caller can specify size or padding, or use the default. (Different entry points will use different values for these.)
// - Lots of things are decided for the caller; it's basically just filling in text, with a little bit of overrideable text styling.

// ------------------------------------

// Method 1: pass title and subtitle as props.
// Drawbacks:
// 1. have to figure out how to pass ${Title} into OuterLink on line 61, or else
//    we lose the "hover" effect of underlining the text.
//   (it's a dynamic element, passed into the component. Not sure how to reference that
//    with styled-components.)
// 2. caller has to specify the type & size of text element for title & subtitle.
//    (see CollectionsHubsNavItem.story.tsx ln 40 & 48)

interface ImageLinkProps {
  src: string
  href: string
  alt: string
  title: React.ReactElement<SerifProps>
  subtitle?: React.ReactElement<SerifProps>
}

export const ImageLink: FC<ImageLinkProps> = ({
  href,
  src,
  alt,
  title,
  subtitle,
}) => {
  return (
    <OuterLink to={href}>
      <ImageContainer>
        <ImageOverlay>
          <HubImage src={src} width="100%" alt={alt} />
        </ImageOverlay>
      </ImageContainer>
      {React.cloneElement(title, {
        // kind of like "default props" for a cloned element.
        element: title.props.element || "h3",
        p: title.props.p || "1",
        textAlign: "center",
      })}

      {subtitle &&
        React.cloneElement(subtitle, {
          // kind of like "default props" for a cloned element.
          element: title.props.element || "h4",
          p: title.props.p || "1",
          textAlign: "center",
        })}
    </OuterLink>
  )
}

// ------------------------------------

// Method 2: pass title and subtitle as children.
// Advantages:
// 1. I like it more from a readability standpoint.
// 2. We'd still have to figure out how to get the hover effect of underlining the text,
//    but I think with IL2Title and IL2SubTitle being declared components, that will be easier.
// Drawbacks:
// 1. New element types (IL2Title and IL2SubTitle). I'm not sure if I dislike this or not.
// 2. Discoverability. With props, it's easy to see what to fill in. With children, you have to know more what you're looking for.
//    This _might_ be fixed if I could get the types to actually restrict to only allow IL2Title and IL2SubTitle for children

interface ImageLink2Props {
  src: string
  href: string
  alt: string
  // You'd _think_ this would restrict the children to being of a certain type,
  //   but it doesn't.
  children:
    | React.ReactElement<OptionalSerifProps>
    | Array<React.ReactElement<OptionalSerifProps>>
}

export const ImageLink2: FC<ImageLink2Props> = ({
  href,
  src,
  alt,
  children,
}) => {
  return (
    <OuterLink to={href}>
      <>
        <ImageContainer>
          <ImageOverlay>
            <HubImage src={src} width="100%" alt={alt} />
          </ImageOverlay>
        </ImageContainer>
        {children}
      </>
    </OuterLink>
  )
}

// There's probably a better way to do this, but I want to say
//    "it can have any serif prop, but all are optional."
type OptionalSerifProps = { [P in keyof SerifProps]?: SerifProps[P] }

export const IL2Title: FC<OptionalSerifProps> = ({
  children,
  size = "4",
  p = 1,
}) => {
  return (
    <Serif size={size} textAlign="center" p={p}>
      {children}
    </Serif>
  )
}

export const IL2SubTitle: FC<OptionalSerifProps> = ({
  children,
  size = "3",
  p = 1,
}) => {
  return (
    <Serif size={size} textAlign="center" p={p}>
      {children}
    </Serif>
  )
}
