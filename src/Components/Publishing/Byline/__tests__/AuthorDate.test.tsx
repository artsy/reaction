import { shallow } from "enzyme"
import "jest-styled-components"
import moment from "moment-timezone"
import React from "react"
import renderer from "react-test-renderer"
import { getDate } from "../../Constants"
import { Author, Date } from "../AuthorDate"

describe("Author/Date", () => {
  it("renders a single author", () => {
    const authors = [{ name: "Molly Gottschalk" }]
    const author = renderer.create(
      <Author authors={authors} layout={"split"} />
    )
    expect(author).toMatchSnapshot()
    const shallowAuthor = shallow(<Author authors={authors} layout={"split"} />)
    expect(shallowAuthor.html()).toContain("Molly Gottschalk")
  })

  it("renders multiple authors", () => {
    const authors = [{ name: "Molly Gottschalk" }, { name: "Kana Abe" }]
    const author = renderer.create(
      <Author authors={authors} layout={"split"} />
    )
    expect(author).toMatchSnapshot()
    const shallowAuthor = shallow(<Author authors={authors} layout={"split"} />)
    expect(shallowAuthor.html()).toContain("Molly Gottschalk")
    expect(shallowAuthor.html()).toContain("Kana Abe")
  })

  it("renders the date", () => {
    const date = renderer.create(
      <Date date="2017-05-19T13:09:18.567Z" layout="split" />
    )
    expect(date).toMatchSnapshot()
    const shallowDate = shallow(
      <Date date="2017-05-19T13:09:18.567Z" layout="split" />
    )
    expect(shallowDate.html()).toContain("May 19, 2017 9:09 am")
  })
})

describe("Date", () => {
  const timestamp = "2017-02-22T19:22:05.709Z"
  const expectedFormattedDates = {
    monthYear: "February 2017",
    condensed: "Feb 22, 2017",
    verbose: "Feb 22, 2017 at 2:22 pm",
    verboseToday: "Today at 2:22 pm",
    default: "Feb 22, 2017 2:22 pm",
  }

  it("returns the correct date for monthYear format", () => {
    const date = getDate(timestamp, "monthYear")
    expect(date).toEqual(expectedFormattedDates.monthYear)
  })

  it("returns the correct date for condensed format", () => {
    const date = getDate(timestamp, "condensed")
    expect(date).toEqual(expectedFormattedDates.condensed)
  })

  it("returns the correct date for verbose format", () => {
    const date = getDate(timestamp, "verbose")
    expect(date).toEqual(expectedFormattedDates.verbose)
  })

  it("returns the correct date for default format", () => {
    const date = getDate(timestamp, "default")
    expect(date).toEqual(expectedFormattedDates.default)
  })

  it("returns the correct verbose date for same-day timestamps", () => {
    let today = moment().tz("America/New_York")
    today = today.set({
      hour: 14,
      minute: 22,
    })

    const date = getDate(today, "verbose")
    expect(date).toEqual(expectedFormattedDates.verboseToday)
  })
})
