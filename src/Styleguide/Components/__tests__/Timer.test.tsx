import { Sans } from "@artsy/palette"
import React from "react"
import * as renderer from "react-test-renderer"
import { Timer } from "../Timer"

jest.useFakeTimers()

jest.mock("Utils/getCurrentTimeAsIsoString")

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(
  "2018-05-10T20:22:32.000Z"
)

const getTimerText = timerComponent =>
  timerComponent.root.findAllByType(Sans)[0].props.children.join("")

it("formats the remaining time in '00d  00h  00m  00s'", () => {
  let timer

  // Thursday, May 14, 2018 10:24:31.000 AM UTC
  timer = renderer.create(<Timer endDate="2018-05-14T10:24:31+00:00" />)
  expect(getTimerText(timer)).toEqual("03d  14h  01m  59s")

  // Thursday, May 10, 2018 8:42:32.000 PM UTC
  timer = renderer.create(<Timer endDate="2018-05-10T20:42:32+00:00" />)
  expect(getTimerText(timer)).toEqual("00d  00h  20m  00s")

  // Thursday, May 10, 2018 8:22:42.000 PM UTC
  timer = renderer.create(<Timer endDate="2018-05-10T20:22:42+00:00" />)
  expect(getTimerText(timer)).toEqual("00d  00h  00m  10s")

  // In the past
  timer = renderer.create(<Timer endDate="2018-04-10T20:22:42+00:00" />)
  expect(getTimerText(timer)).toEqual("00d  00h  00m  00s")
})

it("counts down to zero", () => {
  const timer = renderer.create(<Timer endDate="2018-05-14T10:23:10+00:00" />)
  expect(getTimerText(timer)).toEqual("03d  14h  00m  38s")

  require("Utils/getCurrentTimeAsIsoString").__advance(2 * 1000)
  jest.runOnlyPendingTimers()
  expect(getTimerText(timer)).toEqual("03d  14h  00m  36s")

  require("Utils/getCurrentTimeAsIsoString").__advance(60 * 1000)
  jest.runOnlyPendingTimers()
  expect(getTimerText(timer)).toEqual("03d  13h  59m  36s")
})
