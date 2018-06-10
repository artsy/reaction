import React from "react"
import { Section } from "../../Utils/Section"
import { storiesOf } from "storybook/storiesOf"
import { Pagination, LargePagination, SmallPagination } from "../Pagination"

storiesOf("Styleguide/Components", module).add("Pagination", () => {
  return (
    <React.Fragment>
      <Section title="Responsive">
        <Pagination />
      </Section>
      <Section title="Large Pagination">
        <LargePagination />
      </Section>
      <Section title="Small Pagination">
        <SmallPagination />
      </Section>
    </React.Fragment>
  )
})
