import { mount } from "enzyme"
import moment from "moment"
import React from "react"
import { ExtractProps } from "Utils/ExtractProps"
import { CountdownTimer } from "../CountdownTimer"

const guessTimezone = jest.fn(() => "America/New_York")

require("moment-timezone").tz.guess = guessTimezone

const DATE = "2018-12-03T13:50:31.641Z"
const SUMMER_DATE = "2018-08-03T13:50:31.641Z"

jest.mock("Utils/getCurrentTimeAsIsoString")

jest.mock("Utils/time")
import { renderUntil } from "DevTools"
import { getOffsetBetweenGravityClock } from "Utils/time"
const mockGetOffsetBetweenGravityClock = getOffsetBetweenGravityClock as jest.Mock

const defaultProps: ExtractProps<typeof CountdownTimer> = {
  action: "Respond",
  note: "Expired offers end the negotiation process permanently.",
  countdownStart: moment(DATE)
    .subtract(1, "days")
    .toISOString(),
  countdownEnd: moment(DATE)
    .add(1, "days")
    .toISOString(),
}

const summerProps: typeof defaultProps = {
  ...defaultProps,
  countdownStart: moment(SUMMER_DATE)
    .subtract(1, "days")
    .toISOString(),
  countdownEnd: moment(SUMMER_DATE)
    .add(1, "days")
    .toISOString(),
}

const getPropsWithTimeRemaining = (duration: moment.Duration) => ({
  ...defaultProps,
  countdownStart: moment(DATE)
    .subtract(1, "day")
    .toISOString(),
  countdownEnd: moment(DATE)
    .add(duration)
    .toISOString(),
})

describe("CountdownTimer", () => {
  beforeEach(() => {
    require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(DATE)
    mockGetOffsetBetweenGravityClock.mockReturnValue(Promise.resolve(0))
  })

  describe("in winter", () => {
    it("shows timezone as EST", () => {
      const timer = mount(<CountdownTimer {...defaultProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"time remaining01d 00s leftRespond by Dec 04, 8:50 AM ESTExpired offers end the negotiation process permanently."`
      )
    })

    it("shows timezone as GMT in London", () => {
      guessTimezone.mockReturnValueOnce("Europe/London")
      const timer = mount(<CountdownTimer {...defaultProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"time remaining01d 00s leftRespond by Dec 04, 1:50 PM GMTExpired offers end the negotiation process permanently."`
      )
    })
  })

  describe("in summer", () => {
    beforeEach(() => {
      require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(SUMMER_DATE)
    })
    it("shows timezone as EDT", () => {
      const timer = mount(<CountdownTimer {...summerProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"time remaining01d 00s leftRespond by Aug 04, 9:50 AM EDTExpired offers end the negotiation process permanently."`
      )
    })

    it("shows timezone as BST in London", () => {
      guessTimezone.mockReturnValueOnce("Europe/London")
      const timer = mount(<CountdownTimer {...summerProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"time remaining01d 00s leftRespond by Aug 04, 2:50 PM BSTExpired offers end the negotiation process permanently."`
      )
    })
  })

  it("handles gravity time offsets", async () => {
    let timeIsSynced = false
    mockGetOffsetBetweenGravityClock.mockImplementation(async () => {
      timeIsSynced = true
      return 1800 * 1000 // The user's clock is a half hour off of gravity's.
    })

    const timer = await renderUntil(
      _wrapper => timeIsSynced,
      <CountdownTimer {...defaultProps} />
    )

    const text = timer.text()
    expect(text).toMatchInlineSnapshot(
      `"time remaining01d 30m 00s leftRespond by Dec 04, 8:50 AM ESTExpired offers end the negotiation process permanently."`
    )
  })

  it("shows the time remaining properly", () => {
    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            moment
              .duration(1, "days")
              .add(15, "hours")
              .add(10, "minutes")
              .add(5, "seconds")
          )}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"time remaining01d 15h 10m 05s leftRespond by Dec 05, 12:00 AM ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            moment
              .duration(15, "hours")
              .add(10, "minutes")
              .add(5, "seconds")
          )}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"time remaining15h 10m 05s leftRespond by Dec 04, 12:00 AM ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            moment.duration(15, "minutes").add(10, "seconds")
          )}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"time remaining15m 10s leftRespond by Dec 03, 9:05 AM ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(moment.duration(1, "seconds"))}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"time remaining01s leftRespond by Dec 03, 8:50 AM ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(moment.duration(-1, "seconds"))}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"time remaining0 days leftRespond by Dec 03, 8:50 AM ESTExpired offers end the negotiation process permanently."`
    )
  })
})
