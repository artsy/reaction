import React from "react"
import { Section } from "Styleguide/Utils/Section"
import { storiesOf } from "storybook/storiesOf"
import { Pagination, LargePagination, SmallPagination } from "../Pagination"

storiesOf("Styleguide/Components", module).add("Pagination", () => {
  const around = [
    { page: 6, cursor: "blah", isCurrent: true },
    { page: 7, cursor: "blah", isCurrent: false },
    { page: 8, cursor: "blah", isCurrent: false },
    { page: 9, cursor: "blah", isCurrent: false },
  ]

  const first = { page: 1, cursor: "blah", isCurrent: false }

  const last = { page: 20, cursor: "blah", isCurrent: false }

  const cursor = { first, last, around }

  // tslint:disable-next-line:no-console
  const consoleLogValue = value => console.log(value)
  // tslint:disable-next-line:no-console
  const emptyLog = () => console.log(`Logging`)

  const callbacks = {
    onClick: consoleLogValue,
    onNext: emptyLog,
    onPrev: emptyLog,
  }

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
