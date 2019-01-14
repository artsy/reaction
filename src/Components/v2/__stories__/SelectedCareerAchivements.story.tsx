import { artistResponse } from "Apps/__tests__/Fixtures/SelectedCareerAchievements"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { SelectedCareerAchievements } from "../SelectedCareerAchievements"

storiesOf("Styleguide/Components", module).add(
  "SelectedCareerAchievements",
  () => {
    return (
      <>
        <Section title="Selected Career Achievements">
          <SelectedCareerAchievements artist={artistResponse as any} />
        </Section>
      </>
    )
  }
)
