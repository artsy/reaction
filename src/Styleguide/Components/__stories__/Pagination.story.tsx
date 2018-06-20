import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { paginationProps } from "Styleguide/Pages/Fixtures/Pagination"
import { Section } from "Styleguide/Utils/Section"
import { LargePagination, Pagination, SmallPagination } from "../Pagination"

storiesOf("Styleguide/Components", module).add("Pagination", () => {
  const { cursor, callbacks } = paginationProps

  return (
    <React.Fragment>
      <Section title="Responsive">
        <Pagination {...cursor} {...callbacks} />
      </Section>
      <Section title="Large Pagination">
        <LargePagination {...cursor} {...callbacks} />
      </Section>
      <Section title="Small Pagination">
        <SmallPagination {...cursor} {...callbacks} />
      </Section>
    </React.Fragment>
  )
})
