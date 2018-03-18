import { storiesOf } from "@storybook/react"
import React from "react"
// import { graphql } from "react-relay"

// import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import AuthForm from "../Authorization/AuthForm"

// maybe can use this to actually test auth?
// function ArtworkExample(props: { artworkID: string }) {
//   return (
//     <RootQueryRenderer
//       query={graphql`
//         query ArtworkQuery($artworkID: String!) {
//           artwork(id: $artworkID) {
//             ...Artwork_artwork
//           }
//         }
//       `}
//       variables={{ artworkID: props.artworkID }}
//       render={readyState =>
//         readyState.props && <Artwork {...readyState.props as any} />}
//     />
//   )
// }

storiesOf("Components/Authorization", module)
  .add("Login Mode", () => <AuthForm mode="log_in" />)
  .add("Forgot Password", () => <AuthForm mode="forgot_password" />)
  .add("Register Mode", () => <AuthForm mode="register" />)
