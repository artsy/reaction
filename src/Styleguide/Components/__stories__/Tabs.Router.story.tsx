import { ClientRouter } from "Artsy"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { RouteTab, RouteTabs } from "Styleguide/Components"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Components", module).add("Tabs (Router)", () => {
  return (
    <React.Fragment>
      <Section title="Route Tabs">
        <ClientRouter
          initialRoute="/cv"
          routes={[
            {
              path: "/",
              Component: () => {
                return (
                  <RouteTabs>
                    <RouteTab to="/overview">Overview</RouteTab>
                    <RouteTab to="/cv">CV</RouteTab>
                    <RouteTab to="/shows">Shows</RouteTab>
                  </RouteTabs>
                )
              },
              children: [
                {
                  path: "/overview",
                },
                {
                  path: "/cv",
                },
                {
                  path: "/shows",
                },
              ],
            },
          ]}
        />
      </Section>
    </React.Fragment>
  )
})
