import { Sans } from "@artsy/palette"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import React from "react"
import { Toggle } from "react-powerplug"
import { storiesOf } from "storybook/storiesOf"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { Section } from "Styleguide/Utils/Section"

const props = {
  href: "/artist/francesca-dimattio",
  imageUrl: "https://picsum.photos/110/110/?random",
  name: "Francesca DiMattio",
  meta: "American, b. 1979",
}

storiesOf("Styleguide/Components", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("EntityHeader", () => {
    return (
      <>
        <Section title="Default">
          <EntityHeader
            imageUrl={props.imageUrl}
            name={props.name}
            meta={props.meta}
            href={`http://www.artsy.net/${props.href}`}
            FollowButton={
              <Toggle initial={true}>
                {({ on, toggle }) => (
                  <span onClick={() => toggle()} style={{ cursor: "pointer" }}>
                    <Sans size="2">{on ? "Unfollow" : "Follow"}</Sans>
                  </span>
                )}
              </Toggle>
            }
          />
        </Section>
        <Section title="No image, initials">
          <EntityHeader name={props.name} meta={props.meta} initials="FD" />
        </Section>
        <Section title="No image, overflow initials">
          <EntityHeader name={props.name} meta={props.meta} initials="FDBDE" />
        </Section>
        <Section title="No follow">
          <EntityHeader
            name={props.name}
            meta={props.meta}
            showFollow={false}
          />
        </Section>
      </>
    )
  })
